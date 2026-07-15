# IDEAS — Multi-site performance benchmarking

**Status:** Research / planning (not implemented)  
**Date:** 2026-07-14  
**Context:** Follow-on to `docs/REPORT.md` (sparqsys optimization audit). Goal: build **once**, reuse across Next.js marketing sites and webapps.  
**Revisit:** Tomorrow — pick phase 0 vs scaffold `sparq-perf`.

---

## Summary

Prefer a **thin custom wrapper** around mature engines (Lighthouse CI, sitespeed.io, Next build/bundle tools, CrUX/PSI) rather than rebuilding Chrome’s auditing stack.

| Do use / compose | Do not reinvent |
|------------------|-----------------|
| Lighthouse + LHCI | Another Lighthouse UI |
| sitespeed.io | Full WebPageTest clone |
| Unlighthouse (campaign crawls) | Custom site crawler v1 |
| `@next/bundle-analyzer` + parse `next build` | Guessing JS cost by eye |
| CrUX / PageSpeed Insights API | Homegrown field panel |
| Playwright for app journeys | — (scripts are custom, runner is not) |

**Sweet spot:** multi-site registry + CLI orchestrator + Next-specific build probes.

---

## Why four layers

| Layer | Question | Tools |
|-------|----------|--------|
| **A. Build / ship** | What did we produce? | `next build` route table, `@next/bundle-analyzer`, dep budgets |
| **B. Lab / synthetic** | Controlled browser load? | Lighthouse, LHCI, sitespeed.io, Unlighthouse, WPT |
| **C. Field (CrUX)** | Real Chrome users? | PSI API, CrUX API / BigQuery |
| **D. RUM** | *Our* users on *our* stack? | `web-vitals` beacon → our store (later) |

- **PR gate:** A + B (fast feedback).  
- **Weekly:** full URL lists + C on prod origins.  
- **After big releases:** filmstrip/waterfall (sitespeed or WPT) on 3–5 critical URLs.  
- **Never** optimize only to Lighthouse scores — gate on **metrics + budgets** (LCP, INP, CLS, TTFB, JS bytes).

Lab ≠ field. Field wins SEO/user arguments; lab wins “this PR added 40 KB JS.”

---

## Third-party options (for us)

### Tier 1 — engines to wrap

#### Lighthouse + [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- Lab audits, multi-run median, performance budgets, PR assertions.
- Optional **LHCI server** for history + commit diffs (self-hostable).
- Gaps: weak multi-step journeys unless you list many URLs; not Next-bundle-aware.

#### [sitespeed.io](https://www.sitespeed.io/)
- Deep synthetic: real browsers, throttling, video/filmstrip, CPU, third parties.
- Plugins: Lighthouse, PSI, CrUX; store Graphite/Influx; Docker-first.
- Closest OSS “performance product we own” for continuous multi-URL runs.
- Gaps: heavier ops; Grafana/Graphite learning curve.

#### `@next/bundle-analyzer` + build output
- Treemaps (client / server / edge); First Load JS per route.
- Essential for a Next shop; same quantitative layer as `REPORT.md`.
- Gaps: build-time only.

#### [Unlighthouse](https://unlighthouse.dev/)
- Crawl site → Lighthouse every URL; great for marketing sitemaps and pre/post optimization sprints.
- Gaps: more campaign tool than continuous product.

#### WebPageTest (public or private)
- Gold-standard waterfalls / multi-location when you need *why* LCP is slow.
- Gaps: overkill as daily default if LHCI + sitespeed cover 90%.

### Tier 2 — field / convenience

| Tool | Role |
|------|------|
| PageSpeed Insights API | Lab + CrUX in one call; scheduled origin checks |
| CrUX API / BigQuery | Official field CWV; origin/URL; monthly depth in BQ |
| DevTools Performance / Coverage | Manual deep dives |
| Playwright + web-vitals / CDP | Auth flows, SPA soft navigations |

### Tier 3 — SaaS (optional)

Calibre, DebugBear, SpeedCurve, Checkly.  
Vercel Speed Insights only if hosted on Vercel — **not** our EC2/nginx path.

---

## Build-your-own architecture

### Multi-site registry

