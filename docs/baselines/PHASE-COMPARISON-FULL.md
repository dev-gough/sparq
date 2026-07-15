# Full-site phase comparison

Generated from worktree benches (21 pages × 3 runs, desktop lab).

| Milestone | Commit | Home FL JS | Static routes | Dynamic |
|-----------|--------|------------|---------------|---------|
| Initial (fc4e5ed) | `fc4e5ed` | 165 kB | 0 | 27 |
| Phase 1 (2e2d2aa) | `2e2d2aa` | 167 kB | 0 | 26 |
| Phase 2 theme (5904ab8) | `5904ab8` | 167 kB | 22 | 4 |
| Phase 3 end (f993b80) | `f993b80` | 124 kB | 22 | 4 |

## Lab medians (selected paths)

| Path | Pre LCP | P1 LCP | P2 LCP | P3 LCP | Pre CLS | P2 CLS | P3 CLS |
|------|--------:|-------:|-------:|-------:|--------:|-------:|-------:|
| `/` | 576 | 577 | 741 | 492 | 0 | 0 | 0 |
| `/products/quad2` | 2511 | 2555 | 2613 | 523 | 0 | 0 | 0 |
| `/investors` | 1732 | 1757 | 1781 | 531 | 0 | 0.4593 | 0 |
| `/resources/legal` | 589 | 590 | 747 | 503 | 0.0039 | 0.0039 | 0 |
| `/resources/calculator` | 586 | 580 | 774 | 712 | 0 | 0 | 0 |
| `/resources` | 708 | 712 | 890 | 812 | 0 | 0.4593 | 0.4543 |
| `/products/legacy` | 12181 | 12183 | 12325 | 526 | 0 | 0 | 0 |

## Notes

- **Phase 2** introduced static marketing routes but also full-page `Suspense fallback={null}` for `useSearchParams` on /investors and /resources → **CLS ~0.45**.
- **Phase 3** fixed /investors CLS (island isolation); **/resources still has the same pattern** (CLS ~0.45 remains there).
- **/products/legacy** LCP ~12s is transfer-size (large media ~14 MB), not SSR mode.
- Home First Load JS drops mainly in Phase 3 (Motion + Firebase idle), not Phase 1–2.
