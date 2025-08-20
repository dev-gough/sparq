import { NextRequest, NextResponse } from 'next/server'
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

async function writeDocuments(data: DocumentsFile): Promise<void> {
  await fs.writeFile(DOCUMENTS_FILE, JSON.stringify(data, null, 2), 'utf-8')
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

// POST - Add new document
export async function POST(request: NextRequest) {
  try {
    const newDoc = await request.json()
    
    // Validate required fields
    if (!newDoc.title || !newDoc.type || !newDoc.publishDate || !newDoc.url) {
      return NextResponse.json(
        { error: 'Missing required fields: title, type, publishDate, url' },
        { status: 400 }
      )
    }

    const data = await readDocuments()
    
    // Generate ID from URL or timestamp
    const id = Buffer.from(newDoc.url).toString('base64').slice(0, 16) + Date.now().toString(36)
    
    // Check if document with this URL already exists
    const existingDoc = data.documents.find(doc => doc.url === newDoc.url)
    if (existingDoc) {
      return NextResponse.json(
        { error: 'Document with this URL already exists' },
        { status: 409 }
      )
    }

    const document: DocumentData = {
      id,
      title: newDoc.title.trim(),
      type: newDoc.type,
      year: parseInt(newDoc.year) || new Date().getFullYear(),
      quarter: newDoc.quarter || undefined,
      publishDate: newDoc.publishDate,
      url: newDoc.url.trim(),
      description: (newDoc.description || '').trim()
    }

    data.documents.push(document)
    
    // Sort documents by publish date (newest first)
    data.documents.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    
    await writeDocuments(data)
    
    return NextResponse.json({ success: true, document })
  } catch (error) {
    console.error('Error adding document:', error)
    return NextResponse.json(
      { error: 'Failed to add document' },
      { status: 500 }
    )
  }
}

// DELETE - Remove document
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      )
    }

    const data = await readDocuments()
    const initialLength = data.documents.length
    
    data.documents = data.documents.filter(doc => doc.id !== id)
    
    if (data.documents.length === initialLength) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }
    
    await writeDocuments(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting document:', error)
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    )
  }
}