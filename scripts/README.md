# Log Decryption Scripts

## decrypt-logs.js

Decrypt encrypted log files created by the send-email API endpoint.

### Setup

1. **Generate an encryption key** (do this once):
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Add the key to your production environment** (`.env.production` on EC2):
   ```bash
   LOG_ENCRYPTION_KEY=your_generated_key_here
   ```

3. **Make sure the key is backed up securely** - without it, you can't decrypt logs!

### Usage

**Decrypt a log file:**
```bash
node scripts/decrypt-logs.js logs/send-email-2025-11-13.log
```

**Search for specific events:**
```bash
# Find all blocked requests
node scripts/decrypt-logs.js logs/send-email-2025-11-13.log | grep BLOCKED

# Find requests from specific IP
node scripts/decrypt-logs.js logs/send-email-2025-11-13.log | grep "1.2.3.4"

# Count bot attempts
node scripts/decrypt-logs.js logs/send-email-*.log | grep BLOCKED | wc -l
```

**Use with custom encryption key:**
```bash
LOG_ENCRYPTION_KEY=your_key node scripts/decrypt-logs.js logs/send-email-2025-11-13.log
```

### Notes

- The script automatically loads encryption keys from `.env.production`, `.env.local`, or `.env`
- Each log entry is encrypted separately with its own IV and auth tag
- If encryption key is not set during logging, logs are stored as plaintext
- Encrypted format: `<encrypted_data>:<iv>:<auth_tag>` (all in hex)
