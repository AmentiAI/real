import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Get all active packages and tiers as a flat list
    const result = await query(`
      SELECT 
        p.id,
        p.name as service_name,
        p.description as service_description,
        pt.id as package_id,
        pt.tier_name as name,
        pt.tier_description as description,
        pt.price,
        pt.currency,
        pt.billing_period,
        pt.features,
        pt.is_popular,
        pt.is_active,
        pt.display_order,
        pt.tier_level,
        pt.created_at,
        pt.updated_at
      FROM packages p
      LEFT JOIN package_tiers pt ON p.id = pt.package_id AND pt.is_active = true
      WHERE p.is_active = true
      ORDER BY p.display_order ASC, pt.display_order ASC, pt.tier_level ASC
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
    const { 
      package_id,
      service_name,
      name,
      description,
      price,
      currency,
      billing_period,
      features,
      is_popular,
      is_active,
      display_order
    } = await request.json()

    let packageId = package_id

    // If no package_id provided, try to find or create by service_name
    if (!packageId && service_name) {
      let packageResult = await query(`
        SELECT id FROM packages WHERE name = $1
      `, [service_name])

      if (packageResult.rows.length === 0) {
        // Create new package (service) with default price
        packageResult = await query(`
          INSERT INTO packages (name, description, price, is_active, display_order)
          VALUES ($1, $2, $3, true, 1)
          RETURNING id
        `, [service_name, description, 0])
        packageId = packageResult.rows[0].id
      } else {
        packageId = packageResult.rows[0].id
      }
    }

    if (!packageId) {
      return NextResponse.json(
        { error: 'package_id or service_name is required' },
        { status: 400 }
      )
    }

    // Get the next tier_level for this package
    const tierLevelResult = await query(`
      SELECT COALESCE(MAX(tier_level), 0) + 1 as next_tier_level
      FROM package_tiers
      WHERE package_id = $1
    `, [packageId])
    const nextTierLevel = tierLevelResult.rows[0].next_tier_level

    // Create the pricing tier
    const result = await query(`
      INSERT INTO package_tiers (
        package_id,
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
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [
      packageId,
      name,
      description,
      price,
      currency || 'USD',
      billing_period || 'monthly',
      features || [],
      is_popular || false,
      is_active !== false,
      display_order || nextTierLevel,
      nextTierLevel
    ])

    return NextResponse.json({
      success: true,
      message: 'Pricing tier added successfully',
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error adding pricing tier:', error)
    return NextResponse.json(
      { error: 'Failed to add pricing tier' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { 
      id,
      name,
      description,
      price,
      currency,
      billing_period,
      features,
      is_popular,
      is_active,
      display_order
    } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Tier ID is required' },
        { status: 400 }
      )
    }

    const result = await query(`
      UPDATE package_tiers
      SET 
        tier_name = $1,
        tier_description = $2,
        price = $3,
        currency = $4,
        billing_period = $5,
        features = $6,
        is_popular = $7,
        is_active = $8,
        display_order = $9,
        updated_at = NOW()
      WHERE id = $10
      RETURNING *
    `, [
      name,
      description,
      price,
      currency,
      billing_period,
      features || [],
      is_popular,
      is_active,
      display_order,
      id
    ])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Pricing tier not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Pricing tier updated successfully',
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error updating pricing tier:', error)
    return NextResponse.json(
      { error: 'Failed to update pricing tier' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Tier ID is required' },
        { status: 400 }
      )
    }

    // Soft delete by setting is_active to false
    const result = await query(`
      UPDATE package_tiers
      SET is_active = false, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `, [id])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Pricing tier not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Pricing tier deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting pricing tier:', error)
    return NextResponse.json(
      { error: 'Failed to delete pricing tier' },
      { status: 500 }
    )
  }
}