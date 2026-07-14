#!/usr/bin/env node

/**
 * Decrypt log files created by src/lib/fileLogger.ts
 *
 * Usage:
 *   node scripts/decrypt-logs.js logs/send-email-2025-11-13.log
 *
 *   # With custom encryption key (if not in .env)
 *   LOG_ENCRYPTION_KEY=your_key node scripts/decrypt-logs.js logs/send-email-2025-11-13.log
 *
 *   # Grep for specific context
 *   node scripts/decrypt-logs.js logs/send-email-2025-11-13.log | grep BLOCKED
 */

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Load environment variables from .env files
function loadEnv() {
  const envFiles = ['.env.production', '.env.local', '.env'];

  for (const envFile of envFiles) {
    const envPath = path.join(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const lines = envContent.split('\n');

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          const value = valueParts.join('=').trim();
          if (key && value && !process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    }
  }
}

// Decrypt a single log entry
function decryptLogEntry(encryptedLine, encryptionKey) {
  try {
    const parts = encryptedLine.trim().split(':');

    // If it doesn't look encrypted (no colons), assume plaintext
    if (parts.length !== 3) {
      return encryptedLine;
    }

    const [encrypted, ivHex, authTagHex] = parts;

    const key = Buffer.from(encryptionKey, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    return `[DECRYPTION_FAILED: ${error.message}]`;
  }
}

// Main function
function main() {
  loadEnv();

  const encryptionKey = process.env.LOG_ENCRYPTION_KEY;

  if (!encryptionKey || encryptionKey.length !== 64) {
    console.error('ERROR: LOG_ENCRYPTION_KEY not found or invalid length');
    console.error('Make sure it is set in .env.production, .env.local, or .env');
    console.error('Or pass it as: LOG_ENCRYPTION_KEY=your_key node scripts/decrypt-logs.js <file>');
    process.exit(1);
  }

  const logFile = process.argv[2];

  if (!logFile) {
    console.error('Usage: node scripts/decrypt-logs.js <log-file-path>');
    console.error('Example: node scripts/decrypt-logs.js logs/send-email-2025-11-13.log');
    process.exit(1);
  }

  if (!fs.existsSync(logFile)) {
    console.error(`ERROR: File not found: ${logFile}`);
    process.exit(1);
  }

  const content = fs.readFileSync(logFile, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  console.log(`Decrypting ${lines.length} log entries from ${logFile}...\n`);

  lines.forEach((line, index) => {
    const decrypted = decryptLogEntry(line, encryptionKey);

    // Try to pretty-print JSON
    try {
      const json = JSON.parse(decrypted);
      console.log(JSON.stringify(json, null, 2));
    } catch {
      // If not valid JSON, just print the decrypted text
      console.log(decrypted);
    }

    // Add separator between entries for readability
    if (index < lines.length - 1) {
      console.log('\n---\n');
    }
  });
}

main();
