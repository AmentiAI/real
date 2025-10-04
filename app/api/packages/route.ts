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
