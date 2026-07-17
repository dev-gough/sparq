'use client'

import { useTrackEvent } from '@/hooks/useTrackEvent'
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

export type ListEntry = {
  heading: string
  items: Array<string | React.ReactNode>
}

interface ProductProps {
  models?: Array<string>
  selectedModel?: string | null
  setSelectedModel?: (m: string) => void
  model?: string
  heading: string
  animated?: boolean
  parent: string
  href: string
  animatedList?: ListEntry[]
  bodyContent?: React.ReactNode
  expandedContent?: React.ReactNode
  accordianContent?: React.ReactNode
  imageContent: React.ReactNode
}

export default function ProductPage({
  models,
  selectedModel,
  setSelectedModel,
  model,
  heading,
  animated,
  parent,
  href,
  animatedList,
  bodyContent,
  expandedContent,
  accordianContent,
  imageContent,
}: ProductProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [allCardsExpanded, setAllCardsExpanded] = useState(false)
  const trackEvent = useTrackEvent()

  const handleClick = () => {
    setIsExpanded(!isExpanded)
    if (isExpanded) return
    trackEvent('read_more', {
      parent: parent.toLowerCase(),
    })
  }

  const toggleAllCardsExpanded = () => {
    setAllCardsExpanded((prev) => !prev)
    if (!allCardsExpanded) {
      trackEvent('feature_cards_expanded', {
        parent: parent.toLowerCase(),
      })
    }
  }

  const getAccentColor = (index: number) => {
    const colors = [
      'bg-gradient-to-br from-brand-maroon to-brand-darkmaroon',
      'bg-gradient-to-br from-brand-midmaroon to-brand-logo',
      'bg-gradient-to-br from-brand-logo to-brand-yellow',
    ]
    return colors[index % colors.length]
  }

  const getIconForCategory = (cardHeading: string) => {
    if (cardHeading.toLowerCase().includes('performance')) {
      return (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      )
    }
    if (cardHeading.toLowerCase().includes('safe') || cardHeading.toLowerCase().includes('reliable')) {
      return (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      )
    }
    if (cardHeading.toLowerCase().includes('cost')) {
      return (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      )
    }
    return (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <div className="container mx-auto py-6 px-4 lg:px-8">
        <div className="flex justify-left items-center mb-8 text-sm md:text-base text-brand-graytext dark:text-dark-text-secondary">
          <Link href="/products" className="hover:underline px-2 transition-colors duration-200">
            Products
          </Link>{' '}
          <span className="mx-1">/</span>{' '}
          <Link
            href={`/products/${href}`}
            className="hover:underline px-2 transition-colors duration-200"
          >
            {parent}
          </Link>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-12">
          <div className="flex-1">
            {/* Hero title — fully painted for LCP */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-yellow bg-clip-text text-transparent">
                {heading}
              </span>
            </h1>

            {animated && (
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  {animatedList?.map(({ heading: cardHeading, items }, index) => (
                    <div key={index} className="flex-1">
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group py-0 h-full">
                        <CardContent className="p-0 flex flex-col h-full">
                          <div
                            className={`${getAccentColor(index)} p-4 text-white group-hover:brightness-110 transition-all duration-300 cursor-pointer`}
                            onClick={() => toggleAllCardsExpanded()}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <div className="text-white text-lg">
                                  {getIconForCategory(cardHeading)}
                                </div>
                              </div>
                              <h2 className="text-lg font-bold leading-tight flex-1">{cardHeading}</h2>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-white text-sm font-medium">
                                {items.length <= 3
                                  ? 'All features'
                                  : allCardsExpanded
                                    ? 'All features'
                                    : 'Key features'}
                              </div>
                              {items.length > 3 && (
                                <div
                                  className={`text-white/90 transition-transform duration-200 ${
                                    allCardsExpanded ? 'rotate-180' : ''
                                  }`}
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="p-4 bg-white dark:bg-gray-800 flex-1 flex flex-col">
                            <div className="space-y-3 flex-1">
                              {(items.length <= 3 ? items : items.slice(0, 2)).map((item, i) => (
                                <div
                                  key={i}
                                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-200 group/item"
                                >
                                  <div
                                    className={`w-2 h-2 rounded-full ${getAccentColor(index)} mt-2 flex-shrink-0`}
                                  />
                                  <span className="text-brand-graytext dark:text-dark-text-secondary font-medium text-sm leading-relaxed group-hover/item:text-brand-darkmaroon transition-colors duration-200">
                                    {item}
                                  </span>
                                </div>
                              ))}

                              {items.length > 3 && (
                                <div
                                  className={`overflow-hidden transition-all duration-300 ${
                                    allCardsExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                                  }`}
                                >
                                  <div className="space-y-3 pt-1">
                                    {items.slice(2).map((item, i) => (
                                      <div
                                        key={i + 2}
                                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-200 group/item"
                                      >
                                        <div
                                          className={`w-2 h-2 rounded-full ${getAccentColor(index)} mt-2 flex-shrink-0`}
                                        />
                                        <span className="text-brand-graytext dark:text-dark-text-secondary font-medium text-sm leading-relaxed group-hover/item:text-brand-darkmaroon transition-colors duration-200">
                                          {item}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {items.length > 3 && (
                              <div className="text-center pt-3 mt-auto">
                                <button
                                  type="button"
                                  onClick={() => toggleAllCardsExpanded()}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 text-brand-maroon hover:text-brand-darkmaroon text-xs font-medium hover:bg-brand-maroon/5 rounded-full transition-all duration-200"
                                >
                                  <span>
                                    {allCardsExpanded
                                      ? 'Show less'
                                      : `Show ${items.length - 2} more`}
                                  </span>
                                  <span
                                    className={`transition-transform duration-200 ${
                                      allCardsExpanded ? 'rotate-180' : ''
                                    }`}
                                  >
                                    <svg
                                      className="w-3 h-3"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  </span>
                                </button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bodyContent && (
              <div className="text-lg md:text-xl text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                {bodyContent}
              </div>
            )}

            {expandedContent && (
              <div>
                {isExpanded && (
                  <div className="text-base md:text-lg text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                    {expandedContent}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleClick}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  {isExpanded ? 'Read less' : 'Read more'}
                </button>
              </div>
            )}

            {models && models.length > 1 && model && setSelectedModel && (
              <div className="mt-8">
                <p className="text-base md:text-lg font-semibold text-brand-darkmaroon mb-4">
                  Model: {model}
                </p>
                <div className="flex flex-wrap gap-3">
                  {models.map((m) => (
                    <button
                      type="button"
                      key={m}
                      className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium cursor-pointer transition-all duration-300 ${
                        m === selectedModel
                          ? 'bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white shadow-lg'
                          : 'bg-white dark:bg-gray-800 text-brand-graytext dark:text-dark-text-secondary border-2 border-brand-maroon/20 dark:border-gray-600/50 hover:border-brand-maroon/40 dark:hover:border-gray-500/70 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedModel(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {accordianContent && <div>{accordianContent}</div>}
          </div>

          <div className="flex-1">{imageContent}</div>
        </div>
      </div>
    </div>
  )
}
