#!/usr/bin/env node
/**
 * Full-site lab bench for a historical git commit using an isolated worktree.
 * Always uses the *current* scripts/perf tooling (copied into the worktree).
 *
 * Usage (from repo root on the branch that has scripts/perf):
 *   node scripts/perf/bench-at-commit.mjs --commit fc4e5ed --label pre-phase-a-full
 *   node scripts/perf/bench-at-commit.mjs --commit 2e2d2aa --label phase1-full --all
 *
 * Steps: worktree → npm ci/install → next build → parse route table → LH --all
 * Results are written into the *main* repo docs/baselines/ (not the worktree).
 */

import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, cpSync, rmSync, writeFileSync, readFileSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const MAIN_ROOT = resolve(__dirname, '../..')
const BASELINES = join(MAIN_ROOT, 'docs/baselines')

function parseArgs(argv) {
  const out = {
    commit: null,
    label: null,
    all: true,
    runs: 3,
    keepWorktree: false,
    skipInstall: false,
  }
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--commit') out.commit = argv[++i]
    else if (argv[i] === '--label') out.label = argv[++i]
    else if (argv[i] === '--core') out.all = false
    else if (argv[i] === '--all') out.all = true
    else if (argv[i] === '--runs') out.runs = Number(argv[++i])
    else if (argv[i] === '--keep-worktree') out.keepWorktree = true
    else if (argv[i] === '--skip-install') out.skipInstall = true
  }
  if (!out.commit) {
    console.error('Required: --commit <sha>')
    process.exit(1)
  }
  if (!out.label) out.label = `at-${out.commit.slice(0, 7)}`
  return out
}

function run(cmd, args, opts = {}) {
  console.error(`$ ${cmd} ${args.join(' ')}`)
  const r = spawnSync(cmd, args, {
    encoding: 'utf8',
    stdio: opts.stdio ?? 'inherit',
    cwd: opts.cwd ?? MAIN_ROOT,
    env: { ...process.env, ...(opts.env || {}) },
    maxBuffer: 64 * 1024 * 1024,
  })
  if (r.status !== 0 && !opts.allowFail) {
    throw new Error(`Command failed (${r.status}): ${cmd} ${args.join(' ')}`)
  }
  return r
}

function main() {
  const args = parseArgs(process.argv)
  const short = spawnSync('git', ['rev-parse', '--short', args.commit], {
    cwd: MAIN_ROOT,
    encoding: 'utf8',
  }).stdout.trim()
  const full = spawnSync('git', ['rev-parse', args.commit], {
    cwd: MAIN_ROOT,
    encoding: 'utf8',
  }).stdout.trim()

  const worktree = join(tmpdir(), `sparq-bench-${short}-${Date.now()}`)
  console.error(`\n=== Bench commit ${short} (${full}) ===`)
  console.error(`Worktree: ${worktree}`)
  console.error(`Label: ${args.label}`)

  mkdirSync(BASELINES, { recursive: true })

  // Remove stale worktree path if present
  if (existsSync(worktree)) {
    run('git', ['worktree', 'remove', '--force', worktree], { allowFail: true })
    rmSync(worktree, { recursive: true, force: true })
  }

  run('git', ['worktree', 'add', '--detach', worktree, full])

  try {
    // Overlay current perf tooling + keep worktree package.json from that commit
    mkdirSync(join(worktree, 'scripts'), { recursive: true })
    cpSync(join(MAIN_ROOT, 'scripts/perf'), join(worktree, 'scripts/perf'), { recursive: true })

    // Ensure start script exists (historical packages all have next start)
    if (!args.skipInstall) {
      // Prefer ci when lockfile exists
      const lock = join(worktree, 'package-lock.json')
      if (existsSync(lock)) {
        run('npm', ['ci'], { cwd: worktree, allowFail: true })
        // Fallback if lock/package mismatch
        if (!existsSync(join(worktree, 'node_modules/next'))) {
          run('npm', ['install'], { cwd: worktree })
        }
      } else {
        run('npm', ['install'], { cwd: worktree })
      }
    }

    // Build + route table into MAIN baselines
    run(
      'node',
      [
        join(worktree, 'scripts/perf/parse-next-build.mjs'),
        '--label',
        args.label,
        '--out',
        join(BASELINES, `${new Date().toISOString().slice(0, 10)}-${args.label}.json`),
      ],
      { cwd: worktree }
    )

    // Lighthouse full site (uses worktree build + start, scripts from overlay)
    // parse-next-build already built; run LH with --all
    const lhArgs = [
      join(worktree, 'scripts/perf/run-lighthouse.mjs'),
      '--label',
      args.label,
      '--runs',
      String(args.runs),
      '--out-dir',
      BASELINES,
    ]
    if (args.all) lhArgs.push('--all')
    else lhArgs.push('--core')

    // run-lighthouse ROOT is derived from script path → worktree; good.
    // But package.json "start" is next start -p 8080 in both eras.
    // Kill anything on 8080 first
    spawnSync('fuser', ['-k', '8080/tcp'], { encoding: 'utf8' })
    run('node', lhArgs, { cwd: worktree })

    // Annotate lighthouse JSON with requested commit (worktree HEAD matches)
    const today = new Date().toISOString().slice(0, 10)
    const lhPath = join(BASELINES, `${today}-${args.label}-lighthouse.json`)
    if (existsSync(lhPath)) {
      const rec = JSON.parse(readFileSync(lhPath, 'utf8'))
      rec.benchAtCommit = { full, short, label: args.label }
      writeFileSync(lhPath, JSON.stringify(rec, null, 2) + '\n')
    }

    console.error(`\nDone bench for ${short} → docs/baselines/*-${args.label}*`)
  } finally {
    spawnSync('fuser', ['-k', '8080/tcp'], { encoding: 'utf8' })
    if (!args.keepWorktree) {
      run('git', ['worktree', 'remove', '--force', worktree], { allowFail: true })
      rmSync(worktree, { recursive: true, force: true })
    } else {
      console.error(`Kept worktree at ${worktree}`)
    }
  }
}

main()
