/**
 * Lazy Firebase Analytics.
 *
 * - No top-level firebase/* imports (keeps SDK off the critical path until idle).
 * - Production-only by default; set NEXT_PUBLIC_ENABLE_ANALYTICS=true to test locally.
 * - Requires NEXT_PUBLIC_FIREBASE_API_KEY + MEASUREMENT_ID.
 * - Events awaited before init are held by the shared promise (no lost module-level queue).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TrackEventParams = { [key: string]: any }

// Lazy type — avoid static firebase imports in this module.
type AnalyticsInstance = import('firebase/analytics').Analytics

let analyticsPromise: Promise<AnalyticsInstance | null> | null = null

function shouldEnableAnalytics(): boolean {
  if (typeof window === 'undefined') return false

  const explicitlyEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'
  const isProduction = process.env.NODE_ENV === 'production'
  if (!explicitlyEnabled && !isProduction) return false

  if (
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    !process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  ) {
    return false
  }

  return true
}

function scheduleIdle(run: () => void) {
  if (typeof window === 'undefined') return
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  }
  if (typeof w.requestIdleCallback === 'function') {
    w.requestIdleCallback(run, { timeout: 4000 })
  } else {
    setTimeout(run, 2000)
  }
}

/**
 * Start (or reuse) analytics init after browser idle.
 * Resolves to Analytics instance, or null if disabled / unsupported / failed.
 */
export function loadAnalytics(): Promise<AnalyticsInstance | null> {
  if (!shouldEnableAnalytics()) {
    return Promise.resolve(null)
  }

  if (analyticsPromise) return analyticsPromise

  analyticsPromise = new Promise((resolve) => {
    scheduleIdle(() => {
      void (async () => {
        try {
          const { initializeApp, getApps } = await import('firebase/app')
          const { getAnalytics, isSupported } = await import('firebase/analytics')
          const firebaseConfig = (await import('./firebaseConfig')).default

          const app = getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig)
          const supported = await isSupported()
          if (!supported) {
            resolve(null)
            return
          }
          resolve(getAnalytics(app))
        } catch (err) {
          console.error('Firebase Analytics init failed:', err)
          resolve(null)
        }
      })()
    })
  })

  return analyticsPromise
}

/** Fire-and-forget track; waits for idle init so early events still flush. */
export async function trackEvent(
  eventName: string,
  eventParams?: TrackEventParams
): Promise<void> {
  const analytics = await loadAnalytics()
  if (!analytics) return
  const { logEvent } = await import('firebase/analytics')
  logEvent(analytics, eventName, eventParams)
}

/**
 * Kick off idle load once any client module imports this file.
 * Safe no-op on the server and when analytics is disabled.
 */
export function prefetchAnalytics(): void {
  if (typeof window === 'undefined') return
  void loadAnalytics()
}
