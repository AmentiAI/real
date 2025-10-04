import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Simple query to get services
    const result = await query(`
      SELECT id, title, description, icon, category, created_at, updated_at, order_index
      FROM services
      ORDER BY order_index ASC, created_at DESC
    `)

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, icon, category, tiers } = await request.json()

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    // Insert service
    const serviceResult = await query(
      'INSERT INTO services (title, description, icon, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, icon || null, category || null]
    )

    const service = serviceResult.rows[0]

    // Insert tiers if provided
    if (tiers && tiers.length > 0) {
      for (let i = 0; i < tiers.length; i++) {
        const tier = tiers[i]
        await query(
          `INSERT INTO service_tiers (service_id, name, price, setup_price, monthly_price, period, popular, best_for, features, sort_order) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            service.id,
            tier.name,
            tier.price,
            tier.setupPrice,
            tier.monthlyPrice,
            tier.period,
            tier.popular || false,
            tier.bestFor,
            JSON.stringify(tier.features || []),
            i
          ]
        )
      }
    }

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}