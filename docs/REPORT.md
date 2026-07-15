# Sparq Systems Site — Optimization Audit Report

**Repo:** `sparq` (company site)  
**Branch for this report:** `audit/minification-report`  
**Stack:** Next.js **15.2.8** (App Router), React **19**, TypeScript, Tailwind CSS **4**  
**Deploy target:** nginx + AWS EC2 (`next start -p 8080`) — **not** Vercel  
**Audit date:** 2026-07-14  
**Auditor:** Grok (xAI) — intended for cross-check by GPT-5.6 and Fable 5  

---

## 0. Executive summary

This is a relatively small corporate marketing site (~**12.3k** lines of TS/TSX under `src/`, **21** pages, **5** API route handlers) with a **disproportionately heavy dependency surface** and a **client-heavy rendering model** that undercuts SSR/SSG benefits.

### Priorities (as directed)

| Rank | Goal | Verdict |
|------|------|---------|
| 1 | **Runtime / SSR performance** | **High leverage.** Every page is `'use client'`. Root layout calls `cookies()`, so **all 27 generated routes are dynamic (`ƒ`)**. No static HTML at the edge/nginx layer. Motion + Firebase pull large client JS on many pages. |
| 2 | **Dependency surface** | **High leverage.** At least **8 packages have zero runtime imports**. Stock chart stack is dead. Dual icon libraries. `exceljs` ships a **~912 KB** client chunk (lazy). `@vercel/speed-insights` is irrelevant on EC2. |
| 3 | Bundle size / LoC / assets | **Medium–high.** Shared First Load JS ≈ **100 KB**. Heaviest pages: legal, resources, investors. **`public/` ≈ 104 MB**; ~**30 MB** appears unreferenced. ~**1.5k LoC** of orphaned components. |

### Top 5 actions (if you only do five things)

1. **Make marketing pages static (or mostly static)** — stop forcing dynamic rendering via theme cookies; split interactive islands from server page shells.  
2. **Patch Next/AWS and delete the dead stock stack + unused packages** (`lightweight-charts`, stock components/API, `next-intl`, `cheerio`, `swr`, `luxon`, `react-draggable`, `@vercel/speed-insights`, `file-saver`, unused Radix UI, etc.).  
3. **Unify icons on `lucide-react` only** (drop `react-icons`); Next already optimizes Lucide imports by default.  
4. **Lazy-load Motion / Firebase / YouTube / ExcelJS** (ExcelJS already dynamic — keep that pattern; extend it).  
5. **Cull unreferenced `public/` media** (`inv_dt.mp4` alone ≈ 26 MB) and reduce Inter font weights.

**Estimated impact if phases 1–2 land cleanly:** fewer Node SSR hits, smaller install/attack surface, **~15–40% lower First Load JS** on heavy pages, **~42 MiB** less deploy payload from likely unreferenced assets, **~1.5–2.5k LoC** removed without product behavior change.

---

## 1. Methodology

| Step | What was done |
|------|----------------|
| Inventory | All `page.tsx`, `layout.tsx`, API routes, components, libs, packages |
| Static usage | ripgrep import graph for every dependency and component |
| Dead code | Components/packages with **zero importers** outside themselves |
| Build | `NODE_ENV=production npm run build` (Next 15.2.8) |
| Sizes | Next route table (First Load JS), `.next/static` chunk sizes + gzip |
| Assets | Filename reference scan of `public/` against `src/` |
| Out of scope | `logs/`, deploy scripts, `.trunk`, PDF/governance content review |

**Not done (cross-check opportunities):** Lighthouse/WebPageTest on production URL, `@next/bundle-analyzer` interactive treemap, runtime TTFB under nginx, SES load testing.

### How to read effort / risk

| Tag | Meaning |
|-----|---------|
| **Effort S** | Hours; isolated delete or config tweak |
| **Effort M** | 1–3 days; multi-file refactor |
| **Effort L** | Multi-day; architectural |
| **Risk Low** | Behavior-preserving if tests/smoke pass |
| **Risk Med** | Needs visual/SEO/regression checks |
| **Risk High** | Can break SSR, email, ops, or investor content |

---

## 2. Inventory

### 2.1 Source scale

| Metric | Value |
|--------|------:|
| Files under `src/` (ts/tsx/css/json) | ~90 |
| TS/TSX LoC | **12,289** |
| Files with `'use client'` | **54** (~**9,645** LoC) |
| `globals.css` | 184 lines |
| `messages/` (i18n JSON) | en + hi, **unused** |
| `public/` | **~104 MB** |

### 2.2 Pages (App Router)

All of the following are **client components** (`'use client'` on line 1). None are pure Server Components.

| Route | Role | Notes |
|-------|------|-------|
| `/` | Home | Large featured-product UI + Motion + Firebase track |
| `/about` | Company | |
| `/about/leadership` | Team | Images from `/Team/` |
| `/about/board` | Board | |
| `/technology` | Tech story | lucide icons |
| `/products` | Product hub | |
| `/products/quad2` | Quad2 | `react-youtube` |
| `/products/quad3` | Quad3 | `react-youtube` |
| `/products/legacy` | Legacy products | **Active nav item**, not abandoned route |
| `/products/sparqlinq` | SparqLinq | YTVideo component |
| `/products/sparqvu` | SparqVu | |
| `/products/app` | SparqSync | Large **commented** alternate UI still in file |
| `/products/accessories` | Accessories | |
| `/investors` | IR hub | Imports static `sedar-documents.json` for key news; external stock link |
| `/investors/reports` | Filings list | Client `fetch('/api/sedar-documents')` |
| `/investors/governance` | Governance PDFs | |
| `/resources` | Learning hub | FAQ + videos; largest content page chunk after legal |
| `/resources/calculator` | BoM calculator | Dynamic `import('exceljs')` on download |
| `/resources/legal` | TOS + Privacy | **Largest page JS** (inline legal copy) |
| `/contact` | Contact | |
| `/support` | Support tickets | Posts to `/api/send-email` (SES) — **keep** |

**Layouts**

| File | Type | Notes |
|------|------|-------|
| `src/app/layout.tsx` | Server | Metadata, Inter font, **theme via `cookies()`**, wraps `RootLayoutClient` |
| `src/app/about/layout.tsx` | Client | Subheader |
| `src/app/investors/layout.tsx` | Client | Subheader; Stock → external TMX |
| `src/app/resources/layout.tsx` | Client | Subheader |