```yaml
# sites.yaml (illustrative)
sites:
  - id: sparqsys
    name: Company site
    baseUrl: https://www.sparqsys.com
    type: marketing
    urls:
      - /
      - /products/quad2
      - /investors
      - /resources/calculator
      - /support
    budgets:
      firstLoadJsKb: 130
      lcpMs: 2500
      cls: 0.1
      performanceScore: 0.85

  - id: toolbox
    name: SPARQ Toolbox
    baseUrl: https://...
    type: app
    urls: [...]
    journeys:
      - login-and-dashboard
```

Add a site = add config, not new tooling.

### Collectors (plugins)

| Collector | Engine | Output |
|-----------|--------|--------|
| `build` | Parse `next build` (+ optional analyzer) | Route sizes, shared JS, static vs `ƒ` dynamic count |
| `lighthouse` | LHCI / Lighthouse CLI (N runs, median) | Scores + lab CWV |
| `sitespeed` | Docker sitespeed.io | Rich HTML + metric series |
| `crawl` | Unlighthouse or sitemap | Full-site scores |
| `crux` | CrUX / PSI API | Field p75 |
| `rum` | `web-vitals` beacon | Optional real users |
| `playwright` | Journey scripts | App flows |

Normalized run record (sketch):

```ts
type PerfRun = {
  siteId: string
  env: 'pr' | 'staging' | 'prod'
  commit?: string
  startedAt: string
  urls: Array<{
    url: string
    lab?: { lcp: number; cls: number; tbt: number; fcp: number; score: number; ttfb: number; jsBytes: number }
    field?: { lcp_p75: number; inp_p75: number; cls_p75: number; form_factor: string }
    build?: { firstLoadJs: number; routeSize: number; sharedJs: number }
  }>
  artifacts: Array<{ kind: string; path: string }>
}
```

Store: JSON on disk/S3 + optional SQLite/Postgres for trends.

### Next-specific probes (high-leverage custom code)

1. Parse `next build` into structured route tables (Size / First Load JS / static vs dynamic).  
2. CI artifact: `ANALYZE=true` bundle analyzer HTML.  
3. Count dynamic (`ƒ`) vs static (`○`) routes — tracks RSC work from `REPORT.md`.  
4. Dependency budgets (fail if banned packages return: stock chart libs, etc.).  
5. TTFB vs full waterfall (surfaces nginx → Node SSR cost).

~Hundreds of lines of glue, not a product rewrite.

### Runner topology

```text
perf-runner (Docker on EC2 or CI)
  ├── sites.yaml
  ├── collectors/*
  └── results/ + artifacts

Triggers:
  • GitHub Actions (PR preview / localhost after build)
  • Nightly cron (prod URL lists)
  • Manual CLI (audit campaigns)

History UI (v1):
  • LHCI server HTML  and/or  Grafana on sitespeed metrics
  • Custom dashboard only if the above is painful
```

### Skip in v1

- Fancy custom dashboard  
- Multi-region agents  
- Full RUM  
- AI “explain Lighthouse”  
- Competing with sitespeed/WPT feature sets  

---

## Phased plan

### Phase 0 — this week (no new product)

1. LHCI on 1–2 Next repos (budgets: LCP, CLS, total bytes, JS).  
2. `@next/bundle-analyzer` script + CI artifact.  
3. One baseline Unlighthouse or sitespeed Docker run on sparqsys prod (save JSON/HTML).  
4. Monthly PSI/CrUX check on production origin.

### Phase 1 — `sparq-perf` (or monorepo package)

```text
sparq-perf/
  sites.yaml
  collectors/
    lighthouse.ts
    next-build.ts
    crux.ts
  budgets/
    marketing.json
    app.json
  docker-compose.yml    # optional LHCI server
  cli.ts                # perf run --site sparqsys
```

```bash
perf run --site sparqsys --env prod
perf run --site sparqsys --env pr --base-url http://127.0.0.1:3000
perf compare --site sparqsys --from main --to HEAD
perf report --site sparqsys --last 30d
```

### Phase 2 — deepen

- sitespeed continuous (filmstrip, third parties)  
- Playwright journeys for apps  
- CrUX History into same store  
- Optional RUM via `web-vitals` → ops/logging stack  

