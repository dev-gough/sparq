import { appendFileSync, existsSync, mkdirSync, readdirSync, unlinkSync, statSync } from 'fs'
import { join } from 'path'
import { createCipheriv, randomBytes } from 'crypto'

// Log directory - configurable via environment variable
// Defaults to ./logs relative to project root
const LOG_DIR =
  process.env.LOG_DIR || join(/*turbopackIgnore: true*/ process.cwd(), 'logs')
const MAX_LOG_FILES = 6
const ENCRYPTION_KEY = process.env.LOG_ENCRYPTION_KEY

// Validate encryption key exists and is correct length (32 bytes = 64 hex chars)
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
  console.error('WARNING: LOG_ENCRYPTION_KEY not set or invalid length. Logs will not be encrypted!')
  console.error('Generate a key with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"')
}

// Ensure log directory exists and clean up old logs
function ensureLogDir() {
  if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR, { recursive: true })
    return
  }

  // Get all log files
  const files = readdirSync(LOG_DIR)
    .filter(file => file.startsWith('send-email-') && file.endsWith('.log'))
    .map(file => ({
      name: file,
      path: join(LOG_DIR, file),
      time: statSync(join(LOG_DIR, file)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time) // Sort by modification time, newest first

  // If more than MAX_LOG_FILES, delete the oldest ones
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

// Get log file path for today
function getLogFilePath(): string {
  const date = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  return join(LOG_DIR, `send-email-${date}.log`)
}

// Encrypt a log entry using AES-256-GCM
// Returns format: <encrypted_data>:<iv>:<auth_tag> (all in hex)
function encryptLogEntry(data: string): string {
  if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
    // If no valid key, return plaintext (fallback for dev)
    return data
  }

  try {
    const iv = randomBytes(16)
    const key = Buffer.from(ENCRYPTION_KEY, 'hex')
    const cipher = createCipheriv('aes-256-gcm', key, iv)

    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    const authTag = cipher.getAuthTag()

    // Format: encrypted:iv:authTag (all hex)
    return `${encrypted}:${iv.toString('hex')}:${authTag.toString('hex')}`
  } catch (error) {
    console.error('Failed to encrypt log entry:', error)
    // In case of encryption failure, return a safe placeholder
    return 'ENCRYPTION_FAILED'
  }
}

// Write log entry to file
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
    // Fallback to console if file logging fails
    console.error('Failed to write to log file:', error)
    console.log(JSON.stringify({ timestamp: new Date().toISOString(), context, ...data }))
  }
}
