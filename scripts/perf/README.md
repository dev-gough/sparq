# Performance measurement

Thin wrappers for before/after comparisons. See `docs/REPORT.md` and `docs/IDEAS.md`.

## Site routes

Marketing paths live in `site-routes.mjs` (`SITE_PATHS` = full crawl, `CORE_PATHS` = 5-URL sprint set).

## 1. Next.js build route table

```bash
node scripts/perf/parse-next-build.mjs --label my-label
# → docs/baselines/<date>-my-label.json + .build.log
```

**Always measure after the feature commit** so you can re-run from that SHA.

## 2. Lighthouse lab

```bash
npm run build

# Core 5 URLs (default)
npm run perf:lighthouse -- --label post-x --runs 3

# Full site (all marketing pages)
npm run perf:lighthouse:all -- --label post-x-full --runs 3
```

Desktop profile, fixed throttling, Playwright Chromium + `--no-sandbox`.

## 3. Bench a historical commit (full site)

Uses a **detached worktree**, overlays current `scripts/perf`, builds that commit, runs full LH, writes into this repo’s `docs/baselines/`.

```bash
# From current branch (with scripts/perf present)
node scripts/perf/bench-at-commit.mjs --commit fc4e5ed --label pre-phase-a-full --all --runs 3
node scripts/perf/bench-at-commit.mjs --commit 2e2d2aa --label phase1-full --all --runs 3
node scripts/perf/bench-at-commit.mjs --commit 5904ab8 --label phase2-full --all --runs 3
node scripts/perf/bench-at-commit.mjs --commit f993b80 --label phase3-full --all --runs 3
```

## 4. Budgets

| Metric | Target |
|--------|--------|
| Home First Load JS | ≤ 130 kB |
| LCP | ≤ 2.5 s |
| CLS | ≤ 0.1 |
| TBT | ≤ 200–300 ms |
| Performance score | ≥ 0.85 (trend) |
