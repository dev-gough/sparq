import { useCallback, useEffect } from 'react'
import { prefetchAnalytics, trackEvent, type TrackEventParams } from '@/lib/firebaseAnalytics'

/**
 * Analytics tracking hook. Schedules Firebase load on idle (first mount)
 * and never pulls the Firebase SDK into the module graph at import time.
 */
export const useTrackEvent = () => {
  useEffect(() => {
    prefetchAnalytics()
  }, [])

  return useCallback((eventName: string, eventParams?: TrackEventParams) => {
    void trackEvent(eventName, eventParams)
  }, [])
}