**Redirects** (`next.config.ts`): `/news-and-events` → `/investors/reports`, `/our-products` → `/products`.

### 2.3 API routes

| Route | Purpose | Keep? | Notes |
|-------|---------|-------|-------|
| `POST /api/send-email` | Support tickets via **AWS SES** + reCAPTCHA | **Yes — critical** | ~396 LoC; HTML escape; origin checks; file logging |
| `GET /api/health` | Ops health (SES env, sedar file, etc.) | Yes if Control Center uses it | `force-dynamic`, nodejs |
| `GET /api/ops/logs` | HMAC-auth log export for SPARQ Toolbox | Yes if ops depends on it | `force-dynamic` |
| `GET /api/sedar-documents` | Serves `src/data/sedar-documents.json` | Optional | **No scraping** — filesystem JSON only |
| `GET /api/stockData` | Twelve Data proxy | **Dead** | Only referenced by unused `StockInfo` |
| `src/app/api/news.json` | Static JSON file | **Dead** | Not a Next route handler; nothing imports it |

### 2.4 Package inventory (`package.json`)

#### Dependencies — usage matrix

| Package | node_modules size (approx) | Imported in `src`? | Verdict |
|---------|---------------------------:|--------------------|---------|
| `next` 15.2.8 | 129 MB | Yes | Upgrade to a patched 15.x release; npm audit identifies 15.5.20 |
| `react` / `react-dom` 19 | — | Yes | Keep |
| `@aws-sdk/client-ses` | 2.5 MB | Yes (`send-email`) | **Keep** |
| `firebase` | 41 MB | Yes (analytics only) | Keep but **scope/lazy** |
| `motion` (+ nested `framer-motion`) | 3.4 MB + 3.4 MB | Yes (~34 files) | Keep but **lazy/limit** |
| `lucide-react` | 42 MB | Yes (~10 files) | Keep; optimize imports |
| `react-icons` | **83 MB** | Yes (~7 files) | **Consolidate → lucide** |
| `exceljs` | 23 MB | Yes (dynamic in BomCalc) | Keep if calculator stays; already lazy |
| `react-youtube` | 88 KB | Yes (quad2/quad3) | Keep or replace with lite embed |
| `swiper` | 4.0 MB | Only in **unused** Slider/PartnerSlider | **Remove with dead components** |
| `class-variance-authority` / `clsx` / `tailwind-merge` | small | Yes (ui/utils) | Keep while shadcn-style cards remain |
| `@radix-ui/react-slot` | small | Yes (`badge` — but badge unused) | Review after UI prune |
| `@radix-ui/react-scroll-area` | small | Only unused `scroll-area.tsx` | **Remove** |
| `@radix-ui/react-separator` | small | Only unused `separator.tsx` | **Remove** |
| `critters` | 200 KB | Indirect (`experimental.optimizeCss`) | Remove after verifying the ineffective App Router flag can be dropped |
| `lightweight-charts` | 2.7 MB | Only dead `StockChart` | **Remove** |
| `next-intl` | 1.1 MB | **Never imported** | **Remove** |
| `cheerio` | 3.3 MB | **Never imported** | **Remove** (or use only if SEDAR automation lands) |
| `luxon` | 4.5 MB | **Never imported** | **Remove** |
| `swr` | 448 KB | **Never imported** | **Remove** |
| `react-draggable` | 344 KB | **Never imported** | **Remove** |
| `@vercel/speed-insights` | 476 KB | **Never imported** | **Remove** (wrong host target) |
| `file-saver` | 64 KB | **Never imported** | **Remove** (BomCalc uses native `<a download>`) |
| `autoprefixer` / `postcss` | — | Build | Move to **devDependencies** |
| `@types/cheerio`, `@types/luxon`, `@types/youtube` | — | Types | Move to **devDependencies** or delete with packages |

#### DevDependencies

| Package | Notes |
|---------|-------|
| `typescript`, `eslint`, `eslint-config-next` 15.2.1 | Version skew vs `next`; align with the patched Next target |
| `tailwindcss` 4, `@tailwindcss/postcss`, `tw-animate-css` | Keep |
| `@types/*` for react/node/file-saver | Keep relevant ones |

---

## 3. Measured production build

Command: `npm run build` on 2026-07-14.

### 3.1 Route table (Next.js output)

> **Size** = route-specific JS. **First Load JS** = Size + shared.

| Route | Size | First Load JS |
|-------|-----:|--------------:|
| `/` | 6.33 kB | **165 kB** |
| `/about` | 2.42 kB | 142 kB |
| `/about/board` | 6.76 kB | 170 kB |
| `/about/leadership` | 7.51 kB | 171 kB |
| `/contact` | 5.84 kB | 170 kB |
| `/investors` | 11.7 kB | **187 kB** |
| `/investors/governance` | 5.91 kB | 157 kB |
| `/investors/reports` | 3.77 kB | 151 kB |
| `/products` | 5.02 kB | 158 kB |
| `/products/accessories` | 1.53 kB | 110 kB |
| `/products/app` | 1.38 kB | 171 kB |
| `/products/legacy` | 1.88 kB | 171 kB |
| `/products/quad2` | 3.42 kB | 179 kB |
| `/products/quad3` | 4.00 kB | 180 kB |
| `/products/sparqlinq` | 3.27 kB | 173 kB |
| `/products/sparqvu` | 1.89 kB | 171 kB |
| `/resources` | **16.4 kB** | 171 kB |
| `/resources/calculator` | 7.35 kB | 152 kB |
| `/resources/legal` | **19.6 kB** | 173 kB |
| `/support` | 8.35 kB | 153 kB |
| `/technology` | 5.13 kB | 161 kB |
| `/_not-found` | 981 B | 101 kB |
| All `/api/*` | 153 B | 101 kB |

**Shared by all:** **~100 kB** First Load JS  
- `chunks/1684-*.js` ≈ 45.3 kB  
- `chunks/4bd1b696-*.js` ≈ 53.3 kB  
- other shared ≈ 1.95 kB  

**Rendering mode:** every route marked **`ƒ` (Dynamic) server-rendered on demand** — **0 static pages**.

