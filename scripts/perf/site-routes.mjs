/**
 * Full marketing-site route list for lab benchmarks.
 * Keep in sync with App Router pages under src/app (exclude API + not-found).
 *
 * Import from other perf scripts; do not hardcode URL hosts here.
 */
export const SITE_PATHS = [
  '/',
  '/about',
  '/about/board',
  '/about/leadership',
  '/contact',
  '/investors',
  '/investors/governance',
  '/investors/reports',
  '/products',
  '/products/accessories',
  '/products/app',
  '/products/legacy',
  '/products/quad2',
  '/products/quad3',
  '/products/sparqlinq',
  '/products/sparqvu',
  '/resources',
  '/resources/calculator',
  '/resources/legal',
  '/support',
  '/technology',
]

/** Core set used during the optimization sprint (subset of SITE_PATHS). */
export const CORE_PATHS = [
  '/',
  '/products/quad2',
  '/investors',
  '/resources/legal',
  '/resources/calculator',
]

export function urlsForPaths(paths, origin = 'http://127.0.0.1:8080') {
  const base = origin.replace(/\/$/, '')
  return paths.map((p) => (p === '/' ? `${base}/` : `${base}${p}`))
}
