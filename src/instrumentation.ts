/**
 * Next.js instrumentation — runs once when the Node server starts.
 *
 * 1. Captures real stdout/stderr (Next request lines, compile, errors)
 *    into logs/next-YYYY-MM-DD.log for Control Center ops export.
 * 2. Writes a structured SERVER_BOOT line to the app log.
 *
 * Avoid Node-only APIs at module top level so Edge analysis does not fail.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  // Install first so subsequent console/startup output is captured
  try {
    const { installNextServerLogCapture } = await import(
      '@/lib/nextServerLogCapture'
    )
    installNextServerLogCapture()
  } catch (err) {
    console.error('[instrumentation] next server log capture failed', err)
  }

  try {
    const { logAppEvent } = await import('@/lib/appLogger')
    logAppEvent('SERVER_BOOT', {
      nodeEnv: process.env.NODE_ENV,
      version: process.env.APP_VERSION || process.env.npm_package_version || '0.3.0',
    })
  } catch (err) {
    console.error('[instrumentation] app log boot failed', err)
  }
}
