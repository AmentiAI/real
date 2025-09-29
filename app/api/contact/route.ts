import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Insert inquiry into database
    const client = await pool.connect()
    try {
      const result = await client.query(
        `INSERT INTO inquiries (name, email, phone, company, message, service_interest, status)
         VALUES ($1, $2, $3, $4, $5, $6, 'new')
         RETURNING id`,
        [name, email, phone || null, company || null, message, service || null]
      )

      const inquiryId = result.rows[0].id

      // Here you could also send an email notification
      // await sendEmailNotification({ name, email, company, service, message })

      return NextResponse.json(
        { 
          success: true, 
          message: 'Inquiry submitted successfully',
          id: inquiryId 
        },
        { status: 201 }
      )
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

