import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const client = await pool.connect()
    
    try {
      const result = await client.query(`
        SELECT id, name, email, phone, company, website, industry, location, status, created_at
        FROM clients 
        ORDER BY created_at DESC
      `)
      
      return NextResponse.json(result.rows)
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, website, industry, location, status } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    
    try {
      const result = await client.query(
        `INSERT INTO clients (name, email, phone, company, website, industry, location, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [name, email, phone || null, company || null, website || null, industry || null, location || null, status || 'active']
      )

      const clientId = result.rows[0].id

      return NextResponse.json(
        { 
          success: true, 
          message: 'Client created successfully',
          id: clientId 
        },
        { status: 201 }
      )
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
