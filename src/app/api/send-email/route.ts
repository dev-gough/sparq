import { NextRequest, NextResponse } from 'next/server'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { headers } from 'next/headers'
import { logToFile } from '@/lib/fileLogger'

// HTML escape function to prevent injection attacks
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;'
  }
  return text.replace(/[&<>"'/]/g, (char) => map[char])
}

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string, ip: string): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not configured')
    return { success: false, error: 'reCAPTCHA not configured' }
  }

  if (!token) {
    return { success: false, error: 'No reCAPTCHA token provided' }
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}&remoteip=${ip}`,
    })

    const data = await response.json()

    if (!data.success) {
      return {
        success: false,
        error: `reCAPTCHA verification failed: ${data['error-codes']?.join(', ') || 'Unknown error'}`,
      }
    }

    // reCAPTCHA v3 returns a score between 0.0 and 1.0
    // 1.0 is very likely a good interaction, 0.0 is very likely a bot
    const score = data.score || 0

    // Require a minimum score of 0.5 (you can adjust this threshold)
    if (score < 0.5) {
      return {
        success: false,
        score,
        error: `reCAPTCHA score too low: ${score}`,
      }
    }

    return { success: true, score }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during verification',
    }
  }
}

// Initialize SES client
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

export async function POST(request: NextRequest) {
  try {
    // Security checks to prevent external abuse
    const headersList = await headers()
    const referer = headersList.get('referer')
    const origin = headersList.get('origin')
    const userAgent = headersList.get('user-agent')

    // Extract IP address and other identifying information
    const ip = headersList.get('x-forwarded-for') ||
               headersList.get('x-real-ip') ||
               headersList.get('cf-connecting-ip') ||
               'unknown'
    const host = headersList.get('host')
    const acceptLanguage = headersList.get('accept-language')
    const acceptEncoding = headersList.get('accept-encoding')
    const contentType = headersList.get('content-type')
    const cfRay = headersList.get('cf-ray') // Cloudflare ray ID if using Cloudflare
    const cfIpCountry = headersList.get('cf-ipcountry') // Country code if using Cloudflare

    // Check if request is coming from your domain
    const allowedOrigins = [
      'https://sparqsys.com',
      'https://www.sparqsys.com',
      ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000', 'http://localhost:8080'] : [])
    ]

    const isValidOrigin = origin && allowedOrigins.includes(origin)
    const isValidReferer = referer && allowedOrigins.some(domain => referer.startsWith(domain))

    // Parse request body early for logging
    let requestBody: Record<string, unknown> = {}
    try {
      requestBody = await request.json()
    } catch (e) {
      logToFile('INVALID_JSON', {
        ip,
        userAgent,
        referer,
        origin,
        host,
        error: e instanceof Error ? e.message : 'Unknown error'
      })
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    // Log all incoming requests with comprehensive details
    logToFile('INCOMING_REQUEST', {
      ip,
      userAgent,
      referer,
      origin,
      host,
      acceptLanguage,
      acceptEncoding,
      contentType,
      cfRay,
      cfIpCountry,
      requestBody,
      isValidOrigin,
      isValidReferer
    })

    // Reject requests that don't come from your site
    if (!isValidOrigin && !isValidReferer) {
      logToFile('BLOCKED_INVALID_ORIGIN', {
        ip,
        userAgent,
        referer,
        origin,
        host,
        cfRay,
        cfIpCountry,
        requestBody
      })
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      )
    }

    // Additional check for suspicious user agents (basic bot detection)
    if (!userAgent || userAgent.includes('curl') || userAgent.includes('wget') || userAgent.includes('python-requests')) {
      logToFile('BLOCKED_SUSPICIOUS_USER_AGENT', {
        ip,
        userAgent,
        referer,
        origin,
        host,
        cfRay,
        cfIpCountry,
        requestBody
      })
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      )
    }

    // Verify reCAPTCHA token
    const recaptchaToken = typeof requestBody.recaptchaToken === 'string' ? requestBody.recaptchaToken : ''
    const recaptchaResult = await verifyRecaptcha(recaptchaToken, ip)

    if (!recaptchaResult.success) {
      logToFile('BLOCKED_RECAPTCHA_FAILED', {
        ip,
        userAgent,
        referer,
        origin,
        host,
        cfRay,
        cfIpCountry,
        recaptchaScore: recaptchaResult.score,
        recaptchaError: recaptchaResult.error,
        requestBody: {
          category: requestBody.category,
          userEmail: requestBody.userEmail,
          subject: requestBody.subject,
        }
      })
      return NextResponse.json(
        { error: 'Security verification failed. Please try again.' },
        { status: 403 }
      )
    }

    // Log successful reCAPTCHA verification
    logToFile('RECAPTCHA_VERIFIED', {
      ip,
      userAgent,
      score: recaptchaResult.score,
    })

    const { category, supportEmail, ccEmail, subject, message, userEmail } = requestBody

    // Type validation - ensure required fields are strings
    const supportEmailStr = typeof supportEmail === 'string' ? supportEmail : ''
    const subjectStr = typeof subject === 'string' ? subject : ''
    const messageStr = typeof message === 'string' ? message : ''
    const userEmailStr = typeof userEmail === 'string' ? userEmail : ''
    const categoryStr = typeof category === 'string' ? category : 'General Support'
    const ccEmailStr = typeof ccEmail === 'string' ? ccEmail : undefined

    // Validate required fields
    if (!supportEmailStr || !subjectStr || !messageStr || !userEmailStr) {
      logToFile('VALIDATION_FAILED', {
        ip,
        userAgent,
        referer,
        origin,
        host,
        cfRay,
        cfIpCountry,
        requestBody,
        missingFields: {
          supportEmail: !supportEmail,
          subject: !subject,
          message: !message,
          userEmail: !userEmail
        }
      })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Sanitize all user inputs to prevent HTML injection
    const safeCategoryStr = escapeHtml(categoryStr)
    const safeUserEmailStr = escapeHtml(userEmailStr)
    const safeSubjectStr = escapeHtml(subjectStr)
    const safeMessageStr = escapeHtml(messageStr)

    // Create email parameters
    const emailParams = {
      Source: process.env.SES_FROM_EMAIL || 'support@sparqsys.com',
      Destination: {
        ToAddresses: [supportEmailStr],
        ...(ccEmailStr ? { CcAddresses: [ccEmailStr] } : {}),
      },
      Message: {
        Subject: {
          Data: `Support Ticket: ${safeSubjectStr}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <h2 style="color: #8B1538;">New Support Ticket</h2>
                  <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #8B1538; margin: 20px 0;">
                    <p><strong>Category:</strong> ${safeCategoryStr}</p>
                    <p><strong>From:</strong> ${safeUserEmailStr}</p>
                    <p><strong>Subject:</strong> ${safeSubjectStr}</p>
                  </div>
                  <div style="margin: 20px 0;">
                    <h3 style="color: #8B1538;">Message:</h3>
                    <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${safeMessageStr}</p>
                  </div>
                  <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                  <p style="font-size: 12px; color: #666;">
                    This email was sent from the Sparq Systems support form at sparqsys.com/support
                  </p>
                </body>
              </html>
            `,
            Charset: 'UTF-8',
          },
          Text: {
            Data: `
