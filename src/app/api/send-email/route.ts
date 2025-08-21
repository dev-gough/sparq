import { NextRequest, NextResponse } from 'next/server'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

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
    const { category, supportEmail, ccEmail, subject, message, userEmail } = await request.json()

    // Validate required fields
    if (!supportEmail || !subject || !message || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create email parameters
    const emailParams = {
      Source: process.env.SES_FROM_EMAIL || 'support@sparqsys.com',
      Destination: {
        ToAddresses: [supportEmail],
        ...(ccEmail && { CcAddresses: [ccEmail] }),
      },
      Message: {
        Subject: {
          Data: `Support Ticket: ${subject}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <h2 style="color: #8B1538;">New Support Ticket</h2>
                  <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #8B1538; margin: 20px 0;">
                    <p><strong>Category:</strong> ${category || 'General Support'}</p>
                    <p><strong>From:</strong> ${userEmail}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                  </div>
                  <div style="margin: 20px 0;">
                    <h3 style="color: #8B1538;">Message:</h3>
                    <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
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

Category: ${category || 'General Support'}
From: ${userEmail}
Subject: ${subject}

Message:
${message}

---
This email was sent from the Sparq Systems support form at sparqsys.com/support
            `,
            Charset: 'UTF-8',
          },
        },
      },
      ReplyToAddresses: [userEmail],
    }

    // Send the email
    const command = new SendEmailCommand(emailParams)
    const response = await sesClient.send(command)

    return NextResponse.json({
      success: true,
      messageId: response.MessageId,
      message: 'Email sent successfully'
    })

  } catch (error) {
    console.error('SES Email Error:', error)
    
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