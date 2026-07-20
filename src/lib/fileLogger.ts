import { appendFileSync, existsSync, mkdirSync, readdirSync, unlinkSync, statSync } from 'fs'
import { join } from 'path'
import { createCipheriv, randomBytes } from 'crypto'
import { getLogDir } from '@/lib/logDir'

const MAX_LOG_FILES = 6
const ENCRYPTION_KEY = process.env.LOG_ENCRYPTION_KEY

// Validate encryption key exists and is correct length (32 bytes = 64 hex chars)
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
  console.error('WARNING: LOG_ENCRYPTION_KEY not set or invalid length. Logs will not be encrypted!')
  console.error('Generate a key with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"')
}

function ensureLogDir() {
  const logDir = getLogDir()
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true })
    return
  }

  const files = readdirSync(logDir)
    .filter(file => file.startsWith('send-email-') && file.endsWith('.log'))
    .map(file => ({
      name: file,
      path: join(logDir, file),
      time: statSync(join(logDir, file)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time)

  if (files.length > MAX_LOG_FILES) {
    const filesToDelete = files.slice(MAX_LOG_FILES)
    filesToDelete.forEach(file => {
      try {
        unlinkSync(file.path)
      } catch (error) {
        console.error(`Failed to delete old log file ${file.name}:`, error)
      }
    })
  }
}

function getLogFilePath(): string {
  const date = new Date().toISOString().split('T')[0]
  return join(getLogDir(), `send-email-${date}.log`)
}

function encryptLogEntry(data: string): string {
  if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
    return data
  }

  try {
    const iv = randomBytes(16)
    const key = Buffer.from(ENCRYPTION_KEY, 'hex')
    const cipher = createCipheriv('aes-256-gcm', key, iv)

    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    const authTag = cipher.getAuthTag()

    return `${encrypted}:${iv.toString('hex')}:${authTag.toString('hex')}`
  } catch (error) {
    console.error('Failed to encrypt log entry:', error)
    return 'ENCRYPTION_FAILED'
  }
}

/** Write a send-email log line (optionally encrypted). */
export function logToFile(context: string, data: Record<string, unknown>) {
  try {
    ensureLogDir()

    const logEntry = {
      timestamp: new Date().toISOString(),
      context,
      ...data
    }

    const logJson = JSON.stringify(logEntry)
    const encryptedLog = encryptLogEntry(logJson)
    const logLine = encryptedLog + '\n'
    const logFile = getLogFilePath()

    appendFileSync(logFile, logLine, 'utf-8')
  } catch (error) {
    console.error('Failed to write to log file:', error)
    console.log(JSON.stringify({ timestamp: new Date().toISOString(), context, ...data }))
  }
}
