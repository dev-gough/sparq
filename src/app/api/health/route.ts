import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { logAppEvent } from '@/lib/appLogger'

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

const SERVICE_NAME = 'company-site'
const CHECK_TIMEOUT_MS = 400

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

async function checkSedarDocuments(): Promise<HealthCheck> {
  const started = Date.now()
  const filePath = path.join(process.cwd(), 'src/data/sedar-documents.json')
  try {
    await withTimeout(fs.access(filePath), CHECK_TIMEOUT_MS)
    const raw = await withTimeout(fs.readFile(filePath, 'utf-8'), CHECK_TIMEOUT_MS)
    const parsed = JSON.parse(raw) as { documents?: unknown[] }
    const count = Array.isArray(parsed.documents) ? parsed.documents.length : 0
    return {
      name: 'sedar_documents',
      status: count > 0 ? 'ok' : 'degraded',
      latencyMs: Date.now() - started,
      detail: count > 0 ? `${count} documents` : 'file present but empty',
      // Investor reports still render with empty data; not a hard outage
      critical: false,
    }
  } catch (err) {
    return {
      name: 'sedar_documents',
      status: 'degraded',
      latencyMs: Date.now() - started,
      detail: err instanceof Error ? err.message : 'unreadable',
      critical: false,
    }
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

  const checks: HealthCheck[] = [
    { name: 'http', status: 'ok', latencyMs: 1, critical: true },
    checkSesConfig(),
    await checkSedarDocuments(),
  ]

  const status = rollupStatus(checks)
  const body = {
    status,
    service: SERVICE_NAME,
    version: process.env.APP_VERSION || process.env.npm_package_version || '0.3.0',
    uptimeSec: Math.floor(process.uptime()),
    checkedAt: new Date().toISOString(),
    checks,
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