### 3.2 Notable raw / gzip chunks

| Chunk (identity) | Raw | Gzip | Interpretation |
|------------------|----:|-----:|----------------|
| `6edf0643.*.js` | **912 KB** | **~250 KB** | **exceljs** (lazy; calculator download) |
| framework | 182 KB | ~58 KB | React |
| `1684` / `4bd1b696` | ~170 KB each | ~46–53 KB | Next shared runtime |
| `4023-*.js` | 110 KB | ~36 KB | **motion/framer** shared |
| `7712-*.js` | 42 KB | ~14 KB | **firebase** app/analytics subset |
| `app/resources/legal/page-*.js` | 59 KB | ~19 KB | Legal copy + Motion |
| `app/resources/page-*.js` | 50 KB | ~13 KB | Resources hub |
| `app/investors/page-*.js` | 48 KB | ~12 KB | Investors hub |
| Total `.next/static` JS | **~2.4 MB** | — | All routes combined (not per-visit) |
| Total static CSS | **~93 KB** | — | Single CSS bundle observed |

### 3.3 Why everything is dynamic

`src/app/layout.tsx` awaits `getServerTheme()` → `cookies()` from `next/headers` (`src/lib/theme-server.ts`).

In the App Router, **`cookies()` in a layout opts the subtree into dynamic rendering**. That means:

- No SSG HTML for marketing pages  
- Every request hits the Node process behind nginx  
- Cache-Control / nginx `proxy_cache` for HTML is harder or pointless  
- You pay SSR latency even when content is 100% static marketing copy  

This is the single largest **runtime/SSR** finding.

---

## 4. Ranked findings

Findings are ordered by **priority** (Runtime/SSR → Dependencies → rest), then impact.

### P0 — Runtime / SSR

#### F1. 100% client pages + 100% dynamic routes
**Impact: Critical** | **Effort: L** | **Risk: Med**

**Evidence:** All 21 `page.tsx` files start with `'use client'`. Build emits only `ƒ` routes. Root layout uses `cookies()`.

**Why it hurts:**
- Client Components are still server-rendered to HTML, but every page ships and hydrates its component code  
- `cookies()` removes the Full Route Cache, so TTFB is bound to Node and HTML cannot be served as a static artifact  
- Motion/`useInView` forces client for entire page trees that are mostly static prose  

**Concrete actions:**
1. **Theme without dynamic cookies in root layout** (pick one):  
   - **A (recommended):** Inline a tiny FOUC-preventing script that reads `theme-preference` cookie / `prefers-color-scheme` and sets `document.documentElement.classList` before paint; keep theme React state client-only. Remove `getServerTheme()` from root layout.  
   - **B:** Middleware sets a header/cookie class on the response without calling `cookies()` inside the React tree in a way that forces dynamic (verify with Next version behavior).  
2. Convert page shells to **Server Components**: static headings, copy, lists, images as RSC; extract interactive bits (`useInView` sections, forms, accordions) into small client islands.  
3. Target order: `/`, `/about*`, `/products*`, `/technology`, `/investors/governance`, `/resources/legal` first (lowest interactivity relative to size).

**Acceptance criteria:** `next build` shows many routes as `○` (Static) or `●` (SSG); First Load JS on home drops; TTFB under nginx improves when HTML is cacheable.

**Example direction (theme — conceptual diff):**

```diff
// src/app/layout.tsx
- import { getServerTheme } from "@/lib/theme-server"
- const theme = await getServerTheme()
- const themeClass = theme === 'dark' ? 'dark' : ''
+ // default class; client ThemeProvider + blocking script sync cookie
  return (
-   <html lang="en" className={`... ${themeClass} ${inter.className}`}>
+   <html lang="en" className={`... ${inter.className}`} suppressHydrationWarning>
```

---

#### F2. Motion used as a default page framework
**Impact: High** | **Effort: M** | **Risk: Med**

**Evidence:** `motion/react` imported in **~34** source files. Shared motion chunk ≈ **110 KB raw / 36 KB gzip**. Nearly every marketing page wraps static content in `motion.div` + `useInView`.

**Concrete actions:**
1. Default to CSS (`@starting-style`, Tailwind animate, `tw-animate-css` already present) for fade/slide-in.  
2. Keep Motion only for complex gestures (header mobile menu, accordion height if needed).  
3. Where Motion stays: prefer Motion's `LazyMotion` + `m` API or smaller client islands. Do **not** default to `ssr: false`; withholding useful HTML can regress FCP/LCP.  
4. Respect existing `AnimationContext` / reduced-motion: prefer `prefers-reduced-motion` CSS over shipping the library for users who disable animation.

---

#### F3. Firebase Analytics on the critical path of many pages
**Impact: Medium–High** | **Effort: M** | **Risk: Low–Med**

**Evidence:** `firebase/app` + `firebase/analytics` via `useTrackEvent` (~17 call sites). Chunk `7712` ≈ **42 KB raw / 14 KB gzip**. Layout tree itself does **not** import Firebase (good), but most product/investor/home flows do.

**Concrete actions:**
1. Dynamic import analytics after idle: `requestIdleCallback` / `setTimeout` + `import('@/lib/firebaseAnalytics')`.  
2. Consider **GA4 gtag.js** or a single lightweight beacon if you only need pageviews/events — full Firebase SDK is heavy for analytics-only.  
3. Replace the current module-variable queue with a reactive singleton/promise or hook state. The async `analytics = getAnalytics(app)` assignment does not trigger a render, so queued events may never flush.  
4. Add an explicit production/consent gate. Environment-based Firebase config is **not** a production-only initialization guard.

---

#### F4. Client fetch waterfalls for static data
**Impact: Medium** | **Effort: S–M** | **Risk: Low**

**Evidence:** `/investors/reports` is a client page that `useEffect` → `fetch('/api/sedar-documents')` → setState. Data is a **local JSON file** (73 documents, ~30 KB). Investors home already imports JSON statically for “key” releases.

**Concrete actions:**
```ts
// Prefer in a Server Component page:
import data from '@/data/sedar-documents.json'
// filter/sort on server; pass to a small client FilterBar if needed
```
- Delete or thin `/api/sedar-documents` if nothing external depends on it (confirm Control Center / health check).  
- Health check currently verifies the JSON file exists — keep file; API optional.

