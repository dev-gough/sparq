/**
 * Server-only branded BoM workbook builder (exceljs).
 * Import from API routes only — never from client components.
 */
import { readFile } from 'fs/promises'
import path from 'path'
import ExcelJS from 'exceljs'
import { calculate } from '@/lib/designMath'

export type BomExportProjectType = 'Residential' | 'Commercial' | 'Industrial'
export type BomExportGridType = 'On-grid' | 'Off-grid' | 'Water Pump'

export type BomExportInput = {
  projectName?: string
  region: string
  projectType: BomExportProjectType
  gridType: BomExportGridType
  Pgrid: number
  Vgrid: number
  Ppv: number
  Ppanel: number
  Vpanel: number
  Iscpanel: number
}

const NAME_MAP: Record<string, string> = {
  'Q2000-4102': 'Quad 2000 Single Phase Inverter',
  'Q3000-4301': 'Quad 3000 Three-Phase Inverter',
  'SL200-2001': 'SparqLinq Controller',
  '65020-01': 'Junction Box',
  '65020-05': 'Junction Box',
  '65015-09': 'T5 to T6 Cable 0.7m',
  '65015-17': 'T5 to T6 Cable 0.7m',
  '65013-16/17': 'T6 Female to Tee Male',
  '65013-08/09': 'T6 Female to Tee Male',
  '65015-10': 'T5 to T6 Cable 3m',
  '65015-18': 'T5 to T6 Cable 3m',
  '65012-14/15': 'T6 Tee Male to Open',
  '65012-02/03': 'T6 Tee Male to Open',
}

const REGIONS = new Set(['North America', 'Europe', 'India', 'Rest of World', 'Asia', 'Australia'])
const PROJECT_TYPES = new Set<BomExportProjectType>(['Residential', 'Commercial', 'Industrial'])
const GRID_TYPES = new Set<BomExportGridType>(['On-grid', 'Off-grid', 'Water Pump'])

export function validateBomExportInput(body: unknown): { ok: true; data: BomExportInput } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid JSON body' }
  }
  const b = body as Record<string, unknown>

  const num = (key: string): number | null => {
    const v = b[key]
    if (typeof v === 'number' && Number.isFinite(v)) return v
    if (typeof v === 'string' && v.trim() !== '' && Number.isFinite(+v)) return +v
    return null
  }

  const Pgrid = num('Pgrid')
  const Vgrid = num('Vgrid')
  const Ppv = num('Ppv')
  const Ppanel = num('Ppanel')
  const Vpanel = num('Vpanel')
  const Iscpanel = num('Iscpanel')

  if (
    Pgrid === null ||
    Vgrid === null ||
    Ppv === null ||
    Ppanel === null ||
    Vpanel === null ||
    Iscpanel === null
  ) {
    return { ok: false, error: 'Missing or invalid numeric fields (Pgrid, Vgrid, Ppv, Ppanel, Vpanel, Iscpanel)' }
  }

  if (!(Pgrid > 0 && Vgrid > 0 && Ppv > 0 && Ppanel > 0)) {
    return { ok: false, error: 'Pgrid, Vgrid, Ppv, and Ppanel must be positive' }
  }

  // Reasonable upper bounds to avoid pathological exceljs work
  if (Pgrid > 100_000 || Ppv > 100_000 || Ppanel > 10_000 || Vgrid > 1000) {
    return { ok: false, error: 'Input values out of allowed range' }
  }

  const region = typeof b.region === 'string' ? b.region.trim() : ''
  if (!region || region.length > 80) {
    return { ok: false, error: 'Invalid region' }
  }
  // Prefer known labels; still accept other short strings if the form expands
  void REGIONS

  const projectType = b.projectType as BomExportProjectType
  const gridType = b.gridType as BomExportGridType
  if (!PROJECT_TYPES.has(projectType)) {
    return { ok: false, error: 'Invalid projectType' }
  }
  if (!GRID_TYPES.has(gridType)) {
    return { ok: false, error: 'Invalid gridType' }
  }

  const projectName =
    typeof b.projectName === 'string' ? b.projectName.trim().slice(0, 120) : ''

  return {
    ok: true,
    data: {
      projectName,
      region,
      projectType,
      gridType,
      Pgrid,
      Vgrid,
      Ppv,
      Ppanel,
      Vpanel,
      Iscpanel,
    },
  }
}

/**
 * Rebuild BOM on the server so the file always matches designMath + inverter mapping.
 */
