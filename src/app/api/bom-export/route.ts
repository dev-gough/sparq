import { NextRequest, NextResponse } from 'next/server'
import {
  buildBomWorkbookBuffer,
  validateBomExportInput,
} from '@/lib/bomWorkbook'

export const runtime = 'nodejs'

/**
 * POST /api/bom-export
 * Body: calculator form fields (numbers + region/project/grid).
 * Server re-runs designMath and returns a branded .xlsx.
 */
export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const validated = validateBomExportInput(body)
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 })
  }

  try {
    const buffer = await buildBomWorkbookBuffer(validated.data)
    const stamp = Date.now()
    const filename = `sparq_system_summary_${stamp}.xlsx`

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('bom-export failed:', err)
    return NextResponse.json(
      { error: 'Failed to generate spreadsheet' },
      { status: 500 }
    )
  }
}
