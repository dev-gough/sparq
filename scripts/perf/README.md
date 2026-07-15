# Performance measurement (Phase 0)

Thin wrappers for before/after comparisons during the optimization sweep.
See `docs/REPORT.md` and `docs/IDEAS.md`.

## 1. Next.js build route table

Deterministic, zero variance — primary metric for First Load JS and static vs dynamic counts.

```bash
# Run production build + write docs/baselines/<date>-<label>.json
node scripts/perf/parse-next-build.mjs --label pre-phase-a

# Re-parse a saved log
node scripts/perf/parse-next-build.mjs --from-log docs/baselines/2026-07-15-pre-phase-a.build.log --label pre-phase-a
```

## 2. Lighthouse lab (preferred runner)

Fixed URL list (do not change mid-sprint without noting it):

- `/`
- `/products/quad2`
- `/investors`
- `/resources/legal`
- `/resources/calculator`

```bash
npm run build
# Uses Playwright Chromium + --no-sandbox (works on AppArmor-locked hosts)
node scripts/perf/run-lighthouse.mjs --label post-phase-a --runs 3
# → docs/baselines/<date>-<label>-lighthouse.json
```

Optional LHCI wrapper (`scripts/perf/lighthouserc.js`) for later CI; on some Linux hosts LHCI does not reliably pass chromeFlags — use `run-lighthouse.mjs` for sprint baselines.

Use the **same URL list and throttling** before and after each PR.

## 3. Budgets (track → gate post Phase B)

| Metric | Target |
|--------|--------|
| Home First Load JS | ≤ 130 kB |
| LCP | ≤ 2.5 s |
| CLS | ≤ 0.1 |
| TBT | ≤ 200–300 ms |
| Performance score | ≥ 0.85 (trend) |

## Cadence

```
pre-phase-a baseline
  → Phase A → re-run build parser (+ LHCI)
  → theme PR → re-run all
  → each RSC batch → re-run
```
