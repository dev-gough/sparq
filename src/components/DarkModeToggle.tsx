'use client'

import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 transition-colors border border-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 dark:border-gray-600/50"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="w-4 h-4 text-white dark:text-dark-text-primary" />
      ) : (
        <Moon className="w-4 h-4 text-black dark:text-dark-text-primary" />
      )}
    </button>
  )
}