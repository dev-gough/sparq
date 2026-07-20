'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { prefetchAnalytics, trackPageView } from '@/lib/analytics'

/**
 * Client analytics island:
 * - Prefetches gtag on mount
 * - Sends page_view on initial load and App Router navigations
 */
export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    prefetchAnalytics()
  }, [])

  useEffect(() => {
    const qs = searchParams?.toString()
    const path = qs ? `${pathname}?${qs}` : pathname
    if (lastPath.current === path) return
    lastPath.current = path
    void trackPageView(path)
  }, [pathname, searchParams])

  return null
}