---

#### F5. Font over-fetch (Inter 7 weights)
**Impact: Medium** | **Effort: S** | **Risk: Low**

**Evidence:** `layout.tsx` loads Inter weights `300–900`. Class usage is dominated by `font-medium` (500), `font-semibold` (600), `font-bold` (700); rare `font-extrabold`; no meaningful `font-light` / `font-black`.

**Concrete action:**
```ts
weight: ["400", "500", "600", "700"]
```
Optionally subset further with `preload: true` only for 400/600.

---

#### F6. Large above-the-fold client chrome
**Impact: Medium** | **Effort: M** | **Risk: Med**

**Evidence:** Every page hydrates `RootLayoutClient` → ThemeProvider, AnimationProvider, Header (Motion + lucide), Footer (Motion + react-icons), ForceScroll, mounted background gradient swap.

**Concrete actions:**
1. Header/Footer as Server Components with a client `MobileNav` island.  
2. Drop `ForceScroll` if only fixing a historical scroll bug — verify necessity.  
3. Avoid `mounted ? gradient : solid` pattern that delays real background (hydration flash).

---

### P1 — Dependency surface

#### F7. Confirmed dead packages (safe uninstall candidates)
**Impact: High (install size, audit noise, supply chain)** | **Effort: S** | **Risk: Low**

Zero `src` imports observed:

| Package | Why installed (inferred) |
|---------|--------------------------|
| `next-intl` | Abandoned i18n (`messages/en.json`, `hi.json` unused) |
| `cheerio` | Planned SEDAR scrape — never wired |
| `luxon` + `@types/luxon` | Unused dates |
| `swr` | Stock/news fetching never finished or removed |
| `react-draggable` | Unused |
| `@vercel/speed-insights` | Vercel-only; you are on EC2/nginx |
| `file-saver` | Superseded by native download in BomCalc |
| `lightweight-charts` | Dead stock UI |
| `swiper` | Only used by dead Slider components |

Also mis-placed in **dependencies** (should be devDeps or removed): `@types/cheerio`, `@types/luxon`, `@types/youtube`, `autoprefixer`, `postcss`.

**Concrete action:**
```bash
npm uninstall next-intl cheerio luxon swr react-draggable \
  @vercel/speed-insights file-saver lightweight-charts swiper \
  @types/cheerio @types/luxon
# after removing youtube types usage or keep @types/youtube in devDeps
```

---

#### F8. Dead stock chart subsystem
**Impact: High (deps + LoC + API surface + secret use)** | **Effort: S** | **Risk: Low**

**User confirmation:** Stock chart is dead; nav links to Yahoo/TMX.

**Dead tree (no page imports):**

| File | LoC |
|------|----:|
| `StockChart.tsx` | 259 |
| `ChartControls.tsx` | 177 |
| `ExchangeSelector.tsx` | 131 |
| `StockInfo.tsx` | 48 |
| `api/stockData/route.ts` | 43 |
| **Subtotal** | **~658** |

Plus dep `lightweight-charts`. Env `TWELVE_DATA_API_KEY` can be retired from EC2 secrets after removal.

**Nav already correct:** `https://money.tmx.com/en/quote/SPRQ` in root layout + investors layout.

**Note:** Investors page copy still says *“Real-time stock data and interactive charts”* while href is external — update microcopy when deleting stock UI (**Effort S**).

---

#### F9. Orphaned components (~1.5k+ LoC)
**Impact: Medium (LoC, confusion, accidental re-import of heavy deps)** | **Effort: S** | **Risk: Low**

| Component | LoC | Pulls |
|-----------|----:|-------|
| Stock stack (above) | ~658 | lightweight-charts |
| `PhotoGallery.tsx` | 65 | framer-motion import path |
| `CircleCountdown.tsx` | 84 | framer-motion |
| `Slider.tsx` / `PartnerSlider.tsx` | 63+65 | **swiper** |
| `TrackedLink.tsx` | 31 | firebase track |
| `AccordionItem.tsx` | 41 | track |
| `AnimatedList.tsx` | 46 | motion |
| `LeavingSite.tsx` | 71 | — |
| `FontSelector.tsx` | 84 | lucide + motion |
| `VideoControls.tsx` | 59 | react-icons |
| `Construction.tsx` | 9 | react-icons |
| `GridDiv.tsx` | 12 | — |
| `ui/badge.tsx` | 46 | cva + radix slot |
| `ui/scroll-area.tsx` | 58 | radix |
| `ui/separator.tsx` | 28 | radix |
| `api/news.json` | — | unused blob |

**Also:** `messages/`, dead i18n.

**Do not remove without explicit approval:** active product pages including `/products/legacy` (legacy **product line**, not dead route).

---

#### F10. Dual icon libraries
**Impact: Medium** | **Effort: S–M** | **Risk: Low**

- `lucide-react` (42 MB install): Header, toggles, technology, reports, FAQ  
- `react-icons` (83 MB install): contact, investors, footer, governance, video controls  

Tree-shaking helps runtime, but **install size**, editor performance, and inconsistent visuals suffer. Lucide alone covers needed icons.

**Concrete action:** Replace `Fa*` / `Fi*` / `Md*` with lucide equivalents; `npm uninstall react-icons`.

Next 15.2.8 already optimizes `lucide-react` and `react-icons/*` by default. Do not add a redundant `lucide-react` entry. If bundle analysis shows value for another barrel package, add only that package.

---

#### F11. exceljs is correctly lazy — keep it that way
**Impact: Info / guardrail** | **Effort: —** | **Risk: —**

`BomCalc` dynamically imports `exceljs` only on download. Resulting chunk is **~912 KB raw** — acceptable **only** because it is not on First Load.  

**Do not** convert to static import. Optional future: generate XLSX via a tiny `POST /api/bom-export` using exceljs **server-side** so the browser never downloads exceljs (better for low-end devices); trade-off is server CPU.

`file-saver` is already unused — remove.

---

#### F12. `@vercel/speed-insights` and hosting mismatch
**Impact: Low–Med** | **Effort: S** | **Risk: Low**

Not imported; wrong product for EC2/nginx. Prefer:
- nginx access logs + existing ops log pipeline  
- optional self-hosted OpenTelemetry / Plausible / Cloudflare Web Analytics if you use CF in front  

