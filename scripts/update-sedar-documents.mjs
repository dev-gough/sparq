#!/usr/bin/env node
/**
 * Validate / sort SEDAR documents JSON (no scraping).
 *
 * Usage:
 *   node scripts/update-sedar-documents.mjs
 *   node scripts/update-sedar-documents.mjs --write   # rewrite sorted file
 *   node scripts/update-sedar-documents.mjs --check   # exit 1 on errors
 *
 * Schema: id, title, type, year, publishDate, url, description, key?
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DATA_PATH = resolve(ROOT, 'src/data/sedar-documents.json')

const REQUIRED = ['id', 'title', 'type', 'year', 'publishDate', 'url', 'description']
const TYPES = new Set([
  'press-release',
  'quarterly-report',
  'annual-report',
  'financial-reports',
])

function parseArgs(argv) {
  return {
    write: argv.includes('--write'),
    check: argv.includes('--check') || !argv.includes('--write'),
  }
}

function main() {
  const args = parseArgs(process.argv)
  const raw = readFileSync(DATA_PATH, 'utf8')
  const data = JSON.parse(raw)
  const docs = data.documents

  if (!Array.isArray(docs)) {
    console.error('documents must be an array')
    process.exit(1)
  }

  const errors = []
  const ids = new Set()

  docs.forEach((doc, i) => {
    const loc = `documents[${i}]`
    for (const k of REQUIRED) {
      // description may be empty string in hand-maintained data; still require the field
      if (doc[k] === undefined || doc[k] === null) {
        errors.push(`${loc}: missing ${k}`)
      } else if (k !== 'description' && doc[k] === '') {
        errors.push(`${loc}: empty ${k}`)
      }
    }
    if (doc.id && ids.has(doc.id)) errors.push(`${loc}: duplicate id ${doc.id}`)
    if (doc.id) ids.add(doc.id)
    if (doc.type && !TYPES.has(doc.type)) {
      errors.push(`${loc}: unexpected type "${doc.type}"`)
    }
    if (doc.year != null && (typeof doc.year !== 'number' || doc.year < 2000)) {
      errors.push(`${loc}: invalid year ${doc.year}`)
    }
    if (doc.publishDate && !/^\d{4}-\d{2}-\d{2}$/.test(doc.publishDate)) {
      errors.push(`${loc}: publishDate should be YYYY-MM-DD (got ${doc.publishDate})`)
    }
    if (doc.key != null && typeof doc.key !== 'boolean') {
      errors.push(`${loc}: key must be boolean if present`)
    }
  })

  const sorted = [...docs].sort((a, b) => {
    const da = a.publishDate || ''
    const db = b.publishDate || ''
    return db.localeCompare(da)
  })

  const keyCount = docs.filter((d) => d.key === true).length
  const byYear = docs.reduce((acc, d) => {
    acc[d.year] = (acc[d.year] || 0) + 1
    return acc
  }, {})

  console.log(
    JSON.stringify(
      {
        path: DATA_PATH,
        count: docs.length,
        keyDocuments: keyCount,
        byYear,
        errors: errors.length,
        sortedMatchesFile: JSON.stringify(docs) === JSON.stringify(sorted),
      },
      null,
      2
    )
  )

  if (errors.length) {
    console.error('\nValidation errors:')
    errors.forEach((e) => console.error(' -', e))
    if (args.check) process.exit(1)
  }

  if (args.write) {
    const out = { documents: sorted }
    writeFileSync(DATA_PATH, JSON.stringify(out, null, 2) + '\n')
    console.error(`\nWrote sorted documents to ${DATA_PATH}`)
  } else if (!errors.length) {
    console.error('\nOK — run with --write to rewrite sorted newest-first.')
  }
}

main()