### Phase 3 — only if needed

Private WPT, multi-region, competitor leaderboard (sitespeed already has pieces).

---

## Buy vs build

| Need | Prefer | Custom? |
|------|--------|---------|
| Lighthouse over time | LHCI server | No |
| Continuous multi-URL synthetic | sitespeed.io | Thin wrapper |
| Full-site audit campaign | Unlighthouse | No |
| Next route/bundle tables | build parse + analyzer | **Yes — small** |
| Multi-site registry + one CLI | — | **Yes — core** |
| PR budget gates | LHCI assertions | Wire CI |
| Field CWV | CrUX / PSI | Thin collector |
| Auth app flows | Playwright | Scripts per app |
| Real-user INP by feature | — | RUM later |

---

## Starting budgets

### Marketing Next (sparqsys-class, mobile lab)

| Metric | Starting budget |
|--------|-----------------|
| Performance score | ≥ 0.85 (trend > single number) |
| LCP | ≤ 2.5 s |
| CLS | ≤ 0.1 |
| TBT | ≤ 200–300 ms |
| Home First Load JS | ≤ 130 KB (audit baseline ~165 KB) |
| Dynamic route count | Track; aim down after RSC work |

### App (logged-in)

| Metric | Focus |
|--------|--------|
| INP (field/RUM) | ≤ 200 ms |
| Journey TTFB / soft-nav | Playwright scripts |
| Critical-path JS | Per-entry bundle budgets |

Always **3–5 lab runs**, take median (LHCI does this).

---

## Tie-in to `docs/REPORT.md`

| Audit finding | Measure after fix |
|---------------|-------------------|
| All routes dynamic (`ƒ`) | Build probe: static vs dynamic; lab TTFB |
| Motion / Firebase weight | First Load JS + main-thread / unused JS |
| exceljs lazy | Confirm absent from home First Load |
| Dead package removal | Analyzer + install surface before/after |
| Asset cull | Transfer size / bytes in |

Re-run the **same URL list + same throttling** before/after Phase A/B so comparisons stay valid for cross-check (GPT / Fable / us).

---

## Decision for tomorrow

- [ ] Adopt Phase 0 only (LHCI + analyzer + one baseline crawl)?  
- [ ] Scaffold `sparq-perf` Phase 1 (registry + CLI + next-build + lighthouse collectors)?  
- [ ] Prefer sitespeed.io or LHCI as primary continuous engine first?  
- [ ] Which sites beyond sparqsys enter `sites.yaml` v1?  
- [ ] Host runner: GitHub Actions only vs small always-on EC2 Docker?

---

## References

- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)  
- [sitespeed.io docs](https://www.sitespeed.io/documentation/sitespeed.io/)  
- [Next.js bundle analyzer](https://nextjs.org/docs/app/building-your-application/optimizing/bundle-analyzer)  
- [CrUX API](https://developer.chrome.com/docs/crux/guides/crux-api)  
- [Unlighthouse](https://unlighthouse.dev/)  
- Internal: `docs/REPORT.md` (sparqsys audit baselines)

---

*Captured from investigation discussion; no tooling implemented yet.*

---

## Review addendum — Fable 5 (Claude Code), 2026-07-15

Read in the context of quantifying the `docs/REPORT.md` optimization sweep. Overall verdict: **the core stance is correct** — wrap mature engines (LHCI, sitespeed, Unlighthouse, CrUX) rather than rebuilding them; the four-layer model and starting budgets are sound. The pushback below is about scope and sequencing, not direction.

### A1. Scope tension: the doc answers a bigger question than the immediate one

IDEAS.md is designed around "build once, reuse across sites." The immediate need is narrower: **before/after measurement of one sweep on one site.** Scaffolding `sparq-perf` first builds the instrument before running the experiment, and designs the CLI's abstractions before any collector has been used in anger.

**Recommendation:** Phase 0 only (trimmed — see A3). Scaffold `sparq-perf` *after* Phase B of the report plan, lifting the Phase 0 scripts in as the first collectors, so the abstraction is extracted from working code rather than invented up front.

### A2. Corrections / reality checks

1. **CrUX/field layer may be a dead end for sparqsys.** CrUX only includes origins/URLs with sufficient Chrome traffic; small corporate sites frequently don't make the dataset, or appear only at origin level. Make **one PSI API call** to check for CrUX presence before scheduling monthly pulls. If absent, the field layer is RUM-or-nothing (and RUM is correctly deferred).
2. **Runner topology says GitHub Actions; this repo uses Gitea Actions** (`.gitea/workflows/`). Same shape, but LHCI's GitHub status-check integration does not apply — gate via LHCI assertion exit codes in the Gitea pipeline instead.
3. **sitespeed.io + Grafana as the primary continuous engine is premature.** Right tool once filmstrips and cross-site trend dashboards are wanted, but it drags in Docker + Graphite/Grafana ops. LHCI assertions + JSON output cover both the sprint and the eventual PR gate with far less machinery. Move sitespeed to the "skip in v1" list; revisit in Phase 2.
4. **Baseline timing is load-bearing and unstated:** the baseline must be captured **before REPORT.md PR 1 lands**, on the pinned current commit, with the artifacts (JSON + HTML) committed or stored. The report's section 3 numbers are from 2026-07-14 on unspecified hardware — indicative, not a valid comparison baseline.
5. **Lab comparisons should run against a local production build** (`next build && next start`, fixed throttling, 5 runs, median) — same hardware, no network/deploy noise, exact commit control. Prod measurement is still needed, but for one specific claim only: the dynamic→static win materializes at the nginx layer (cacheable HTML, no Node hit), so **prod TTFB before/after** is the measurement for that finding specifically.

### A3. Minimal measurement set for the REPORT.md sweep

Three measurements cover every quantifiable claim in the report, in increasing effort:

| # | Measurement | Quantifies | Cost |
|---|-------------|------------|------|
| 1 | **`next build` route-table parser → JSON** | First Load JS per route; static `○` vs dynamic `ƒ` count (report's headline finding: 27/27 dynamic) | ~100 lines, deterministic, zero variance; becomes the `next-build` collector later |
| 2 | **LHCI on local prod build**, ~5 URLs (`/`, `/products/quad2`, `/investors`, `/resources/legal`, `/resources/calculator`), 5 runs, median | Lab LCP/CLS/TBT/TTFB, JS bytes; Motion/Firebase weight (F2/F3) | Half-day incl. config |
| 3 | **One prod baseline crawl** (Unlighthouse; 21 pages is trivial) + **prod TTFB** checks | Whole-site snapshot; nginx-layer win from F1 | One-shot, save artifacts |

The doc's own rule — **same URL list, same throttling, before and after** — is the single most important line in it; without that, the GPT/Fable cross-check of results becomes an argument about methodology instead of numbers.

### A4. Answers to the "decision for tomorrow" checklist

| Question | Recommendation |
|----------|----------------|
| Phase 0 vs scaffold `sparq-perf`? | **Phase 0 only**, trimmed to A3. Scaffold after Phase B of the report plan. |
| sitespeed.io or LHCI as primary engine? | **LHCI.** sitespeed in Phase 2 if filmstrips/trends are wanted. |
| Sites in `sites.yaml` v1? | sparqsys only; add Toolbox when `sparq-perf` is scaffolded. |
| Runner host? | Manual/local (or EC2 one-shot) for the sprint. Wire into **Gitea** CI as a budget gate after Phase B lands and numbers stabilize. |

### A5. Suggested sequence (interleaved with REPORT.md §12.5)

1. Capture baseline (A3 items 1–3) on the current commit; store artifacts.
2. REPORT.md PR 1 (Phase A) → re-run A3.1–2 (expect: route table identical First Load JS, smaller install; lab metrics ≈ unchanged — Phase A is not a bundle win, per REPORT.md §12.3).
3. Theme PR (F1) → re-run all of A3 (expect: static routes appear, prod TTFB drops).
4. RSC/Motion/Firebase batches → re-run per batch; gate on the §"Starting budgets" table (home First Load JS ≤ 130 KB).
5. Post-sweep: scaffold `sparq-perf` Phase 1 from the working scripts; add LHCI assertions to Gitea CI.

*Addendum only; no tooling implemented in this pass.*