---

### P2 — Bundle / LoC / assets / build hygiene

#### F13. Legal page is a 59 KB JS content dump
**Impact: Medium** | **Effort: M** | **Risk: Low**

`/resources/legal` is the **largest page chunk** because TOS + Privacy live as React JSX strings inside client components (`TOSDropdown` 211 LoC, `PrivacyPolicyDropdown` 92 LoC).

**Concrete actions:**
1. Move legal text to markdown/MDX or structured content rendered at build/request time.  
2. Server-render legal pages; client only for expand/collapse. Avoid a client fetch, which adds another waterfall.  
3. Keep HTML as the primary accessible format; use PDFs only as an optional compliance artifact.

---

#### F14. `public/` weight (~104 MB); ~42 MiB likely unreferenced
**Impact: Medium (deploy size, disk, backup)** | **Effort: S** | **Risk: Low–Med** (confirm CDN/email links)

Unreferenced by filename scan against `src/` (heuristic — verify before delete):

| Asset | Size |
|-------|-----:|
| `inv_dt.mp4` | **~26.5 MB** |
| `external-sparq-app.mp4` | **~11.0 MB** (referenced only inside commented-out code) |
| `investors_ppt-old.pdf` | ~1.4 MB |
| `installer_ppt.pdf` | ~1.2 MB |
| `homeowner_ppt.pdf` | ~1.1 MB |
| assorted unused logos | small |

The likely unreferenced set is therefore **~42 MiB**, not ~30 MB. External URLs in old emails and investor communications still need access-log verification before deletion.

Still large **but referenced:** `Q2000/` (~23 MB), `Q1200/` (~14 MB), `Quad3/` (~7.6 MB). Consider:

- Serve heavy PDFs/videos from **S3 + CloudFront** (or existing CDN) rather than the Next app disk  
- Compress PNGs (`clouded-panels.png` 2.8 MB, `500kw.png` 1.5 MB) to WebP/AVIF with `next/image`  
- Ensure videos use `preload="metadata"` (VideoPlayer already does)

---

#### F15. Build / Next config opportunities
**Impact: Medium** | **Effort: S–M** | **Risk: Low**

Already good:
- `compiler.removeConsole` in production (keeps `error`)  
- `cssChunking: 'strict'`  
- Image remotePatterns for YouTube thumbs  

Remove or re-evaluate:
- `experimental.optimizeCss` + `critters`: a production request emitted zero inline `<style>` tags and one blocking stylesheet. Next maintainers document that Critters does not support App Router streaming, so this currently adds a build dependency without delivering critical-CSS inlining.

Add / change:
```ts
// next.config.ts (suggested)
experimental: {
  cssChunking: 'strict',
},
// optional for smaller deploys on EC2:
// output: 'standalone',
```

`output: 'standalone'` is excellent for EC2 Docker/systemd deploys (smaller runtime image). **Effort S**, **Risk Med** (adjust deploy script).

Align `eslint-config-next` with the patched Next target (currently **15.5.20** in the revised plan).

---

#### F16. YouTube embeds
**Impact: Low–Med** | **Effort: S** | **Risk: Low**

`react-youtube` on quad2/quad3 + custom `YTVideo`. Facade pattern (thumbnail → load iframe on click) reduces main-thread and third-party JS until intent.

---

#### F17. Commented dead code in `/products/app`
**Impact: Low (LoC clarity)** | **Effort: S** | **Risk: Low**

Large commented block still references `VideoPlayer`, motion, etc. Delete comments or restore feature deliberately — do not leave half-dead UI in production source.

---

#### F18. Inconsistent `framer-motion` vs `motion` imports
**Impact: Low** | **Effort: S** | **Risk: Low**

Dead files `PhotoGallery.tsx` and `CircleCountdown.tsx` import `framer-motion` while the app depends on `motion` (which depends on framer-motion). Standardize on `motion/react` if any of these are revived; otherwise delete.

---

#### F19. SES path is solid — keep focused
**Impact: Protect** | **Effort: —**

`/api/send-email` is the critical business path (support tickets). Optimization here should be **server-only**:

- Keep SES client singleton (already module-level)  
- Avoid pulling SES into any client bundle (currently clean)  
- Optional: extract HTML email templates to strings outside the route for readability — not a bundle win  

Do **not** remove logging, reCAPTCHA, or origin checks in the name of minification.

---

## 5. SEDAR automation (requested stretch goal)

### Current state

| Piece | Reality |
|-------|---------|
| `src/data/sedar-documents.json` | **73** documents, hand-maintained (~30 KB) |
| `GET /api/sedar-documents` | Reads JSON from disk; POST/DELETE disabled |
| `cheerio` | Installed, **never used** |
| `/investors` | Imports JSON at build for “key” releases |
| `/investors/reports` | Client-fetches API |

**“Scraping never panned out”** matches the code: there is no scraper, only a static dataset + thin API.

### Why SEDAR+ is hard

SEDAR+ (`sedarplus.ca`) is a modern, session-oriented portal. Typical failure modes:

- Login / terms gates  
- Dynamic document IDs  
- Bot protection  
- ToS restrictions on automated access  
- HTML structure churn  

Cheerio alone (static HTML parse) is usually insufficient without a headless browser and ongoing maintenance.

### Practical automation options (easiest → hardest)

| Option | Effort | Notes |
|--------|--------|-------|
| **1. Quarterly manual CSV/JSON update** | S | Script: `node scripts/merge-sedar.mjs` validates schema, sorts by date, flags missing `key` news. Keeps lawyers/IR in control. |
| **2. IR email → JSON** | M | When news release goes out, ops pastes URL + metadata into a private form or GitHub PR template. |
| **3. Company newsroom as source of truth** | M | If press releases are also on sparqsys.com or a PR wire with RSS, ingest RSS → merge into JSON; link out to SEDAR+ for filings. |
| **4. Paid data / SEDAR bulk** | M–L | Some vendors redistribute Canadian filings; cost vs engineering and legal review. |
| **5. Headless Playwright cron on EC2** | L | Technically “baller” but brittle; needs monitoring, residential-like UA strategy, and legal review. **Not recommended** as first attempt. |

### Recommended “baller but sane” path

