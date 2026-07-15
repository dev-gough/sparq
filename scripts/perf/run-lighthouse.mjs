#!/usr/bin/env node
/**
 * Local lab Lighthouse runs (median of N).
 *
 * Usage:
 *   npm run build && node scripts/perf/run-lighthouse.mjs --label post-3 --all
 *   node scripts/perf/run-lighthouse.mjs --label core --core --runs 3
 *   node scripts/perf/run-lighthouse.mjs --label x --paths /, /about --no-server
 *
 * Requires Playwright Chromium (or CHROME_PATH).
 */

import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { SITE_PATHS, CORE_PATHS, urlsForPaths } from './site-routes.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../..')
const BASELINES = join(ROOT, 'docs/baselines')
const require = createRequire(import.meta.url)

const CHROME =
  process.env.CHROME_PATH ||
  process.env.LHCI_CHROME_PATH ||
  `${process.env.HOME}/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`

function parseArgs(argv) {
  const out = {
    label: 'lab',
    runs: 3,
    startServer: true,
    port: 8080,
    origin: 'http://127.0.0.1:8080',
    mode: 'core', // core | all | paths
    paths: [],
    outDir: BASELINES,
  }
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--label') out.label = argv[++i]
    else if (a === '--runs') out.runs = Number(argv[++i])
    else if (a === '--no-server') out.startServer = false
    else if (a === '--all') out.mode = 'all'
    else if (a === '--core') out.mode = 'core'
    else if (a === '--port') out.port = Number(argv[++i])
    else if (a === '--origin') out.origin = argv[++i]
    else if (a === '--out-dir') out.outDir = resolve(argv[++i])
    else if (a === '--paths') {
      out.mode = 'paths'
      // remaining args until next flag
      while (argv[i + 1] && !argv[i + 1].startsWith('--')) {
        out.paths.push(argv[++i])
      }
    } else if (a === '--help' || a === '-h') {
      console.log(`Usage: node scripts/perf/run-lighthouse.mjs [options]
  --all              Bench every marketing page (${SITE_PATHS.length} paths)
  --core             Bench core 5 URLs (default)
  --paths /a /b      Custom path list
  --runs N           Runs per URL (default 3)
  --label name       Output label
  --no-server        Do not start next start
  --origin URL       Default http://127.0.0.1:8080
  --out-dir path     Where to write JSON (default docs/baselines)`)
      process.exit(0)
    }
  }
  return out
}

function median(nums) {
  const a = [...nums].sort((x, y) => x - y)
  const m = Math.floor(a.length / 2)
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2
}

function waitForServer(url, timeoutMs = 90000) {
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
  return JSON.parse(readFileSync(outFile, 'utf8'))
}

function gitMeta() {
  const run = (args) => {
    const r = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8' })
    return r.status === 0 ? r.stdout.trim() : null
  }
  return {
    commit: run(['rev-parse', 'HEAD']),
    commitShort: run(['rev-parse', '--short', 'HEAD']),
    branch: run(['rev-parse', '--abbrev-ref', 'HEAD']),
    subject: run(['log', '-1', '--pretty=%s']),
  }
}

function resolvePaths(args) {
  if (args.mode === 'all') return [...SITE_PATHS]
  if (args.mode === 'paths' && args.paths.length) {
    return args.paths.map((p) => (p.startsWith('/') ? p : `/${p}`))
  }
  return [...CORE_PATHS]
}

async function main() {
  if (!existsSync(CHROME)) {
    console.error(`Chrome not found at ${CHROME}. Set CHROME_PATH.`)
    process.exit(1)
  }

  const args = parseArgs(process.argv)
  const paths = resolvePaths(args)
  const urls = urlsForPaths(paths, args.origin)
  let serverProc = null

  if (args.startServer) {
    console.error(`Starting next start -p ${args.port}...`)
    serverProc = spawn('npm', ['run', 'start'], {
      cwd: ROOT,
      stdio: 'ignore',
      detached: true,
      env: { ...process.env, PORT: String(args.port) },
    })
    // package.json uses fixed -p 8080; ignore PORT if start script hardcodes it
    if (!waitForServer(`${args.origin}/`)) {
      if (serverProc.pid) {
        try {
          process.kill(-serverProc.pid, 'SIGTERM')
        } catch {
          /* */
        }
      }
      throw new Error(`Server did not become ready at ${args.origin}`)
    }
  }

  mkdirSync(args.outDir, { recursive: true })
  const tmpDir = join('/tmp', `sparq-lh-${Date.now()}`)
  mkdirSync(tmpDir, { recursive: true })

  const urlResults = []
  try {
    for (const url of urls) {
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
      const path = new URL(url).pathname || '/'
      urlResults.push({
        path: path === '' ? '/' : path,
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
  const git = gitMeta()
  const summary = {
    pathCount: urlResults.length,
    medianScore: median(urlResults.map((u) => u.median.score).filter((n) => typeof n === 'number')),
    medianLcpMs: median(urlResults.map((u) => u.median.lcpMs).filter((n) => typeof n === 'number')),
    maxCls: Math.max(...urlResults.map((u) => u.median.cls ?? 0)),
    worstLcp: [...urlResults].sort((a, b) => (b.median.lcpMs || 0) - (a.median.lcpMs || 0))[0],
    worstCls: [...urlResults].sort((a, b) => (b.median.cls || 0) - (a.median.cls || 0))[0],
  }

  const record = {
    kind: 'lighthouse-lab',
    label: args.label,
    mode: args.mode,
    capturedAt: new Date().toISOString(),
    date: today,
    git,
    chromePath: CHROME,
    formFactor: 'desktop',
    runsPerUrl: args.runs,
    summary,
    urls: urlResults,
  }

  const outPath = join(args.outDir, `${today}-${args.label}-lighthouse.json`)
  writeFileSync(outPath, JSON.stringify(record, null, 2) + '\n')

  // Compact table to stdout
  console.log(
    JSON.stringify(
      {
        summary,
        table: urlResults.map((u) => ({
          path: u.path,
          score: u.median.score,
          lcpMs: Math.round(u.median.lcpMs ?? 0),
          cls: Number((u.median.cls ?? 0).toFixed(4)),
          ttfbMs: Math.round(u.median.ttfbMs ?? 0),
          bytes: Math.round(u.median.totalByteWeight ?? 0),
        })),
      },
      null,
      2
    )
  )
  console.error(`\nWrote ${outPath}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
