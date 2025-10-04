import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string, tierId: string } }
) {
  try {
    const packageId = params.id
    const tierId = params.tierId

    const dbClient = await pool.connect()

    try {
      const result = await dbClient.query(
        `SELECT pt.*, p.name as package_name
         FROM package_tiers pt
         JOIN packages p ON pt.package_id = p.id
         WHERE pt.package_id = $1 AND pt.id = $2`,
        [packageId, tierId]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Package tier not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: result.rows[0]
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error fetching package tier:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string, tierId: string } }
) {
  try {
    const packageId = params.id
    const tierId = params.tierId
    const body = await request.json()
    
    const {
      tier_name,
      tier_description,
      price,
      currency,
      billing_period,
      features,
      is_popular,
      is_active,
      display_order,
      tier_level
    } = body

    const dbClient = await pool.connect()

    try {
      const result = await dbClient.query(
        `UPDATE package_tiers SET
          tier_name = COALESCE($1, tier_name),
          tier_description = COALESCE($2, tier_description),
          price = COALESCE($3, price),
          currency = COALESCE($4, currency),
          billing_period = COALESCE($5, billing_period),
          features = COALESCE($6, features),
          is_popular = COALESCE($7, is_popular),
          is_active = COALESCE($8, is_active),
          display_order = COALESCE($9, display_order),
          tier_level = COALESCE($10, tier_level),
          updated_at = CURRENT_TIMESTAMP
        WHERE package_id = $11 AND id = $12
        RETURNING *`,
        [
          tier_name, tier_description, price, currency, billing_period,
          features, is_popular, is_active, display_order, tier_level,
          packageId, tierId
        ]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Package tier not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: result.rows[0]
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error updating package tier:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string, tierId: string } }
) {
  try {
    const packageId = params.id
    const tierId = params.tierId

    const dbClient = await pool.connect()

    try {
      const result = await dbClient.query(
        `DELETE FROM package_tiers 
         WHERE package_id = $1 AND id = $2`,
        [packageId, tierId]
      )

      if (result.rowCount === 0) {
        return NextResponse.json(
          { error: 'Package tier not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Package tier deleted successfully'
      })
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error deleting package tier:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



