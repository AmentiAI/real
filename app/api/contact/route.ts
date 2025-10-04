import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, message, serviceInterest } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Insert inquiry into database
    const result = await query(
      `INSERT INTO inquiries (name, email, phone, company, message, service_interest, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, email, phone || null, company || null, message, serviceInterest || null, 'new']
    )

    const inquiry = result.rows[0]

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
      inquiry 
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 10'
    )

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}