1. **Remove `cheerio` from the web app** until a scraper exists **out of band**.  
2. Add `scripts/update-sedar-documents.mjs` (or `.ts`) that:  
   - Validates schema (`id`, `title`, `type`, `year`, `publishDate`, `url`, `description`, `key?`)  
   - Sorts newest-first  
   - Optionally accepts a hand-exported SEDAR CSV  
3. Keep serving from static JSON via **Server Component import** (no API required for the public site).  
4. If automation is required later, run Playwright **as a separate systemd timer** writing JSON to disk or S3; the Next app only reads the artifact (same as today). Health check already verifies file presence.

**Do not** block site minification on perfect SEDAR automation.

---

## 6. Pages / routes to flag (do not remove yet)

Per instructions: **name only**, no deletion.

| Item | Status |
|------|--------|
| `/products/legacy` | **Active** product category in nav — not abandoned |
| Stock chart UI + `/api/stockData` | **Dead code** (feature retired; external TMX link) |
| `src/app/api/news.json` | Orphan file, not a route |
| Redirect sources `/news-and-events`, `/our-products` | Old URLs; keep redirects |
| i18n `messages/*` + `next-intl` | Dead for now |
| Construction / LeavingSite / PhotoGallery / Slider / PartnerSlider / FontSelector / TrackedLink | Orphan components, no routes |

No entire marketing **page** appears obsolete beyond the retired stock experience (which was removed from nav already).

---

## 7. Phased action plan

### Phase A — Quick wins (1–2 days) · Effort S · Risk Low–Med

1. Uninstall dead packages (F7).  
2. Delete dead stock tree + `news.json` + orphan components (F8–F9) after smoke test.  
3. Trim Inter weights (F5).  
4. Remove ineffective `optimizeCss` / `critters` after a before/after CSS and visual check.  
5. Delete unreferenced public media after double-check (F14).  
6. Align eslint-config-next version; move `@types/*` / postcss to devDeps.  
7. Fix investors stock card microcopy.  
8. Upgrade Next within 15.x and the AWS SDK to patched releases; re-run `npm audit --omit=dev`.  

**Expected:** smaller `node_modules`, cleaner repo, ~1.5k+ LoC gone, deploy artifact slimmer, no user-facing feature loss.

### Phase B — SSR / runtime (3–7 days) · Effort M–L · Risk Med

1. Theme strategy without layout `cookies()` (F1).  
2. Convert 5–10 marketing pages to RSC shells + client islands (F1).  
3. Reduce Motion usage; CSS for scroll reveals (F2).  
4. Idle-load Firebase (F3).  
5. Static import sedar JSON on reports page (F4).  
6. Consider `output: 'standalone'` for EC2.  

**Expected:** static routes in build output, better TTFB, lower First Load JS (target **&lt;130 kB** on home).

### Phase C — Deeper productization (optional)

1. Icon unification (F10).  
2. Legal content extraction (F13).  
3. YouTube facades (F16).  
4. exceljs server-side export (F11 optional).  
5. SEDAR update script / process (Section 5).  
6. Move large PDFs/videos to object storage + CDN.  

---

## 8. Suggested package.json after Phase A (illustrative)

```jsonc
{
  "dependencies": {
    "@aws-sdk/client-ses": "^3.1087.0",
    "clsx": "^2.1.1",
    "exceljs": "^4.4.0",               // calculator only; keep dynamic import
    "firebase": "^11.7.1",             // consider slim/lazy later
    "lucide-react": "^0.513.0",
    "motion": "^12.11.4",
    "next": "15.5.20",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-youtube": "^10.1.0",        // or replace with facade
    "tailwind-merge": "^3.3.0"
  }
  // removed: next-intl, cheerio, luxon, swr, react-draggable,
  // @vercel/speed-insights, file-saver, lightweight-charts, swiper,
  // react-icons, unused radix scroll-area/separator, misplaced @types
}
```

The orphan sweep removes `badge`, `scroll-area`, and `separator`; the surviving `card` primitive needs only `clsx` + `tailwind-merge` through `cn()`.

---

## 9. Verification checklist (for implementers & cross-checkers)

After changes:

```bash
npm run build
# Confirm route static/dynamic markers and First Load JS deltas

npm run lint
npx tsc --noEmit

# Smoke
# - /support ticket still emails via SES
# - /api/health still green for ops
# - /api/ops/logs HMAC still works
# - /investors and /investors/reports show filings
# - /resources/calculator Excel download still works
# - dark mode toggle no FOUC regression
# - mobile nav, product pages, YouTube embeds
```

Re-measure:

| Metric | Baseline (this audit) | After Phase A | After Phase B |
|--------|----------------------|---------------|---------------|
| Shared First Load JS | ~100 kB | ≈ same | ↓ target |
| Home First Load JS | 165 kB | slight ↓ | &lt;130 kB goal |
| Dynamic routes | 27/27 | 27/27 | **much fewer** |
| Dead packages | 8+ | 0 | 0 |
| `public/` | ~104 MB | ~62 MiB if likely-unreferenced set is culled | optional CDN |

---

## 10. Cross-check notes for GPT-5.6 / Fable 5

Please verify or challenge:

1. **Is `cookies()` alone sufficient to force all child routes dynamic in Next 15.2.8?** (This audit assumes yes; confirm against current Next docs.)  
2. **Any runtime import of “dead” packages via indirect paths** not under `src/` (e.g. scripts, instrumentation)?  
3. **Whether `/api/sedar-documents` or `/api/stockData` are called by external systems** (Control Center, monitors) not visible in this repo.  
4. **Legal/compliance** before deleting governance PDFs or changing legal page structure.  
5. **Bundle numbers** — re-run `npm run build` after dependency drift; chunk hashes will change.  
6. **SEDAR automation legality** — do not recommend scraping that violates SEDAR+ ToS without counsel.  
7. **`optimizeCss` / critters** — any known issues on Next 15.2.8 production?  

### Files to re-read first during cross-check

- `package.json`, `next.config.ts`, `src/app/layout.tsx`, `src/lib/theme-server.ts`  
- `src/components/RootLayoutClient.tsx`, `src/hooks/useTrackEvent.ts`  
- `src/app/api/send-email/route.ts` (must remain correct)  
- `src/app/investors/page.tsx`, `src/app/investors/reports/page.tsx`  
- `src/components/BomCalc.tsx` (exceljs dynamic import)  
- Build output route table  

