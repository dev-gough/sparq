# Performance baselines

Captured during the optimization sweep (`docs/REPORT.md` / `docs/IDEAS.md`).

| File | What |
|------|------|
| `2026-07-15-pre-phase-a.json` | Next build route table **before** Phase A (27 dynamic routes, home 165 kB FL JS) |
| `2026-07-15-pre-phase-a.build.log` | Raw `next build` stdout for re-parse |
| `2026-07-15-post-phase-a.json` | Route table **after** Phase A (Next 15.5.20; 26 routes, home ~167 kB — framework bump) |
| `2026-07-15-post-phase-a-lighthouse.json` | Lab Lighthouse medians (3 runs) after Phase A |
| `2026-07-15-post-theme-5904ab8.json` | Route table **after** theme PR (`5904ab8`): **22 static / 4 dynamic** (APIs only) |
| `2026-07-15-post-theme-5904ab8-lighthouse.json` | Lab Lighthouse medians (3 runs) at commit `5904ab8` |

Convention: measure **after** the feature commit, and put the short SHA in the label so you can `git checkout <sha>` and re-run.

Only commit the summarized `*-lighthouse.json` + route-table JSON/logs — not `.lh-tmp-*` per-run dumps.

## How to re-capture

**Always commit first**, then measure from that commit so baselines are re-runnable:

```bash
git rev-parse --short HEAD   # record in the label if useful
npm run perf:build-baseline -- --label post-theme
npm run perf:lighthouse -- --label post-theme --runs 3   # 3 runs default for lab
```

Phase A is **not** expected to move First Load JS (dead code was already tree-shaken). Theme (no layout `cookies()`) + RSC batches are where static routes and FL JS wins land.
