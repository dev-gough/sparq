'use client'

import { useSyncExternalStore } from "react"

function getMediaQuery() {
    return typeof window !== "undefined" ? window.matchMedia('(max-width: 639px)') : null
}

function subscribe(callback: () => void) {
    const mediaQuery = getMediaQuery()
    if (mediaQuery) {
        mediaQuery.addEventListener('change', callback)
        return () => {
            mediaQuery.removeEventListener('change', callback)
        }
    }
    return () => {}
}

function getSnapshot() {
    const mediaQuery = getMediaQuery()
    return mediaQuery ? mediaQuery.matches : false
}

export function useIsMobile() {
    return useSyncExternalStore(subscribe, getSnapshot, () => false)
}