---

## 11. Summary table — ranked actions

| ID | Finding | Priority | Effort | Risk | Type |
|----|---------|----------|--------|------|------|
| F1 | Dynamic + all-client pages | P0 Runtime | L | Med | Architecture |
| F2 | Motion-everywhere | P0 Runtime | M | Med | Bundle/SSR |
| F3 | Firebase on critical path | P0 Runtime | M | Low | Bundle |
| F4 | Client fetch for static JSON | P0 Runtime | S | Low | SSR |
| F5 | Inter weight over-fetch | P0 Runtime | S | Low | Network |
| F6 | Heavy client chrome | P0 Runtime | M | Med | SSR |
| F7 | Dead packages | P1 Deps | S | Low | Delete |
| F8 | Dead stock subsystem | P1 Deps | S | Low | Delete |
| F9 | Orphan components | P1 Deps/LoC | S | Low | Delete |
| F10 | Dual icon libs | P1 Deps | S–M | Low | Consolidate |
| F11 | exceljs lazy guardrail | P1 Deps | — | — | Keep pattern |
| F12 | Vercel insights on EC2 | P1 Deps | S | Low | Delete |
| F13 | Legal page JS bloat | P2 Bundle | M | Low | Content arch |
| F14 | public/ bloat | P2 Assets | S | Low–Med | Delete/CDN |
| F15 | next.config / standalone | P2 Build | S | Low–Med | Config |
| F16 | YouTube facades | P2 Bundle | S | Low | Perf |
| F17 | Commented app page code | P2 LoC | S | Low | Cleanup |
| F18 | framer-motion import drift | P2 Hygiene | S | Low | Cleanup |
| F19 | Protect SES path | — | — | — | Non-goal |

---

*End of report. No application code was modified in this audit; only this document was added on branch `audit/minification-report`.*

---

## 12. Cross-check addendum — Fable 5 (Claude Code), 2026-07-15

Independent verification pass against the working tree on `audit/minification-report`. Method: ripgrep import-graph checks over `src/`, `scripts/`, and `.gitea/`, plus direct reads of `package.json`, `next.config.ts`, `src/app/layout.tsx`, `src/lib/theme-server.ts`, and `src/components/ui/*`. Build numbers (section 3) were **not** re-run.

### 12.1 Claims verified

| Report claim | Verdict |
|--------------|---------|
| `cookies()` in root layout forces all routes dynamic (open question 10.1) | **Confirmed.** `src/lib/theme-server.ts:4` calls `cookies()`; in Next 15 App Router, `cookies()` in a layout opts the entire subtree into dynamic rendering. This is documented behavior, not version-fragile. |
| 9 dead packages (F7) | **Confirmed.** Zero imports of `next-intl`, `cheerio`, `luxon`, `swr`, `react-draggable`, `@vercel/speed-insights`, `file-saver` anywhere in `src/`, `scripts/`, or `.gitea/`. `lightweight-charts` and `swiper` are reachable only from orphaned components. |
| Orphan components (F8–F9) | **Confirmed for all.** StockChart, ChartControls, ExchangeSelector, StockInfo, PhotoGallery, CircleCountdown, Slider, PartnerSlider, TrackedLink, AccordionItem, AnimatedList, LeavingSite, FontSelector, VideoControls, Construction, GridDiv, `ui/badge`, `ui/scroll-area`, `ui/separator` — none imported by any live code. (`Slider` is imported only by `PartnerSlider`, itself an orphan.) |
| `/api/stockData` dead | **Confirmed.** Referenced only by orphaned `StockInfo.tsx`. `TWELVE_DATA_API_KEY` appears nowhere else in the repo — safe to retire from EC2 env after deletion. |
| Unreferenced media (F14) | **Confirmed for `src/`.** `inv_dt.mp4`, `investors_ppt-old.pdf`, `installer_ppt.pdf`, `homeowner_ppt.pdf` have zero references in source. External references (emails, press releases) not ruled out — see 12.4. |
| `eslint-config-next` 15.2.1 vs `next` 15.2.8 skew; `postcss`/`autoprefixer`/`@types/*` misplaced in `dependencies` | **Confirmed** from `package.json`. |

### 12.2 Additional findings not in the report

