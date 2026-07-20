'use client'

import { useState, type ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useTrackEvent, trackSelectContent } from '@/hooks/useTrackEvent'

export type DocsAccordionSection = {
  title: string
  content: ReactNode
  accentColor?: string
}

type DocsAccordionProps = {
  /** Product/page slug for analytics (e.g. quad2) */
  parent: string
  sections: DocsAccordionSection[]
  /** Indices open by default */
  defaultOpen?: number[]
}

/**
 * Client island: expandable docs/cert sections used on product pages.
 * Section bodies may include other client components (e.g. YouTubeFacade).
 */
export default function DocsAccordion({
  parent,
  sections,
  defaultOpen = [],
}: DocsAccordionProps) {
  useTrackEvent()
  const [open, setOpen] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {}
    for (const i of defaultOpen) init[i] = true
    return init
  })

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = { ...prev, [i]: !prev[i] }
      if (!prev[i]) {
        trackSelectContent({
          content_type: 'accordion',
          content_id: `${parent}_${sections[i].title.toLowerCase().replace(/\s+/g, '_')}`,
          content_name: sections[i].title,
          item_list_name: parent,
        })
      }
      return next
    })
  }

  const iconFor = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('video') || t.includes('demo') || t.includes('watch')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    }
    if (t.includes('cert') || t.includes('report')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      )
    }
    if (t.includes('documentation') || t.includes('manual')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      )
    }
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )
  }

  return (
    <div className="py-6 space-y-6 max-w-4xl">
      {sections.map((section, i) => {
        const isOpen = Boolean(open[i])
        const accent =
          section.accentColor ??
          'bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80'
        return (
          <div key={section.title}>
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 max-w-4xl py-0">
              <CardContent className="p-0">
                <button
                  type="button"
                  className={`${accent} p-6 text-white cursor-pointer w-full text-left min-h-[44px]`}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0" aria-hidden>
                      {iconFor(section.title)}
                    </div>
                    <span className="text-xl md:text-2xl font-bold flex-1">{section.title}</span>
                    <div
                      className={`flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                {isOpen && (
                  <div className="p-6 bg-white dark:bg-gray-800">{section.content}</div>
                )}
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
