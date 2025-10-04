import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// Query helper function
async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export async function GET() {
  try {
    const result = await query(`
      SELECT id, name, description, price, currency, billing_period, 
             features, is_popular, is_active, display_order, 
             created_at, updated_at
      FROM packages 
      ORDER BY display_order ASC, created_at DESC
    `)
    
    return NextResponse.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      price,
      currency = 'USD',
      billing_period = 'monthly',
      features = [],
      is_popular = false,
      is_active = true,
      display_order = 0
    } = body

    // Validate required fields
    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      )
    }

    const result = await query(`
      INSERT INTO packages (name, description, price, currency, billing_period, 
                          features, is_popular, is_active, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [name, description, price, currency, billing_period, features, is_popular, is_active, display_order])

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating package:', error)
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    )
  }
}




