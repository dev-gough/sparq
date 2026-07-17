# Full-site phase comparison

Generated from worktree benches (21 pages × 3 runs, desktop lab).

| Milestone | Commit | Home FL JS | Shared FL | Static routes | Dynamic |
|-----------|--------|------------|-----------|---------------|---------|
| Initial (fc4e5ed) | `fc4e5ed` | 165 kB | 100 kB | 0 | 27 |
| Phase 1 (2e2d2aa) | `2e2d2aa` | 167 kB | 102 kB | 0 | 26 |
| Phase 2 theme (5904ab8) | `5904ab8` | 167 kB | 102 kB | 22 | 4 |
| Phase 3 end (f993b80) | `f993b80` | 124 kB | 102 kB | 22 | 4 |
| **Final (3637207)** | `3637207` | **137 kB** | **115 kB** | **22** | **4** |

Visual brief: [`perf-before-after.html`](./perf-before-after.html)

## Lab medians (selected paths)

| Path | Pre LCP | P3 LCP | Final LCP | Pre CLS | P3 CLS | Final CLS |
|------|--------:|-------:|----------:|--------:|-------:|----------:|
| `/` | 576 | 492 | 526 | 0 | 0 | 0 |
| `/products/quad2` | 2511 | 523 | 525 | 0 | 0 | 0 |
| `/investors` | 1732 | 531 | 532 | 0 | 0 | 0 |
| `/resources/legal` | 589 | 503 | 544 | 0.0039 | 0 | 0 |
| `/resources/calculator` | 586 | 712 | 505 | 0 | 0 | 0 |
| `/resources` | 708 | 812 | 545 | 0 | 0.4543 | **0** |
| `/products/legacy` | 12181 | 526 | 526 | 0 | 0 | 0 |

## Sitewide lab aggregates

| Metric | Pre | P3 | Final |
|--------|----:|---:|------:|
| Mean LCP | 1392 ms | 555 ms | **528 ms** |
| Max LCP | 12181 ms | 812 ms | **570 ms** |
| Max CLS | ~0 | 0.45 | **0** |
| Perfect scores (1.0) | 17/21 | 20/21 | **21/21** |
| Mean transfer | 1169 kB | 1157 kB | **480 kB** |

## Notes

- **Phase 2** introduced static marketing routes but also full-page `Suspense fallback={null}` for `useSearchParams` on /investors and /resources → **CLS ~0.45**.
- **Phase 3** fixed /investors CLS (island isolation); **/resources** fixed immediately after (`eb2a8ac`).
- **Final** removes remaining Motion, image `sizes`/WebP, view transitions (shared FL ↑ to 115 kB), a11y. Lab: **all 21 pages score 1.0**, max CLS 0.
- Home FL 124 → 137 kB from view-transition shared React chunk; still −28 kB vs Pre.
- **/products/legacy** LCP ~12s was transfer-size (~14 MB); Final transfer ~0.5 MB.
