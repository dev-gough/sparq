/**
 * Shared log directory resolution for app / email / Next capture / ops export.
 *
 * Production: set LOG_DIR (absolute path recommended). Missing LOG_DIR logs a loud
 * error and falls back to "./logs" so the site still boots — health reports degraded.
 * Development: defaults to "./logs" (no process.cwd() — keeps Turbopack NFT calm).
 *
 * Used by Control Center ops log export and local ops tooling.
 */

let cached: string | null = null
let warnedMissing = false

/**
 * Resolve the app log directory once per process.
 * Never throws — a missing LOG_DIR must not take down `next start`.
 */
export function getLogDir(): string {
  if (cached !== null) return cached

  const fromEnv = process.env.LOG_DIR?.trim()
  if (fromEnv) {
    cached = fromEnv
    return cached
  }

  // Dev / misconfigured prod: relative path only (no process.cwd() in the source graph)
  if (!warnedMissing) {
    warnedMissing = true
    const isProd = process.env.NODE_ENV === 'production'
    const isBuild = process.env.NEXT_PHASE === 'phase-production-build'
    if (isProd && !isBuild) {
      console.error(
        '[logs] LOG_DIR is not set in production. Falling back to "./logs". ' +
          'Set LOG_DIR in .env.local (e.g. LOG_DIR=/home/server/sparqsys/logs) ' +
          'for Control Center ops export and durable logs.'
      )
    } else if (!isBuild) {
      console.warn(
        '[logs] LOG_DIR unset; using relative "./logs" for development. ' +
          'Set LOG_DIR in .env.local to silence this.'
      )
    }
  }

  cached = 'logs'
  return cached
}

/** True when LOG_DIR is present (useful for health checks). */
export function isLogDirConfigured(): boolean {
  return Boolean(process.env.LOG_DIR?.trim())
}
