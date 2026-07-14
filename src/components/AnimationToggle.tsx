'use client'

import React from 'react'
import { Play, Pause } from 'lucide-react'
import { useAnimations } from '@/contexts/AnimationContext'

export default function AnimationToggle() {
  const { animationsEnabled, toggleAnimations } = useAnimations()

  return (
    <button
      onClick={toggleAnimations}
      className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer bg-white/10 hover:bg-white/20 transition-colors border border-gray-300 hover:border-gray-400 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 dark:border-gray-600/50 dark:hover:border-gray-500/50"
      title={animationsEnabled ? 'Disable animations' : 'Enable animations'}
      aria-label={animationsEnabled ? 'Disable animations' : 'Enable animations'}
    >
      {animationsEnabled ? (
        <Pause className="w-4 h-4 text-black dark:text-white" />
      ) : (
        <Play className="w-4 h-4 text-black dark:text-white" />
      )}
    </button>
  )
}