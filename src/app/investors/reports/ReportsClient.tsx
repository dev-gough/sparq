'use client'

// All ['News Release', 'Annual Financial Statements', 'Interim Financial Statements']
// From SEDAR+ on Company Sparq Systems Inc. / Sparq Systems Inc. (000047546) are included

import { useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export interface DocumentData {
  id: string
  title: string
  type: string
  year: number
  quarter?: string
  publishDate: string
  url: string
  description: string
  key?: boolean
}

const documentTypes = [
  { value: '', label: 'All Documents' },
  { value: 'financial-reports', label: 'Financial Reports' },
  { value: 'quarterly-report', label: 'Quarterly Reports' },
  { value: 'annual-report', label: 'Annual Reports' },
  { value: 'press-release', label: 'News Releases' },
]

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getTypeLabel(type: string) {
  return documentTypes.find((t) => t.value === type)?.label || type
}

function needsTwoLines(yearDocs: DocumentData[]) {
  return yearDocs.some((doc) => doc.title.length> 30)
}

export default function ReportsClient({ documents }: { documents: DocumentData[] }) {
  const [selectedType, setSelectedType] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const filteredDocs = useMemo(() => {
    let filtered = documents

    if (selectedType) {
      if (selectedType === 'financial-reports') {
        filtered = filtered.filter(
          (doc) => doc.type === 'quarterly-report' || doc.type === 'annual-report'
        )
      } else {
        filtered = filtered.filter((doc) => doc.type === selectedType)
      }
    }

    if (selectedYear) {
      filtered = filtered.filter((doc) => doc.year.toString() === selectedYear)
    }

    return filtered
  }, [documents, selectedType, selectedYear])

  const groupedByYear = useMemo(() => {
    if (selectedYear) {
      return { [selectedYear]: filteredDocs }
    }

    const grouped = filteredDocs.reduce(
      (acc, doc) => {
        const year = doc.year.toString()
        if (!acc[year]) acc[year] = []
        acc[year].push(doc)
        return acc
      },
      {} as Record<string, DocumentData[]>
    )

    const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a))
    const sortedGrouped: Record<string, DocumentData[]> = {}
    sortedYears.forEach((year) => {
      sortedGrouped[year] = grouped[year].sort(
        (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      )
    })

    return sortedGrouped
  }, [filteredDocs, selectedYear])

  const availableYears = useMemo(
    () => [...new Set(documents.map((doc) => doc.year))].sort((a, b) => b - a),
    [documents]
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative scroll-mt-[115px]">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
              Financial Reports & Filings
            </span>
          </h1>
          <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto">
            Access our library of annual/quarterly financial reports and public news releases.
          </p>
        </div>

        <div className="mb-8">
          <Card className="p-6 bg-white/50 dark:bg-gray-800/30">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="report-doc-type" className="block text-sm font-semibold mb-2 text-brand-darkmaroon dark:text-brand-yellow">
                  Document Type
                </label>
                <select
                  id="report-doc-type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full min-h-[44px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-brand-graytext dark:text-dark-text-secondary focus:ring-2 focus:ring-brand-maroon focus:border-transparent">
                  {documentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label htmlFor="report-year" className="block text-sm font-semibold mb-2 text-brand-darkmaroon dark:text-brand-yellow">
                  Year
                </label>
                <select
                  id="report-year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full min-h-[44px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-brand-graytext dark:text-dark-text-secondary focus:ring-2 focus:ring-brand-maroon focus:border-transparent">
                  <option value="">All Years</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 text-sm text-brand-graytext dark:text-dark-text-secondary">
              Showing {filteredDocs.length} of {documents.length} documents
            </div>
          </Card>
        </div>

        <div className="space-y-12">
          {filteredDocs.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-brand-darkmaroon dark:text-brand-yellow mb-2">
                No documents found
              </h2>
              <p className="text-brand-graytext dark:text-dark-text-secondary">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            Object.entries(groupedByYear)
              .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
              .map(([year, yearDocs], yearIndex) => (
                <div key={year}
                  
                  
                  
                  className="space-y-6">
                  <div className="space-y-4">
                    {yearIndex> 0 && (
                      <hr className="border-brand-maroon/20 dark:border-brand-logo/20" />
                    )}
                    <h2 className="text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow">
                      {year}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {yearDocs.map((doc) => (
                      <div key={doc.id}
                        
                        
                        
                        className="h-full">
                        <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/70 dark:bg-gray-800/50 border border-brand-maroon/10 flex flex-col">
                          <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex items-start gap-3 mb-4">
                              <FileText className="w-5 h-5 text-brand-maroon dark:text-brand-logo mt-1 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <h3 className={`text-lg font-semibold text-brand-darkmaroon dark:text-brand-yellow mb-2 leading-tight flex items-start ${
                                    needsTwoLines(yearDocs) ? 'h-12' : 'h-6'
                                  }`}>
                                  <span className="line-clamp-2">{doc.title}</span>
                                </h3>
                              </div>
                            </div>

                            <div className="space-y-3 mb-6 flex-1">
                              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-maroon/10 dark:bg-brand-logo/10 text-brand-maroon dark:text-brand-logo font-medium text-sm">
                                {getTypeLabel(doc.type)}
                              </div>

                              <div className="space-y-2 text-sm text-brand-graytext dark:text-dark-text-secondary">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(doc.publishDate)}</span>
                                </div>

                                {doc.type !== 'press-release' && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{doc.year}</span>
                                    {doc.quarter && <span>• {doc.quarter}</span>}
                                  </div>
                                )}
                              </div>

                              {doc.description && (
                                <p className="text-brand-graytext dark:text-dark-text-secondary text-sm leading-relaxed line-clamp-3">
                                  {doc.description}
                                </p>
                              )}
                            </div>

                            <div className="mt-auto">
                              <a href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-lg hover:from-brand-darkmaroon hover:to-brand-maroon transition-all duration-300 shadow-lg hover:shadow-xl text-sm">
                                <span>View Document</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>

        <div className="mt-12 text-center">
          <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> All documents are hosted on SEDAR+{' '}
              <Link className="hover:underline" href="https://www.sedarplus.ca" target="_blank">
                (sedarplus.ca)
              </Link>
              , Canada&apos;s official regulatory filing repository. Links will open in a new window.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
