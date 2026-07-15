'use client'

import { useState, type ReactNode } from 'react'
import { useTrackEvent } from '@/hooks/useTrackEvent'
import { ChevronDown } from 'lucide-react'

type LegalAccordionProps = {
  title: string
  trackId: string
  children: ReactNode
  defaultOpen?: boolean
}

/**
 * Client-only expand/collapse shell for legal documents.
 * Body content is passed as children (server-rendered modules).
 */
export default function LegalAccordion({
  title,
  trackId,
  children,
  defaultOpen = false,
}: LegalAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const trackEvent = useTrackEvent()

  const handleOpen = () => {
    setOpen((prev) => {
      if (!prev) {
        trackEvent('dropdown_opened', { dropdown: trackId })
      }
      return !prev
    })
  }

  return (
    <div className="w-full relative">
      <button
        type="button"
        className="w-full p-6 cursor-pointer bg-gradient-to-r from-brand-maroon to-brand-darkmaroon rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-left"
        onClick={handleOpen}
        aria-expanded={open}
      >
        <div className="flex flex-row justify-between items-center text-xl md:text-2xl lg:text-3xl">
          <span className="text-white font-semibold">{title}</span>
          <ChevronDown
            className={`w-6 h-6 text-white transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
      {open && (
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 p-6 sm:p-10 mt-4 text-brand-graytext dark:text-dark-text-secondary">
          {children}
        </div>
      )}
    </div>
  )
}
