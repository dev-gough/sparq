#!/usr/bin/env node
/**
 * Local lab Lighthouse runs (median of N) without LHCI server wiring.
 * Prefer this when LHCI chromeFlags are flaky on sandboxed Linux hosts.
 *
 * Usage:
 *   npm run start &   # or let this script start the server
 *   node scripts/perf/run-lighthouse.mjs --label post-phase-a
 *
 * Requires Playwright Chromium (or CHROME_PATH).
 */

import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../..')
const BASELINES = join(ROOT, 'docs/baselines')
const require = createRequire(import.meta.url)

const URLS = [
  'http://127.0.0.1:8080/',
  'http://127.0.0.1:8080/products/quad2',
  'http://127.0.0.1:8080/investors',
  'http://127.0.0.1:8080/resources/legal',
  'http://127.0.0.1:8080/resources/calculator',
]

const CHROME =
  process.env.CHROME_PATH ||
  process.env.LHCI_CHROME_PATH ||
  `${process.env.HOME}/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`

function parseArgs(argv) {
  const out = { label: 'lab', runs: 3, startServer: true, port: 8080 }
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--label') out.label = argv[++i]
    else if (argv[i] === '--runs') out.runs = Number(argv[++i])
    else if (argv[i] === '--no-server') out.startServer = false
  }
  return out
}

function median(nums) {
  const a = [...nums].sort((x, y) => x - y)
  const m = Math.floor(a.length / 2)
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2
}

function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const r = spawnSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', url], {
        encoding: 'utf8',
      })
      if (r.stdout && r.stdout.trim().startsWith('2')) return true
    } catch {
      /* retry */
    }
    spawnSync('sleep', ['0.5'])
  }
  return false
}

function runOne(url, outFile) {
  const chromeFlags = '--no-sandbox --headless=new --disable-dev-shm-usage --disable-gpu'
  const args = [
    'lighthouse',
    url,
    `--chrome-flags=${chromeFlags}`,
    '--only-categories=performance',
    '--form-factor=desktop',
    '--screenEmulation.mobile=false',
    '--screenEmulation.width=1350',
    '--screenEmulation.height=940',
    '--screenEmulation.deviceScaleFactor=1',
    '--throttling.rttMs=40',
    '--throttling.throughputKbps=10240',
    '--throttling.cpuSlowdownMultiplier=1',
    '--quiet',
    '--output=json',
    `--output-path=${outFile}`,
  ]
  const r = spawnSync('npx', ['--yes', ...args], {
    cwd: ROOT,
    encoding: 'utf8',
    env: { ...process.env, CHROME_PATH: CHROME },
    maxBuffer: 20 * 1024 * 1024,
  })
  if (r.status !== 0) {
    throw new Error(`lighthouse failed for ${url}: ${r.stderr || r.stdout}`)
  }
  return JSON.parse(require('fs').readFileSync(outFile, 'utf8'))
}

async function main() {
  if (!existsSync(CHROME)) {
    console.error(`Chrome not found at ${CHROME}. Set CHROME_PATH.`)
    process.exit(1)
  }

  const args = parseArgs(process.argv)
  let serverProc = null

  if (args.startServer) {
    console.error('Starting next start -p 8080...')
    serverProc = spawn('npm', ['run', 'start'], {
      cwd: ROOT,
      stdio: 'ignore',
      detached: true,
    })
    if (!waitForServer('http://127.0.0.1:8080/')) {
      if (serverProc.pid) process.kill(-serverProc.pid, 'SIGTERM')
      throw new Error('Server did not become ready on :8080')
    }
  }

  mkdirSync(BASELINES, { recursive: true })
  const tmpDir = join(BASELINES, `.lh-tmp-${Date.now()}`)
  mkdirSync(tmpDir, { recursive: true })

  const urlResults = []
  try {
    for (const url of URLS) {
      const runs = []
      for (let i = 0; i < args.runs; i++) {
        const outFile = join(tmpDir, `${encodeURIComponent(url)}-${i}.json`)
        console.error(`Run ${i + 1}/${args.runs} ${url}`)
        const report = runOne(url, outFile)
        runs.push({
          score: report.categories?.performance?.score ?? null,
          lcp: report.audits?.['largest-contentful-paint']?.numericValue ?? null,
          cls: report.audits?.['cumulative-layout-shift']?.numericValue ?? null,
          tbt: report.audits?.['total-blocking-time']?.numericValue ?? null,
          fcp: report.audits?.['first-contentful-paint']?.numericValue ?? null,
          ttfb: report.audits?.['server-response-time']?.numericValue ?? null,
          totalByteWeight: report.audits?.['total-byte-weight']?.numericValue ?? null,
        })
      }
      const pick = (key) => {
        const vals = runs.map((r) => r[key]).filter((v) => typeof v === 'number')
        return vals.length ? median(vals) : null
      }
      urlResults.push({
        url,
        runs: args.runs,
        median: {
          score: pick('score'),
          lcpMs: pick('lcp'),
          cls: pick('cls'),
          tbtMs: pick('tbt'),
          fcpMs: pick('fcp'),
          ttfbMs: pick('ttfb'),
          totalByteWeight: pick('totalByteWeight'),
        },
        allRuns: runs,
      })
    }
  } finally {
    if (serverProc?.pid) {
      try {
        process.kill(-serverProc.pid, 'SIGTERM')
      } catch {
        /* already exited */
      }
    }
  }

  const today = new Date().toISOString().slice(0, 10)
  const record = {
    kind: 'lighthouse-lab',
    label: args.label,
    capturedAt: new Date().toISOString(),
    date: today,
    chromePath: CHROME,
    formFactor: 'desktop',
    urls: urlResults,
  }

  const outPath = join(BASELINES, `${today}-${args.label}-lighthouse.json`)
  writeFileSync(outPath, JSON.stringify(record, null, 2) + '\n')
  console.log(JSON.stringify(urlResults.map((u) => ({ url: u.url, ...u.median })), null, 2))
  console.error(`Wrote ${outPath}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
