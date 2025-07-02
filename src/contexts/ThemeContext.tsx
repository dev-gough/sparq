'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getThemeFromCookie, setThemeCookie } from '@/lib/cookies'

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with a default state to avoid hydration mismatch
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check if dark class is already applied (from server-side)
    const hasExistingDark = document.documentElement.classList.contains('dark')
    
    // Check cookie preference
    const cookieTheme = getThemeFromCookie()
    
    let preferredDark = false
    
    if (cookieTheme !== null) {
      // Use cookie preference
      preferredDark = cookieTheme
    } else if (hasExistingDark) {
      // Use existing dark class
      preferredDark = true
    } else {
      // Check system preference
      preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      // Save the system preference to cookie
      setThemeCookie(preferredDark)
    }
    
    setIsDarkMode(preferredDark)
    updateDocumentClass(preferredDark)
    setIsInitialized(true)
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