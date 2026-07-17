'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AnimationContextType {
  animationsEnabled: boolean
  toggleAnimations: () => void
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

/**
 * Gates CSS view transitions (and any future CSS animation classes).
 * Motion library has been removed from the site.
 */
export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('animations-enabled')
    if (saved !== null) {
      const enabled = JSON.parse(saved) as boolean
      setAnimationsEnabled(enabled)
      document.documentElement.classList.toggle('animations-disabled', !enabled)
    } else {
      document.documentElement.classList.remove('animations-disabled')
    }
  }, [])

  const toggleAnimations = () => {
    const newValue = !animationsEnabled
    setAnimationsEnabled(newValue)
    localStorage.setItem('animations-enabled', JSON.stringify(newValue))
    document.documentElement.classList.toggle('animations-disabled', !newValue)
  }

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimations() {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error('useAnimations must be used within an AnimationProvider')
  }
  return context
}