1. **`class-variance-authority` and `@radix-ui/react-slot` are removable.** Both are imported *only* by the orphaned `ui/badge.tsx`. Section 8's illustrative package.json keeps them — it shouldn't. After the orphan sweep, the only surviving shadcn primitive is `ui/card.tsx`, which needs only `clsx` + `tailwind-merge` (via `cn()` in `src/lib/utils.ts`).
2. **`@types/file-saver` (devDependencies) was missed** — remove alongside `file-saver`.
3. **`@types/youtube` is removable outright**, not just movable to devDeps: no use of the `YT.*` global namespace anywhere in `src/`, and `react-youtube` ships its own typings. Verify with `npx tsc --noEmit` after removal.
4. **Superseded by section 13:** remove `experimental.optimizeCss` and `critters` after the measured before/after check; moving Critters to devDependencies preserves an ineffective configuration.
5. **`tw-animate-css` is live** (`globals.css:2`) — keep. It also directly supports the F2 direction (Motion → CSS scroll reveals).
6. **Theme default is dark** (`theme-server.ts:11` returns `'dark'` when no cookie). Whatever replaces `getServerTheme()` (F1 option A's inline script) must preserve dark-as-default or every first-time visitor flashes/lands on the wrong theme.
7. **No `middleware.ts` exists**, so F1 option B (middleware-based theming) would be net-new infrastructure. Option A (inline blocking script) remains the right call.

### 12.3 Calibration on estimates

- **Phase A will not move First Load JS at all.** Dead packages and orphan components are already tree-shaken out of client bundles; their removal is a `node_modules` (~100+ MB), install-time, supply-chain, and clarity win. The exec summary's "~15–40% lower First Load JS" is entirely a **Phase B** outcome (RSC conversion + Motion reduction). Section 9's table says this correctly ("After Phase A ≈ same") — flagging so the exec summary isn't over-read.
- **react-icons → lucide (F10)** is likewise install-size and visual consistency, not a runtime bundle win (both libraries tree-shake). The report's Phase C sequencing is right; don't let it jump the queue.
- **The F1 theme change is the highest-regression-risk item in the plan** (FOUC, hydration mismatch, dark-default preservation). It should be its own PR with light/dark visual verification, not batched with other Phase B work.
- **`output: 'standalone'` (F15)** touches `scripts/deploy-sparqsys.sh` and the Gitea Actions workflow — do it as an isolated change with a deploy dry-run, not bundled with cleanup.

### 12.4 Open questions requiring human/ops input (not resolvable from the repo)

1. **Does anything external call `/api/sedar-documents`** (Control Center, SPARQ Toolbox, uptime monitors)? The health check verifies the JSON *file*, not the API route, so the route may be deletable once `/investors/reports` imports the JSON statically — but only ops can confirm no external consumer.
2. **The unreferenced investor PDFs** may be linked from past IR emails or press releases. Check nginx access logs for hits before deleting; for a public company, redirecting or archiving beats deleting.
3. **Retire `TWELVE_DATA_API_KEY`** from EC2 secrets after the stock tree lands — and confirm no other host (cron, toolbox) uses it.

### 12.5 Suggested execution order

1. **PR 1 — Phase A (low–medium risk):** uninstall dead packages **plus** `class-variance-authority`, `@radix-ui/react-slot`, `@types/file-saver`, `@types/youtube`; delete stock tree, orphan components, `api/news.json`, and `messages/`; remove `optimizeCss`/`critters`; move and patch `postcss`/`autoprefixer`; patch Next/AWS and align `eslint-config-next`; trim Inter to 400–700; fix investors stock-card microcopy. Gate: `npm run build && npx tsc --noEmit && npm run lint && npm audit --omit=dev` + section 9 smoke list.
2. **PR 2 — theme without `cookies()`** (F1 option A), verified with screenshots in both modes, dark default preserved.
3. **PR 3+ — RSC conversion in small batches** (order per F1.3), Motion → CSS (F2), idle-load Firebase (F3), static-import sedar JSON on `/investors/reports` (F4).
4. **Deferred pending answers/ops:** media cull (12.4.2), `/api/sedar-documents` removal (12.4.1), `output: 'standalone'`, icon unification, legal-page extraction, YouTube facades.

### 12.6 Remaining items for the next cross-checker (GPT)

- Re-run `npm run build` and diff the route table against section 3 (hashes and sizes will have drifted).
- SEDAR+ ToS/legality remains an ops/legal question. The `optimizeCss`/Critters question is resolved by section 13: it is ineffective for this App Router response.
- Sanity-check 12.2.1: confirm no dynamic/string-based imports of `class-variance-authority` or `@radix-ui/react-slot` that a static grep would miss.

*No application code modified in this pass; addendum only.*


---

## 13. Cross-check addendum — GPT-5.6, 2026-07-15

Independent verification against the working tree and a fresh production build. Method: exact source/import counts, direct file reads, dependency and asset reference scans, current Next 15.2.8 implementation/docs, a local production response inspection, and `npm audit --omit=dev`.

### 13.1 Verified

- Inventory is exact: **21/21 client pages**, **54** client files, **5** route handlers, **12,289** TS/TSX lines, and **73** SEDAR records.
- `npm run build` succeeds and exactly reproduces section 3, including all **27** entries marked dynamic and **100 kB** shared First Load JS.
- Root `cookies()` use removes the Full Route Cache for the page subtree. The static-rendering priority is correct.
- Dead packages, stock subsystem, orphan components, SEDAR client waterfall, Inter weight over-fetch, ExcelJS lazy loading, and dual icon libraries are confirmed.
- `public/` is **104 MiB**. The media deletion list still requires access-log and external-link checks.

### 13.2 Required corrections

1. **Dependency patching is P0.** The current production dependency tree reports **31 advisories**: 3 critical, 5 high, 22 moderate, and 1 low. Directly flagged packages include `next`, `@aws-sdk/client-ses`, `swiper`, `next-intl`, `postcss`, and `exceljs`. Removal resolves the dead-package findings; npm identifies Next **15.5.20** as the patched 15.x target. Upgrade Next/AWS in an isolated PR and reassess Firebase/ExcelJS transitives rather than running a blind force-fix.
2. **Client Components still SSR HTML.** F1's cost is hydration/client JS plus loss of static caching from `cookies()`, not an inability to emit useful HTML or an automatic SEO failure.
3. **Do not default Motion sections to `ssr: false`.** That can regress FCP/LCP. Prefer CSS, client islands, or `LazyMotion` where Motion remains.
4. **Firebase has a correctness issue.** The async module-level analytics assignment does not trigger a render, so `useTrackEvent` queues may never flush. Environment variables also do not constitute a production-only guard.
5. **Lucide config is redundant.** Next 15.2.8 includes `lucide-react` and `react-icons/*` in its default optimized package list.
6. **Critters is ineffective here.** A production response contained zero inline style tags and one blocking stylesheet. Remove `experimental.optimizeCss` and `critters` after a measured before/after check.
7. **Likely unreferenced media is ~42 MiB.** `external-sparq-app.mp4` is referenced only in commented code and should join the candidate list, subject to external URL checks.
8. **Prefer server-rendered legal content.** Build-time MDX/data avoids both the current client JS dump and a new client-fetch waterfall.

### 13.3 Revised execution order

1. **PR 1 — dependency hygiene and patching:** remove confirmed dead packages/components, patch Next/AWS, remove ineffective Critters config, align tooling, and run build/type/lint/audit checks.
2. **PR 2 — theme/static rendering:** remove root `cookies()` while preserving dark-by-default behavior; verify light/dark screenshots and hydration.
3. **PR 3+ — incremental runtime work:** RSC page shells, Motion reduction, Firebase repair/lazy loading, and static SEDAR data.
4. **Ops-gated:** asset deletion, `/api/sedar-documents` removal, `TWELVE_DATA_API_KEY` retirement, and standalone deployment changes.

Primary references: [Next 15 caching](https://nextjs.org/docs/15/app/guides/caching), [optimized package imports](https://nextjs.org/docs/pages/api-reference/config/next-config-js/optimizePackageImports), and [App Router/Critters limitation](https://github.com/vercel/next.js/issues/57634).
