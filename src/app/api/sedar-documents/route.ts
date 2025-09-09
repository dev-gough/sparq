import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DOCUMENTS_FILE = path.join(process.cwd(), 'src/data/sedar-documents.json')

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

interface DocumentsFile {
  documents: DocumentData[]
}

async function readDocuments(): Promise<DocumentsFile> {
  try {
    const content = await fs.readFile(DOCUMENTS_FILE, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    // If file doesn't exist or is invalid, return empty structure
    console.log(error)
    return { documents: [] }
  }
}

// GET - Retrieve all documents
export async function GET() {
  try {
    const data = await readDocuments()
    
    // Sort documents by publish date (newest first)
    data.documents.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading documents:', error)
    return NextResponse.json(
      { error: 'Failed to read documents' },
      { status: 500 }
    )
  }
}

// POST - Disabled for security
export async function POST() {
  return NextResponse.json(
    { error: 'Document modification not allowed via API' },
    { status: 405 }
  )
}

// DELETE - Disabled for security
export async function DELETE() {
  return NextResponse.json(
    { error: 'Document modification not allowed via API' },
    { status: 405 }
  )
}