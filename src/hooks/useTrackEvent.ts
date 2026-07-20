'use client'

import { useCallback, useEffect } from 'react'
import {
  prefetchAnalytics,
  trackEvent,
  trackSelectContent,
  trackVideoStart,
  trackGenerateLead,
  trackContactClick,
  trackViewItem,
  trackPageView,
  type TrackEventParams,
} from '@/lib/analytics'

/**
 * Analytics helpers for client components.
 * Schedules gtag load on idle (first mount); never imports a heavy SDK.
 */
export const useTrackEvent = () => {
  useEffect(() => {
    prefetchAnalytics()
  }, [])

  const track = useCallback((eventName: string, eventParams?: TrackEventParams) => {
    void trackEvent(eventName, eventParams)
  }, [])

  return track
}

export {
  trackEvent,
  trackSelectContent,
  trackVideoStart,
  trackGenerateLead,
  trackContactClick,
  trackViewItem,
  trackPageView,
  type TrackEventParams,
}
