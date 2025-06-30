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
    } else {
      MotionGlobalConfig.skipAnimations = false
    }
  }, [])

  const toggleAnimations = () => {
    const newValue = !animationsEnabled
    setAnimationsEnabled(newValue)
    localStorage.setItem('animations-enabled', JSON.stringify(newValue))
    MotionGlobalConfig.skipAnimations = !newValue
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