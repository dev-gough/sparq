'use client'

// All ['News Release', 'Annual Financial Statements', 'Interim Financial Statements']
// From SEDAR+ on Company Sparq Systems Inc. / Sparq Systems Inc. (000047546) are included

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'motion/react'
import { FileText, Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface DocumentData {
  id: string
  title: string
  type: string
  year: number
  quarter?: string
  publishDate: string
  url: string
  description: string
}

const documentTypes = [
  { value: '', label: 'All Documents' },
  { value: 'financial-reports', label: 'Financial Reports' },
  { value: 'quarterly-report', label: 'Quarterly Reports' },
  { value: 'annual-report', label: 'Annual Reports' },
  { value: 'press-release', label: 'News Releases' }
]

export default function ReportsPage() {
  const [documents, setDocuments] = useState<DocumentData[]>([])
  const [filteredDocs, setFilteredDocs] = useState<DocumentData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const loadDocuments = async () => {
    try {
      const response = await fetch('/api/sedar-documents')
      const data = await response.json()
      setDocuments(data.documents || [])
      setFilteredDocs(data.documents || [])
    } catch (error) {
      console.error('Error loading documents:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  useEffect(() => {
    let filtered = documents

    if (selectedType) {
      if (selectedType === 'financial-reports') {
        // Financial Reports includes both quarterly and annual reports
        filtered = filtered.filter(doc =>
          doc.type === 'quarterly-report' || doc.type === 'annual-report'
        )
      } else {
        filtered = filtered.filter(doc => doc.type === selectedType)
      }
    }

    if (selectedYear) {
      filtered = filtered.filter(doc => doc.year.toString() === selectedYear)
    }

    setFilteredDocs(filtered)
  }, [documents, selectedType, selectedYear])

  // Group documents by year when "All Years" is selected
  const groupedByYear = () => {
    if (selectedYear) {
      return { [selectedYear]: filteredDocs }
    }

    const grouped = filteredDocs.reduce((acc, doc) => {
      const year = doc.year.toString()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(doc)
      return acc
    }, {} as Record<string, typeof filteredDocs>)

    // Sort years in descending order (newest first: 2025, 2024, 2023...)
    const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a))
    const sortedGrouped: Record<string, typeof filteredDocs> = {}
    sortedYears.forEach(year => {
      // Also sort documents within each year by publish date (newest first)
      sortedGrouped[year] = grouped[year].sort((a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      )
    })

    return sortedGrouped
  }

  // Check if any title in a year group needs 2 lines (rough estimate: >30 characters)
  const needsTwoLines = (yearDocs: typeof filteredDocs) => {
    return yearDocs.some(doc => doc.title.length > 30)
  }

  const availableYears = [...new Set(documents.map(doc => doc.year))].sort((a, b) => b - a)

  const formatDate = (dateString: string) => {
    // Parse the date as local date to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day) // month is 0-indexed

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTypeLabel = (type: string) => {
    return documentTypes.find(t => t.value === type)?.label || type
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-maroon mx-auto"></div>
            <p className="mt-4 text-brand-graytext dark:text-dark-text-secondary">Loading financial documents...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative scroll-mt-[115px]">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
              Financial Reports & Filings
            </span>
          </h1>
          <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto">
            Access our library of annual/quarterly financial reports and public news releases.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 bg-white/50 dark:bg-gray-800/30">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2 text-brand-darkmaroon dark:text-brand-yellow">
                  Document Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-brand-graytext dark:text-dark-text-secondary focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                >
                  {documentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2 text-brand-darkmaroon dark:text-brand-yellow">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-brand-graytext dark:text-dark-text-secondary focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                >
                  <option value="">All Years</option>
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 text-sm text-brand-graytext dark:text-dark-text-secondary">
              Showing {filteredDocs.length} of {documents.length} documents
            </div>
          </Card>
        </motion.div>

        {/* Documents Grid */}
        <div className="space-y-12">
          {filteredDocs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-brand-darkmaroon dark:text-brand-yellow mb-2">
                No documents found
              </h3>
              <p className="text-brand-graytext dark:text-dark-text-secondary">
                Try adjusting your filters to see more results.
              </p>
            </motion.div>
          ) : (
            Object.entries(groupedByYear())
              .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
              .map(([year, yearDocs], yearIndex) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: yearIndex * 0.1 }}
                  className="space-y-6"
                >
                  {/* Year Header */}
                  <div className="space-y-4">
                    {yearIndex > 0 && (
                      <hr className="border-brand-maroon/20 dark:border-brand-logo/20" />
                    )}
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: yearIndex * 0.1 + 0.2 }}
                      className="text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow"
                    >
                      {year}
                    </motion.h2>
                  </div>

                  {/* Documents Grid for this year */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {yearDocs.map((doc, docIndex) => (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: yearIndex * 0.1 + docIndex * 0.05 }}
                        className="h-full"
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/70 dark:bg-gray-800/50 border border-brand-maroon/10 flex flex-col">
                          <CardContent className="p-6 flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-start gap-3 mb-4">
                              <FileText className="w-5 h-5 text-brand-maroon dark:text-brand-logo mt-1 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <h3 className={`text-lg font-semibold text-brand-darkmaroon dark:text-brand-yellow mb-2 leading-tight flex items-start ${
                                  needsTwoLines(yearDocs) ? 'h-12' : 'h-6'
                                }`}>
                                  <span className="line-clamp-2">
                                    {doc.title}
                                  </span>
                                </h3>
                              </div>
                            </div>

                            {/* Metadata */}
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

                            {/* Action Button */}
                            <div className="mt-auto">
                              <a
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-lg hover:from-brand-darkmaroon hover:to-brand-maroon transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                              >
                                <span>View Document</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
          )}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> All documents are hosted on SEDAR+ <Link className='hover:underline' href="https://www.sedarplus.ca" target="_blank">(sedarplus.ca)</Link>, Canada&apos;s official regulatory filing repository.
              Links will open in a new window.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}