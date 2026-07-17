'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { MotionGlobalConfig } from 'motion/react'

interface AnimationContextType {
  animationsEnabled: boolean
  toggleAnimations: () => void
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('animations-enabled')
    if (saved !== null) {
      const enabled = JSON.parse(saved)
      setAnimationsEnabled(enabled)
      MotionGlobalConfig.skipAnimations = !enabled
      document.documentElement.classList.toggle('animations-disabled', !enabled)
    } else {
      MotionGlobalConfig.skipAnimations = false
      document.documentElement.classList.remove('animations-disabled')
    }
  }, [])

  const toggleAnimations = () => {
    const newValue = !animationsEnabled
    setAnimationsEnabled(newValue)
    localStorage.setItem('animations-enabled', JSON.stringify(newValue))
    MotionGlobalConfig.skipAnimations = !newValue
    // Also gates CSS view-transition animations (see globals.css)
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