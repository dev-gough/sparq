'use client'

import React from 'react'
import { Play, Pause } from 'lucide-react'
import { useAnimations } from '@/contexts/AnimationContext'

export default function AnimationToggle() {
  const { animationsEnabled, toggleAnimations } = useAnimations()

  return (
    <button
      onClick={toggleAnimations}
      className="flex items-center justify-center w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
      title={animationsEnabled ? 'Disable animations' : 'Enable animations'}
      aria-label={animationsEnabled ? 'Disable animations' : 'Enable animations'}
    >
      {animationsEnabled ? (
        <Pause className="w-4 h-4 text-black" />
      ) : (
        <Play className="w-4 h-4 text-black" />
      )}
    </button>
  )
}