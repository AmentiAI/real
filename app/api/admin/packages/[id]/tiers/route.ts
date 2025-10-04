import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const packageId = params.id

    const dbClient = await pool.connect()

    try {
      const result = await dbClient.query(
        `SELECT pt.*, p.name as package_name
         FROM package_tiers pt
         JOIN packages p ON pt.package_id = p.id
         WHERE pt.package_id = $1
         ORDER BY pt.tier_level ASC`,
        [packageId]
      )

      return NextResponse.json({
        success: true,
        data: result.rows
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error fetching package tiers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const packageId = params.id
    const body = await request.json()
    
    const {
      tier_name,
      tier_description,
      price,
      currency = 'USD',
      billing_period = 'monthly',
      features = [],
      is_popular = false,
      is_active = true,
      display_order = 0,
      tier_level
    } = body

    const dbClient = await pool.connect()

    try {
      const result = await dbClient.query(
        `INSERT INTO package_tiers (
          package_id, tier_name, tier_description, price, currency, 
          billing_period, features, is_popular, is_active, display_order, tier_level
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
        [
          packageId, tier_name, tier_description, price, currency,
          billing_period, features, is_popular, is_active, display_order, tier_level
        ]
      )

      return NextResponse.json({
        success: true,
        data: result.rows[0]
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error creating package tier:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