New Support Ticket

Category: ${categoryStr}
From: ${userEmailStr}
Subject: ${subjectStr}

Message:
${messageStr}

---
This email was sent from the Sparq Systems support form at sparqsys.com/support
            `,
            Charset: 'UTF-8',
          },
        },
      },
      ReplyToAddresses: [userEmailStr],
    }

    // Send the email
    const command = new SendEmailCommand(emailParams)
    const response = await sesClient.send(command)

    // Log successful email send
    logToFile('EMAIL_SENT_SUCCESS', {
      ip,
      userAgent,
      referer,
      origin,
      host,
      cfRay,
      cfIpCountry,
      messageId: response.MessageId,
      category: categoryStr,
      userEmail: userEmailStr,
      subject: subjectStr,
      messageLength: messageStr.length
    })

    return NextResponse.json({
      success: true,
      messageId: response.MessageId,
      message: 'Email sent successfully'
    })

  } catch (error) {
    // Enhanced error logging with request context
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined

    // Try to access request context even in error state
    let errorLogData: Record<string, unknown> = {
      errorMessage,
      errorStack,
      errorType: error instanceof Error ? error.constructor.name : typeof error
    }

    // Try to add request context if available
    try {
      const headersList = await headers()
      errorLogData = {
        ...errorLogData,
        ip: headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown',
        userAgent: headersList.get('user-agent'),
        referer: headersList.get('referer'),
        origin: headersList.get('origin'),
        host: headersList.get('host')
      }
    } catch {
      // If we can't get headers, continue without them
    }

    logToFile('EMAIL_SEND_ERROR', errorLogData)

    // Return different error messages based on the error type
    if (error instanceof Error) {
      if (error.message.includes('MessageRejected')) {
        return NextResponse.json(
          { error: 'Email was rejected. Please check recipient address.' },
          { status: 400 }
        )
      }
      if (error.message.includes('InvalidParameterValue')) {
        return NextResponse.json(
          { error: 'Invalid email parameters provided.' },
          { status: 400 }
        )
      }
      if (error.message.includes('credentials')) {
        return NextResponse.json(
          { error: 'AWS credentials not configured properly.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}