#!/usr/bin/env node
/**
 * Parse Next.js `next build` route table into structured JSON.
 *
 * Usage:
 *   node scripts/perf/parse-next-build.mjs                  # run build, write baseline
 *   node scripts/perf/parse-next-build.mjs --from-log path   # parse saved stdout
 *   node scripts/perf/parse-next-build.mjs --label pre-phase-a
 *
 * Output: docs/baselines/<date>-<label>.json (and stdout summary)
 */

import { spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../..')
const BASELINES_DIR = join(ROOT, 'docs/baselines')

function parseArgs(argv) {
  const out = { fromLog: null, label: 'baseline', out: null, skipBuild: false }
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--from-log') out.fromLog = argv[++i]
    else if (a === '--label') out.label = argv[++i]
    else if (a === '--out') out.out = argv[++i]
    else if (a === '--skip-build') out.skipBuild = true
    else if (a === '--help' || a === '-h') {
      console.log(`Usage: node scripts/perf/parse-next-build.mjs [--label name] [--out path] [--from-log path]`)
      process.exit(0)
    }
  }
  return out
}

/** Parse size strings like "6.33 kB", "165 kB", "981 B" → bytes */
function parseSizeToBytes(s) {
  if (!s || s === '-') return null
  const m = String(s).trim().match(/^([\d.]+)\s*(B|kB|MB|GB)?$/i)
  if (!m) return null
  const n = parseFloat(m[1])
  const unit = (m[2] || 'B').toUpperCase()
  const mult = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 }
  return Math.round(n * (mult[unit] || 1))
}

/**
 * Next 15 route table lines look like:
 *   ┌ ○ /                                    6.33 kB         165 kB
 *   ├ ƒ /about                               2.42 kB         142 kB
 *   └ ƒ /api/health                            153 B         101 kB
 *
 * Next 16 may omit size / First Load JS columns (metrics removed from build output).
 * We still parse markers + paths; sizes become null when absent.
 * Markers: ○ Static, ● SSG, ƒ Dynamic, ℇ Edge, ƛ Middleware, ◐ Partial
 */
