import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url || !url.includes('sedarplus.ca')) {
      return NextResponse.json({ error: 'Invalid SEDAR+ URL' }, { status: 400 })
    }

    // Fetch the SEDAR+ page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Extract document information from SEDAR+ page
    let title = ''
    let publishDate = ''
    let description = ''
    let documentType = 'other-filing'

    // Try to extract title from various possible locations
    title = $('h1').first().text().trim() ||
            $('.document-title').text().trim() ||
            $('title').text().trim() ||
            $('[data-testid*="title"]').text().trim() ||
            $('.page-title').text().trim()

    // Clean up title
    if (title.includes(' - SEDAR+')) {
      title = title.replace(' - SEDAR+', '')
    }
    if (title.includes('SPARQ Systems Inc.')) {
      title = title.replace('SPARQ Systems Inc. - ', '').replace(' - SPARQ Systems Inc.', '')
    }

    // Try to extract date from various locations
    const dateText = $('.filing-date').text().trim() ||
                     $('.document-date').text().trim() ||
                     $('[data-testid*="date"]').text().trim() ||
                     $('.date').text().trim()

    // Parse date from text
    if (dateText) {
      const dateMatch = dateText.match(/(\d{4}-\d{2}-\d{2})|(\d{2}\/\d{2}\/\d{4})|(\w+\s+\d{1,2},\s+\d{4})/)
      if (dateMatch) {
        const rawDate = dateMatch[0]
        try {
          const parsedDate = new Date(rawDate)
          if (!isNaN(parsedDate.getTime())) {
            publishDate = parsedDate.toISOString().split('T')[0]
          }
        } catch (e) {
          // Try alternate parsing
          console.warn('Date parsing failed:', e)
        }
      }
    }

    // If no date found, try to extract from URL or page content
    if (!publishDate) {
      const bodyText = $('body').text()
      const datePattern = /(?:filed|published|dated|on)\s+(\w+\s+\d{1,2},\s+\d{4})/i
      const match = bodyText.match(datePattern)
      if (match) {
        try {
          const parsedDate = new Date(match[1])
          if (!isNaN(parsedDate.getTime())) {
            publishDate = parsedDate.toISOString().split('T')[0]
          }
        } catch (e) {
          console.warn('Alternative date parsing failed:', e)
        }
      }
    }

    // Extract description
    description = $('.document-description').text().trim() ||
                  $('.summary').text().trim() ||
                  $('meta[name="description"]').attr('content') ||
                  ''

    // Determine document type based on title
    const titleLower = title.toLowerCase()
    if (titleLower.includes('quarterly') || titleLower.includes('q1') || titleLower.includes('q2') || titleLower.includes('q3') || titleLower.includes('q4')) {
      documentType = 'quarterly-report'
    } else if (titleLower.includes('annual')) {
      documentType = 'annual-report'
    } else if (titleLower.includes('press release') || titleLower.includes('news')) {
      documentType = 'press-release'
    } else if (titleLower.includes('circular')) {
      documentType = 'management-circular'
    } else if (titleLower.includes('material change')) {
      documentType = 'material-change'
    } else if (titleLower.includes('governance')) {
      documentType = 'corporate-governance'
    }

    // Extract year from title or date
    let year = new Date().getFullYear()
    if (publishDate) {
      year = new Date(publishDate).getFullYear()
    } else {
      const yearMatch = title.match(/20\d{2}/)
      if (yearMatch) {
        year = parseInt(yearMatch[0])
      }
    }

    // Extract quarter if applicable
    let quarter = undefined
    const quarterMatch = title.match(/Q([1-4])/i) || title.match(/quarter\s+([1-4])/i)
    if (quarterMatch) {
      quarter = `Q${quarterMatch[1]}`
    }

    // If still no date, use current date as fallback
    if (!publishDate) {
      publishDate = new Date().toISOString().split('T')[0]
    }

    // Clean up extracted data
    title = title.trim()
    description = description.trim()

    const extractedData = {
      title: title || 'Unknown Document',
      type: documentType,
      year,
      quarter,
      publishDate,
      description: description || '',
      url
    }

    return NextResponse.json(extractedData)

  } catch (error) {
    console.error('Error parsing SEDAR+ URL:', error)
    return NextResponse.json(
      { error: 'Failed to parse SEDAR+ URL: ' + (error as Error).message },
      { status: 500 }
    )
  }
}