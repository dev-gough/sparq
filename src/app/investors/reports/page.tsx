import sedarData from '@/data/sedar-documents.json'
import ReportsClient, { type DocumentData } from './ReportsClient'

/**
 * Server page: documents are imported at build time (no client fetch waterfall).
 * Interactive filters live in ReportsClient. /api/sedar-documents is kept for ops
 * until external consumers are confirmed gone.
 */
export default function ReportsPage() {
  const documents = (sedarData.documents ?? []) as DocumentData[]

  return <ReportsClient documents={documents} />
}
