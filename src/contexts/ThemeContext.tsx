'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getThemeFromCookie, setThemeCookie } from '@/lib/cookies'

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function readDomIsDark(): boolean {
  if (typeof document === 'undefined') return true
  return document.documentElement.classList.contains('dark')
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Match the blocking layout script: dark by default; cookie / DOM win after mount.
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const cookieTheme = getThemeFromCookie()
    let preferredDark = true

    if (cookieTheme !== null) {
      preferredDark = cookieTheme
    } else {
      // Prefer class already set by the FOUC script; fall back to dark.
      preferredDark = readDomIsDark()
      // Persist default so preference stays stable across visits.
      setThemeCookie(preferredDark)
    }

    setIsDarkMode(preferredDark)
    updateDocumentClass(preferredDark)
  }, [])

  const updateDocumentClass = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    const newValue = !isDarkMode
    setIsDarkMode(newValue)
    setThemeCookie(newValue)
    updateDocumentClass(newValue)
  }

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
