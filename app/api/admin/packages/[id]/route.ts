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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const packageId = params.id

    const result = await query(`
      SELECT id, name, description, price, currency, billing_period, 
             features, is_popular, is_active, display_order, 
             created_at, updated_at
      FROM packages 
      WHERE id = $1
    `, [packageId])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching package:', error)
    return NextResponse.json(
      { error: 'Failed to fetch package' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const packageId = params.id
    const body = await request.json()
    const {
      name,
      description,
      price,
      currency,
      billing_period,
      features,
      is_popular,
      is_active,
      display_order
    } = body

    // Get existing package data
    const existingResult = await query(`
      SELECT * FROM packages WHERE id = $1
    `, [packageId])

    if (existingResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    const existing = existingResult.rows[0]

    // Update package
    const result = await query(`
      UPDATE packages 
      SET name = COALESCE($1, name),
          description = COALESCE($2, description),
          price = COALESCE($3, price),
          currency = COALESCE($4, currency),
          billing_period = COALESCE($5, billing_period),
          features = COALESCE($6, features),
          is_popular = COALESCE($7, is_popular),
          is_active = COALESCE($8, is_active),
          display_order = COALESCE($9, display_order),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
      RETURNING *
    `, [name, description, price, currency, billing_period, features, is_popular, is_active, display_order, packageId])

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error updating package:', error)
    return NextResponse.json(
      { error: 'Failed to update package' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const packageId = params.id

    const result = await query(`
      DELETE FROM packages WHERE id = $1
    `, [packageId])

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Package deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting package:', error)
    return NextResponse.json(
      { error: 'Failed to delete package' },
      { status: 500 }
    )
  }
}




