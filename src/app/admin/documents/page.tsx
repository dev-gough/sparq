'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface DocumentData {
  title: string
  type: string
  year: number
  quarter?: string
  publishDate: string
  url: string
  description: string
}

const documentTypes = [
  { value: 'quarterly-report', label: 'Quarterly Report' },
  { value: 'annual-report', label: 'Annual Report' },
  { value: 'press-release', label: 'News Release' },
  { value: 'other-filing', label: 'Other Filing' }
]

export default function DocumentsAdmin() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [extractedData, setExtractedData] = useState<Partial<DocumentData> | null>(null)
  const [formData, setFormData] = useState<Partial<DocumentData>>({})
  const [message, setMessage] = useState('')

  const extractFromUrl = async () => {
    if (!url.includes('sedarplus.ca')) {
      setMessage('Please enter a valid SEDAR+ URL')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/parse-sedar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      if (!response.ok) {
        throw new Error('Failed to parse URL')
      }

      const data = await response.json()
      setExtractedData(data)
      setFormData({
        ...data,
        url: url,
        type: data.type || 'other-filing'
      })
    } catch (error) {
      setMessage('Error parsing URL: ' + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const addDocument = async () => {
    if (!formData.title || !formData.type || !formData.publishDate) {
      setMessage('Please fill in all required fields')
      return
    }

    try {
      const response = await fetch('/api/sedar-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to add document')
      }

      setMessage('Document added successfully!')
      setUrl('')
      setExtractedData(null)
      setFormData({})
    } catch (error) {
      setMessage('Error adding document: ' + (error as Error).message)
    }
  }

  const reset = () => {
    setUrl('')
    setExtractedData(null)
    setFormData({})
    setMessage('')
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-brand-darkmaroon">SEDAR+ Documents Admin</h1>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') || message.includes('Please')
            ? 'bg-red-100 text-red-700 border border-red-300'
            : 'bg-green-100 text-green-700 border border-green-300'
          }`}>
          {message}
        </div>
      )}

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Step 1: Extract from SEDAR+ URL</h2>

          <div className="flex gap-4 mb-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste SEDAR+ document URL here..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
            />
            <button
              onClick={extractFromUrl}
              disabled={isLoading || !url}
              className="px-6 py-2 bg-brand-maroon text-white font-semibold rounded-lg hover:bg-brand-darkmaroon disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Extracting...' : 'Extract Data'}
            </button>
          </div>

          <p className="text-sm text-gray-600">
            Example: https://www.sedarplus.ca/csa-party/records/document.html?id=...
          </p>
        </CardContent>
      </Card>

      {extractedData && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Step 2: Review and Edit Document Data</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Document Type *</label>
                <select
                  value={formData.type || ''}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                >
                  <option value="">Select type...</option>
                  {documentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Year *</label>
                <input
                  type="number"
                  value={formData.year || ''}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Quarter (if applicable)</label>
                <select
                  value={formData.quarter || ''}
                  onChange={(e) => setFormData({ ...formData, quarter: e.target.value || undefined })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                >
                  <option value="">Select quarter...</option>
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="Q4">Q4</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Publish Date *</label>
                <input
                  type="date"
                  value={formData.publishDate || ''}
                  onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                  placeholder="Brief description of the document..."
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={addDocument}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
              >
                Add Document
              </button>
              <button
                onClick={reset}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Current Documents</h2>
          <DocumentsList />
        </CardContent>
      </Card>
    </div>
  )
}

function DocumentsList() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [documents, setDocuments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadDocuments = async () => {
    try {
      const response = await fetch('/api/sedar-documents')
      const data = await response.json()
      setDocuments(data.documents || [])
    } catch (error) {
      console.error('Error loading documents:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteDocument = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return

    try {
      const response = await fetch(`/api/sedar-documents?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        loadDocuments()
      }
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }

  React.useEffect(() => {
    loadDocuments()
  }, [])

  if (isLoading) {
    return <div className="text-center py-8">Loading documents...</div>
  }

  if (documents.length === 0) {
    return <div className="text-center py-8 text-gray-500">No documents added yet.</div>
  }

  return (
    <div className="space-y-4">
      {documents.map((doc, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{doc.title}</h3>
              <div className="text-sm text-gray-600 mt-1">
                <span className="inline-block bg-gray-100 px-2 py-1 rounded mr-2">
                  {documentTypes.find(t => t.value === doc.type)?.label || doc.type}
                </span>
                <span>{doc.year}</span>
                {doc.quarter && <span> - {doc.quarter}</span>}
                <span className="ml-2">{doc.publishDate}</span>
              </div>
              {doc.description && (
                <p className="text-gray-700 mt-2">{doc.description}</p>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-brand-maroon text-white text-sm rounded hover:bg-brand-darkmaroon"
              >
                View
              </a>
              <button
                onClick={() => deleteDocument(doc.id)}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}