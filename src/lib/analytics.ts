/**
 * GA4 via gtag.js — no Firebase SDK.
 *
 * - Loads googletagmanager.com/gtag/js only after idle (keeps it off the critical path).
 * - Production-only by default; set NEXT_PUBLIC_ENABLE_ANALYTICS=true to test locally.
 * - Measurement ID: NEXT_PUBLIC_GA_MEASUREMENT_ID (preferred) or legacy
 *   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID during migration.
 *
 * Prefer the typed helpers below so event/param names stay consistent in GA4.
 */

export type TrackEventParams = Record<string, string | number | boolean | undefined | null>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let loadPromise: Promise<boolean> | null = null
let pdfCaptureInstalled = false

function measurementId(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    undefined
  )
}

function shouldEnableAnalytics(): boolean {
  if (typeof window === 'undefined') return false

  const explicitlyEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'
  const isProduction = process.env.NODE_ENV === 'production'
  if (!explicitlyEnabled && !isProduction) return false

  return Boolean(measurementId())
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

function ensureGtagStub() {
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
  }
}

function installPdfDownloadCapture() {
  if (pdfCaptureInstalled || typeof document === 'undefined') return
  pdfCaptureInstalled = true

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a')
      if (!anchor) return

      const href = anchor.href
      if (!href || !/\.pdf([?#]|$)/i.test(href)) return

      let fileName = href
      try {
        const url = new URL(href, window.location.origin)
        fileName = url.pathname.split('/').filter(Boolean).pop() || href
      } catch {
        /* keep raw href */
      }

      void trackEvent('file_download', {
        file_name: fileName,
        file_extension: 'pdf',
        link_url: href,
        link_text: (anchor.textContent || '').trim().slice(0, 100) || undefined,
      })
    },
    true
  )
}

/**
 * Load gtag.js after idle. Resolves true when ready to accept events.
 */
export function loadAnalytics(): Promise<boolean> {
  if (!shouldEnableAnalytics()) {
    return Promise.resolve(false)
  }

  if (loadPromise) return loadPromise

  const id = measurementId()!
  loadPromise = new Promise((resolve) => {
    scheduleIdle(() => {
      try {
        ensureGtagStub()
        window.gtag!('js', new Date())
        window.gtag!('config', id, {
          anonymize_ip: true,
          send_page_view: false, // SPA: we send page_view on route changes ourselves
        })

        const script = document.createElement('script')
        script.async = true
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
        script.onload = () => {
          installPdfDownloadCapture()
          resolve(true)
        }
        script.onerror = () => {
          console.error('Failed to load gtag.js')
          resolve(false)
        }
        document.head.appendChild(script)
      } catch (err) {
        console.error('Analytics init failed:', err)
        resolve(false)
      }
    })
  })

  return loadPromise
}

/** Kick off idle load (safe no-op on server / when disabled). */
export function prefetchAnalytics(): void {
  if (typeof window === 'undefined') return
  void loadAnalytics()
}

/** Fire-and-forget; waits for idle init so early events still flush. */
export async function trackEvent(
  eventName: string,
  eventParams?: TrackEventParams
): Promise<void> {
  const ready = await loadAnalytics()
  if (!ready || !window.gtag) return

  // Drop null/undefined params — GA4 ignores them poorly when present as null
  const clean: Record<string, string | number | boolean> = {}
  if (eventParams) {
    for (const [key, value] of Object.entries(eventParams)) {
      if (value !== undefined && value !== null && value !== '') {
        clean[key] = value
      }
    }
  }

  window.gtag('event', eventName, clean)
}

/** App Router soft navigations — first paint + subsequent client routes. */
export async function trackPageView(path: string, title?: string): Promise<void> {
  const id = measurementId()
  const ready = await loadAnalytics()
  if (!ready || !window.gtag || !id) return

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || (typeof document !== 'undefined' ? document.title : path),
    page_location:
      typeof window !== 'undefined' ? window.location.href : undefined,
    send_to: id,
  })
}

// ---------------------------------------------------------------------------
// Typed helpers (GA4 recommended names where they fit)
// ---------------------------------------------------------------------------

/** UI / marketing content selection (CTAs, accordions, bios, variants). */
export function trackSelectContent(params: {
  content_type: string
  content_id?: string
  content_name?: string
  /** Optional free-form context (product slug, page section, …) */
  item_list_name?: string
}): void {
  void trackEvent('select_content', params)
}

/** YouTube (or other) video play intent. */
export function trackVideoStart(params: {
  video_id: string
  video_title?: string
  video_provider?: string
}): void {
  void trackEvent('video_start', {
    video_provider: params.video_provider ?? 'youtube',
    video_id: params.video_id,
    video_title: params.video_title,
  })
}

/** Successful support / contact form submission. */
export function trackGenerateLead(params?: {
  lead_source?: string
  category?: string
}): void {
  void trackEvent('generate_lead', {
    currency: 'CAD',
    value: 0,
    lead_source: params?.lead_source ?? 'website',
    category: params?.category,
  })
}

/** tel: / mailto: / external website clicks from contact cards. */
export function trackContactClick(params: {
  method: 'phone' | 'email' | 'website' | string
  link_url: string
}): void {
  void trackEvent('contact', {
    method: params.method,
    link_url: params.link_url,
  })
}

/** Product detail page impression (simplified ecommerce params). */
export function trackViewItem(params: {
  item_id: string
  item_name: string
  item_category?: string
}): void {
  void trackEvent('view_item', {
    currency: 'CAD',
    value: 0,
    item_id: params.item_id,
    item_name: params.item_name,
    item_category: params.item_category ?? 'product',
  })
}