export async function buildBomWorkbookBuffer(input: BomExportInput): Promise<Buffer> {
  const isThreePhase =
    input.projectType === 'Industrial' || input.gridType === 'Water Pump'
  const inverterSku = isThreePhase ? 'Q3000-4301' : 'Q2000-4102'
  const modelLabel = isThreePhase
    ? 'Q3000 Three-Phase Inverter'
    : 'Q2000 Single-Phase Inverter'

  const result = calculate({
    Pgrid: input.Pgrid,
    Vgrid: input.Vgrid,
    Ppv: input.Ppv,
    Ppanel: input.Ppanel,
    region: input.region,
  })

  const bom = result.map((r) =>
    r.label === 'Inverter' ? { ...r, sku: inverterSku, label: modelLabel } : r
  )

  const wb = new ExcelJS.Workbook()
  wb.creator = 'SPARQ Systems'
  wb.created = new Date()

  const ws = wb.addWorksheet('System Summary')
  ws.views = [{ showGridLines: false }]

  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo.png')
    const logoBuf = await readFile(logoPath)
    // exceljs Buffer typings lag Node 22 Buffer; Uint8Array is accepted at runtime
    const logoId = wb.addImage({
      buffer: new Uint8Array(logoBuf) as unknown as ExcelJS.Buffer,
      extension: 'png',
    })
    ws.addImage(logoId, {
      tl: { col: 1, row: 1 },
      ext: { width: 100, height: 60 },
    })
  } catch {
    // Logo optional if missing in a minimal deploy
  }

  const headerFont = { bold: true, size: 12 }
  const thinBorder = { style: 'thin' as const, color: { argb: 'FF000000' } }

  ws.addRows([
    [],
    [],
    [],
    ['', 'SPARQ Systems Inc.'],
    ['', '945 Princess Street'],
    ['', 'Kingston, ON, K7L 0E9'],
    ['', 'Phone: (855) 947-7277'],
    ['', 'Email: info@sparqsys.com'],
    [],
  ])
  ws.getRow(6).getCell(2).font = { bold: true }

  const sysHeader = ws.addRow(['', 'System Summary', '', ''])
  sysHeader.font = headerFont
  sysHeader.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    if (colNumber >= 2 && colNumber <= 4) {
      cell.border = { bottom: thinBorder }
    }
  })

  const generationDate = new Date().toLocaleString()
  ws.addRows([
    ['', 'Project Name', input.projectName || 'Untitled Project'],
    ['', 'Report Generated', generationDate],
    [''],
    ['', 'Region', input.region],
    ['', 'Project Type', input.projectType],
    ['', 'Grid Type', input.gridType],
    ['', 'Grid System Size (kW)', input.Pgrid],
    ['', 'Grid Voltage (VAC)', input.Vgrid],
    ['', 'PV System Size (kW)', input.Ppv],
    ['', 'Panel STC Power (W)', input.Ppanel],
    ['', 'Panel STC Voltage (V)', input.Vpanel],
    ['', 'Panel Short Circuit Current (Isc)', input.Iscpanel],
    [''],
  ])

  const sparq = bom.filter((r) => !r.sku.startsWith('65020') && r.sku !== 'SOLAR-PANEL')
  const third = bom.filter((r) => r.sku.startsWith('65020') || r.sku === 'SOLAR-PANEL')

  const bomHeader = ws.addRow(['', 'Bill of Materials', '', ''])
  bomHeader.font = headerFont
  bomHeader.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    if (colNumber >= 2 && colNumber <= 4) {
      cell.border = { bottom: thinBorder }
    }
  })

  const spHdr = ws.addRow(['', 'SPARQ Products'])
  spHdr.font = headerFont
  ws.addRow(['', 'Part ID', 'Item', 'Qty']).font = headerFont
  sparq.forEach((r) => {
    ws.addRow(['', r.sku, NAME_MAP[r.sku] ?? r.label, r.qty])
  })

  ws.addRow([])
  const thHdr = ws.addRow(['', 'Third-Party Products'])
  thHdr.font = headerFont
  ws.addRow(['', 'Part ID', 'Item', 'Qty']).font = headerFont
  third.forEach((r) => {
    // Solar panels: show panel specs as Part ID (same as on-page BoM table)
    if (r.sku === 'SOLAR-PANEL') {
      const specs = `${input.Ppanel}W, ${input.Vpanel}V, ${input.Iscpanel}A`
      ws.addRow(['', specs, 'Solar Panel', r.qty])
      return
    }
    ws.addRow(['', r.sku, NAME_MAP[r.sku] ?? r.label, r.qty])
  })

  ws.eachRow((row) => {
    row.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
      }
    })
  })

  ws.columns.forEach((col, idx) => {
    if (idx === 0) {
      col.width = 2
    } else {
      let max = 10
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(col as any).eachCell?.({ includeEmpty: true }, (cell: { value?: unknown }) => {
        const txt = (cell.value ?? '').toString()
        max = Math.max(max, txt.length)
      })
      col.width = max + 2
    }
  })

  const arrayBuffer = await wb.xlsx.writeBuffer()
  return Buffer.from(arrayBuffer)
}
