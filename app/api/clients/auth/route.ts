import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Find client by email
    const result = await query(
      'SELECT id, name, email, company, website, password FROM clients WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const client = result.rows[0]

    // Check password
    const isValidPassword = await bcrypt.compare(password, client.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        clientId: client.id, 
        email: client.email,
        type: 'client'
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    // Return complete client data (without password)
    const clientData = {
      id: client.id,
      name: client.name,
      email: client.email,
      company: client.company,
      website: client.website,
      phone: client.phone,
      industry: client.industry,
      location: client.location,
      status: client.status,
      website_status: client.website_status,
      seo_status: client.seo_status,
      join_date: client.join_date
    }

    return NextResponse.json({
      success: true,
      token,
      client: clientData
    })
  } catch (error) {
    console.error('Client authentication error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
