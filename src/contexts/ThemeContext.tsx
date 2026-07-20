'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getThemeFromCookie, setThemeCookie } from '@/lib/cookies'

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function applyDocumentClass(isDark: boolean) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', isDark)
}

function readPreferredDark(): boolean {
  if (typeof document === 'undefined') return true
  const cookieTheme = getThemeFromCookie()
  if (cookieTheme !== null) return cookieTheme
  return document.documentElement.classList.contains('dark')
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // SSR + first paint: dark matches layout FOUC script (suppressHydrationWarning on <html>).
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const preferred = readPreferredDark()
    applyDocumentClass(preferred)
    if (getThemeFromCookie() === null) {
      setThemeCookie(preferred)
    }
    // Defer setState so we don't cascade renders in the same effect turn (React 19 hooks rule).
    queueMicrotask(() => {
      setIsDarkMode(preferred)
    })
  }, [])

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev
      setThemeCookie(next)
      applyDocumentClass(next)
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
