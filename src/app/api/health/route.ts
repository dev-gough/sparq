import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { logAppEvent } from '@/lib/appLogger'
import { getLogDir, isLogDirConfigured } from '@/lib/logDir'
import { decryptLogLine } from '@/lib/opsLogReader'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type HealthStatus = 'ok' | 'degraded' | 'down'

interface HealthCheck {
  name: string
  status: HealthStatus
  latencyMs?: number
  detail?: string
  critical?: boolean
}

interface HealthMetric {
  id: string
  label: string
  value: number | string
  unit?: string
  status?: HealthStatus
  detail?: string
}

interface HealthEvent {
  id: string
  label: string
  status: HealthStatus
  startedAt?: string
  finishedAt?: string
  summary?: string
}

interface SedarDoc {
  publishDate?: string
  key?: boolean
}

const SERVICE_NAME = 'company-site'
const CHECK_TIMEOUT_MS = 400
const EMAIL_LOG_MAX_BYTES = 256 * 1024

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timeout after ${ms}ms`)), ms)
    promise.then(
      (v) => {
        clearTimeout(timer)
        resolve(v)
      },
      (e) => {
        clearTimeout(timer)
        reject(e)
      }
    )
  })
}

async function loadSedar(): Promise<{
  check: HealthCheck
  count: number
  keyCount: number
  lastPublish?: string
}> {
  const started = Date.now()
  const filePath = path.join(process.cwd(), 'src/data/sedar-documents.json')
  try {
    await withTimeout(fs.access(filePath), CHECK_TIMEOUT_MS)
    const raw = await withTimeout(fs.readFile(filePath, 'utf-8'), CHECK_TIMEOUT_MS)
    const parsed = JSON.parse(raw) as { documents?: SedarDoc[] }
    const docs = Array.isArray(parsed.documents) ? parsed.documents : []
    const count = docs.length
    const keyCount = docs.filter((d) => d.key === true).length
    let lastPublish: string | undefined
    for (const doc of docs) {
      if (typeof doc.publishDate !== 'string') continue
      if (!lastPublish || doc.publishDate > lastPublish) lastPublish = doc.publishDate
    }
    return {
      check: {
        name: 'sedar_documents',
        status: count > 0 ? 'ok' : 'degraded',
        latencyMs: Date.now() - started,
        detail: count > 0 ? `${count} documents` : 'file present but empty',
        critical: false,
      },
      count,
      keyCount,
      lastPublish,
    }
  } catch (err) {
    return {
      check: {
        name: 'sedar_documents',
        status: 'degraded',
        latencyMs: Date.now() - started,
        detail: err instanceof Error ? err.message : 'unreadable',
        critical: false,
      },
      count: 0,
      keyCount: 0,
    }
  }
}

function encryptionKey(): string | undefined {
  const k = process.env.LOG_ENCRYPTION_KEY?.trim()
  if (k && k.length === 64) return k
  return undefined
}

async function scanTodayEmailLog(): Promise<{
  sent: number
  errors: number
  blocked: number
  lastSentAt?: string
}> {
  const date = new Date().toISOString().split('T')[0]
  const filePath = path.join(getLogDir(), `send-email-${date}.log`)
  try {
    const stat = await fs.stat(filePath)
    const start = Math.max(0, stat.size - EMAIL_LOG_MAX_BYTES)
    const fh = await fs.open(filePath, 'r')
    try {
      const buf = Buffer.alloc(stat.size - start)
      await fh.read(buf, 0, buf.length, start)
      const raw = buf.toString('utf8')
      const key = encryptionKey()
      let sent = 0
      let errors = 0
      let blocked = 0
      let lastSentAt: string | undefined
      const lines = raw.split('\n')
      if (start > 0 && lines.length > 0) lines.shift()
      for (const line of lines) {
        if (!line.trim()) continue
        const plain = decryptLogLine(line, key)
        let ctx = ''
        let ts: string | undefined
        try {
          const obj = JSON.parse(plain) as { context?: string; timestamp?: string }
          ctx = obj.context ?? ''
          ts = typeof obj.timestamp === 'string' ? obj.timestamp : undefined
        } catch {
          ctx = plain
        }
        if (ctx.includes('EMAIL_SENT_SUCCESS')) {
          sent += 1
          if (ts) lastSentAt = ts
        } else if (ctx.includes('EMAIL_SEND_ERROR')) {
          errors += 1
        } else if (ctx.includes('BLOCKED')) {
          blocked += 1
        }
      }
      return { sent, errors, blocked, lastSentAt }
    } finally {
      await fh.close()
    }
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code
    if (code === 'ENOENT') return { sent: 0, errors: 0, blocked: 0 }
    return { sent: 0, errors: 0, blocked: 0 }
  }
}

function checkSesConfig(): HealthCheck {
  const started = Date.now()
  const region = Boolean(process.env.AWS_REGION)
  const key = Boolean(process.env.AWS_ACCESS_KEY_ID)
  const secret = Boolean(process.env.AWS_SECRET_ACCESS_KEY)
  const from = Boolean(process.env.SES_FROM_EMAIL)
  const ok = region && key && secret && from

  return {
    name: 'ses_config',
    status: ok ? 'ok' : 'degraded',
    latencyMs: Date.now() - started,
    detail: ok
      ? 'AWS SES env present'
      : 'missing AWS SES env (contact form email may fail)',
    // Contact form only; site marketing pages still work
    critical: false,
  }
}

/** LOG_DIR required in production for email/app/Next logs + Control Center ops export. */
function checkLogDirConfig(): HealthCheck {
  const started = Date.now()
  const configured = isLogDirConfigured()
  const isProd = process.env.NODE_ENV === 'production'

  if (configured) {
    return {
      name: 'log_dir',
      status: 'ok',
      latencyMs: Date.now() - started,
      detail: 'LOG_DIR set',
      critical: false,
    }
  }

  return {
    name: 'log_dir',
    status: isProd ? 'degraded' : 'ok',
    latencyMs: Date.now() - started,
    detail: isProd
      ? 'LOG_DIR missing (required in production for ops logs)'
      : 'LOG_DIR unset; dev default ./logs',
    critical: false,
  }
}

function rollupStatus(checks: HealthCheck[]): HealthStatus {
  let worst: HealthStatus = 'ok'
  for (const c of checks) {
    const critical = c.critical !== false
    if (critical && c.status === 'down') return 'down'
    if (critical && c.status === 'degraded') worst = 'degraded'
    if (!critical && (c.status === 'down' || c.status === 'degraded')) {
      if (worst === 'ok') worst = 'degraded'
    }
  }
  return worst
}

/**
 * Control Center health contract — see sparq-toolbox
 * docs/control-center/HEALTH_CONTRACT.md
 *
 * Optional auth: set HEALTH_TOKEN and send header X-Health-Token.
 */
export async function GET(request: Request) {
  const expected = process.env.HEALTH_TOKEN?.trim()
  if (expected) {
    const token = request.headers.get('x-health-token')
    if (token !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const [sedar, email] = await Promise.all([loadSedar(), scanTodayEmailLog()])
  const ses = checkSesConfig()
  const logDir = checkLogDirConfig()

  const checks: HealthCheck[] = [
    { name: 'http', status: 'ok', latencyMs: 1, critical: true },
    ses,
    logDir,
    sedar.check,
  ]

  const mem = process.memoryUsage()
  const metrics: HealthMetric[] = [
    {
      id: 'sedar.document_count',
      label: 'SEDAR filings',
      value: sedar.count,
      unit: 'count',
    },
    {
      id: 'sedar.key_count',
      label: 'Key filings',
      value: sedar.keyCount,
      unit: 'count',
    },
  ]
  if (sedar.lastPublish) {
    metrics.push({
      id: 'sedar.last_publish',
      label: 'Latest filing',
      value: sedar.lastPublish,
      unit: 'iso',
      detail: sedar.lastPublish,
    })
  }
  metrics.push(
    {
      id: 'email.sent_today',
      label: 'Support email sent today',
      value: email.sent,
      unit: 'count',
    },
    {
      id: 'email.errors_today',
      label: 'SES errors today',
      value: email.errors,
      unit: 'count',
      status: email.errors > 0 ? 'degraded' : 'ok',
    },
    {
      id: 'email.blocked_today',
      label: 'Form blocks today',
      value: email.blocked,
      unit: 'count',
      detail: 'reCAPTCHA / origin',
    },
    {
      id: 'process.rss_mb',
      label: 'Process RSS',
      value: Math.round(mem.rss / 1024 / 1024),
      unit: 'count',
      detail: 'MiB resident',
    },
    {
      id: 'process.heap_mb',
      label: 'Heap used',
      value: Math.round(mem.heapUsed / 1024 / 1024),
      unit: 'count',
      detail: 'MiB',
    }
  )

  const events: HealthEvent[] = []
  if (email.lastSentAt) {
    events.push({
      id: 'email.last_sent',
      label: 'Last support email',
      status: 'ok',
      finishedAt: email.lastSentAt,
      summary: `${email.sent} sent today`,
    })
  }

  const status = rollupStatus(checks)
  const body = {
    status,
    service: SERVICE_NAME,
    version: process.env.APP_VERSION || process.env.npm_package_version || '0.3.0',
    uptimeSec: Math.floor(process.uptime()),
    checkedAt: new Date().toISOString(),
    checks,
    metrics,
    events: events.length > 0 ? events : undefined,
    links: {
      dashboard: process.env.NEXT_PUBLIC_SITE_URL || undefined,
    },
  }

  // Sparse app log so ops file source has real Next process activity
  if (status !== 'ok') {
    try {
      logAppEvent('HEALTH_NOT_OK', { status, checks: checks.map((c) => c.name + ':' + c.status) })
    } catch {
      /* ignore */
    }
  }

  return NextResponse.json(body, {
    status: status === 'down' ? 503 : 200,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}