function parseRouteTable(text) {
  const lines = text.split(/\r?\n/)
  const routes = []
  // Full Next 15-style: marker path size firstLoad
  const reFull =
    /^[├└┌│\s]*([○●ƒℇƛ◐])\s+(\/[^\s]*)\s+([\d.]+\s*(?:B|kB|MB)?)\s+([\d.]+\s*(?:B|kB|MB)?)\s*$/
  // Next 16 slim: marker path only (optional trailing sizes)
  const reSlim =
    /^[├└┌│\s]*([○●ƒℇƛ◐])\s+(\/[^\s]*)(?:\s+([\d.]+\s*(?:B|kB|MB)?))?(?:\s+([\d.]+\s*(?:B|kB|MB)?))?\s*$/

  const markerMap = {
    '○': 'static',
    '●': 'ssg',
    'ƒ': 'dynamic',
    'ℇ': 'edge',
    'ƛ': 'middleware',
    '◐': 'partial',
  }

  let inTable = false
  for (const line of lines) {
    if (/Route\s*\(app\)/i.test(line) || /First Load JS/.test(line)) {
      inTable = true
      continue
    }
    if (inTable && (/^\s*ƒ\s+\(Dynamic\)/.test(line) || /^\s*○\s+\(Static\)/.test(line) || /^\s*●\s+\(SSG\)/.test(line))) {
      // legend — end of data rows often continues; keep scanning
    }
    if (inTable && /^\s*$/.test(line) && routes.length > 0) {
      // blank after rows — might still have more; don't hard stop
    }

    const m = line.match(reFull) || line.match(reSlim)
    if (m) {
      const [, marker, path, sizeStr, firstLoadStr] = m
      routes.push({
        path,
        marker,
        rendering: markerMap[marker] || 'unknown',
        size: sizeStr ? sizeStr.trim() : null,
        sizeBytes: parseSizeToBytes(sizeStr),
        firstLoadJs: firstLoadStr ? firstLoadStr.trim() : null,
        firstLoadJsBytes: parseSizeToBytes(firstLoadStr),
      })
    }

    // Shared First Load JS line: " + First Load JS shared by all                 100 kB"
    const shared = line.match(/First Load JS shared by all\s+([\d.]+\s*(?:B|kB|MB)?)/i)
    if (shared) {
      // attached after loop
      routes._shared = shared[1].trim()
    }
  }

  // extract shared from full text more reliably
  const sharedMatch = text.match(/First Load JS shared by all\s+([\d.]+\s*(?:B|kB|MB)?)/i)
  const sharedJs = sharedMatch ? sharedMatch[1].trim() : null

  return { routes: routes.filter(Boolean), sharedJs, sharedJsBytes: parseSizeToBytes(sharedJs) }
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

function packageMeta() {
  try {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
    return { name: pkg.name, version: pkg.version, next: pkg.dependencies?.next }
  } catch {
    return null
  }
}

function summarize(routes, sharedJs) {
  const pages = routes.filter((r) => !r.path.startsWith('/api') && r.path !== '/_not-found')
  const apis = routes.filter((r) => r.path.startsWith('/api'))
  const byRendering = {}
  for (const r of routes) {
    byRendering[r.rendering] = (byRendering[r.rendering] || 0) + 1
  }
  const home = routes.find((r) => r.path === '/')
  const heaviest = [...pages].sort((a, b) => (b.firstLoadJsBytes || 0) - (a.firstLoadJsBytes || 0)).slice(0, 5)
  return {
    totalRoutes: routes.length,
    pageCount: pages.length,
    apiCount: apis.length,
    byRendering,
    sharedFirstLoadJs: sharedJs,
    homeFirstLoadJs: home?.firstLoadJs ?? null,
    homeFirstLoadJsBytes: home?.firstLoadJsBytes ?? null,
    heaviestPages: heaviest.map((r) => ({
      path: r.path,
      firstLoadJs: r.firstLoadJs,
      size: r.size,
      rendering: r.rendering,
    })),
  }
}

function runBuild() {
  console.error('Running production build (npm run build)...')
  const r = spawnSync('npm', ['run', 'build'], {
    cwd: ROOT,
    encoding: 'utf8',
    env: { ...process.env, NODE_ENV: 'production' },
    maxBuffer: 32 * 1024 * 1024,
  })
  const combined = `${r.stdout || ''}\n${r.stderr || ''}`
  if (r.status !== 0) {
    console.error(combined)
    throw new Error(`next build failed with exit ${r.status}`)
  }
  return combined
}

function main() {
  const args = parseArgs(process.argv)
  let buildLog

  if (args.fromLog) {
    buildLog = readFileSync(resolve(args.fromLog), 'utf8')
  } else {
    buildLog = runBuild()
  }

  const { routes, sharedJs, sharedJsBytes } = parseRouteTable(buildLog)
  if (routes.length === 0) {
    console.error('No routes parsed from build output. Dumping last 80 lines:')
    console.error(buildLog.split('\n').slice(-80).join('\n'))
    process.exit(1)
  }

  const git = gitMeta()
  const today = new Date().toISOString().slice(0, 10)
  const record = {
    kind: 'next-build-route-table',
    label: args.label,
    capturedAt: new Date().toISOString(),
    date: today,
    git,
    package: packageMeta(),
    summary: summarize(routes, sharedJs),
    sharedJs,
    sharedJsBytes,
    routes,
    buildLogSha256: createHash('sha256').update(buildLog).digest('hex'),
  }

  mkdirSync(BASELINES_DIR, { recursive: true })
  const outPath =
    args.out ||
    join(BASELINES_DIR, `${today}-${args.label}.json`)
  writeFileSync(outPath, JSON.stringify(record, null, 2) + '\n')

  // Also keep raw build log next to baseline for re-parse
  const logPath = outPath.replace(/\.json$/, '.build.log')
  writeFileSync(logPath, buildLog)

  console.log(JSON.stringify(record.summary, null, 2))
  console.error(`\nWrote ${outPath}`)
  console.error(`Wrote ${logPath}`)
  console.error(
    `Routes: ${record.summary.totalRoutes} | dynamic: ${record.summary.byRendering.dynamic || 0} | static: ${record.summary.byRendering.static || 0} | home FL: ${record.summary.homeFirstLoadJs} | shared: ${sharedJs}`
  )
}

main()
