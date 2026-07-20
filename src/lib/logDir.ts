/**
 * Shared log directory resolution for app / email / Next capture / ops export.
 *
 * Production: LOG_DIR is mandatory (absolute path recommended, e.g. /var/log/sparqsys).
 * Development: defaults to the relative path "logs" (no process.cwd() — keeps Turbopack NFT calm).
 *
 * Used by Control Center ops log export and local ops tooling.
 */

let cached: string | null = null
let warnedDevDefault = false

/**
 * Resolve the app log directory once per process.
 * @throws if NODE_ENV=production (runtime) and LOG_DIR is unset/empty
 */
export function getLogDir(): string {
  if (cached !== null) return cached

  const fromEnv = process.env.LOG_DIR?.trim()
  if (fromEnv) {
    cached = fromEnv
    return cached
  }

  // During `next build`, NODE_ENV is production but logs are not written.
  // Only enforce at real runtime so static analysis / build can complete.
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build'
  if (process.env.NODE_ENV === 'production' && !isBuild) {
    throw new Error(
      'LOG_DIR must be set in production (e.g. LOG_DIR=/var/log/sparqsys). ' +
        'It is required for email/app/Next logs and Control Center ops export.'
    )
  }

  // Dev (and build-time) fallback: relative path — no process.cwd() for NFT
  if (!warnedDevDefault && !isBuild) {
    warnedDevDefault = true
    console.warn(
      '[logs] LOG_DIR unset; using relative "./logs" for development. Set LOG_DIR in .env.local to silence this.'
    )
  }
  cached = 'logs'
  return cached
}

/** True when LOG_DIR is present (useful for health checks). */
export function isLogDirConfigured(): boolean {
  return Boolean(process.env.LOG_DIR?.trim())
}
