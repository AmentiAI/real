import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await query(`
      SELECT 
        s.*,
        COALESCE(
          json_agg(
            json_build_object(
              'name', t.name,
              'price', t.price,
              'setupPrice', t.setup_price,
              'monthlyPrice', t.monthly_price,
              'period', t.period,
              'popular', t.popular,
              'bestFor', t.best_for,
              'features', t.features
            ) ORDER BY t.sort_order
          ) FILTER (WHERE t.id IS NOT NULL),
          '[]'::json
        ) as tiers
      FROM services s
      LEFT JOIN service_tiers t ON s.id = t.service_id
      GROUP BY s.id, s.title, s.description, s.icon, s.category, s.created_at, s.updated_at
      ORDER BY s.created_at DESC
    `)

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, icon, category, tiers } = await request.json()

    // Insert service
    const serviceResult = await query(
      'INSERT INTO services (title, description, icon, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, icon, category]
    )

    const service = serviceResult.rows[0]

    // Insert tiers
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
            tier.popular,
            tier.bestFor,
            JSON.stringify(tier.features),
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

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, title, description, icon, category, tiers } = await request.json()

    // Update service
    await query(
      'UPDATE services SET title = $1, description = $2, icon = $3, category = $4, updated_at = NOW() WHERE id = $5',
      [title, description, icon, category, id]
    )

    // Delete existing tiers
    await query('DELETE FROM service_tiers WHERE service_id = $1', [id])

    // Insert new tiers
    if (tiers && tiers.length > 0) {
      for (let i = 0; i < tiers.length; i++) {
        const tier = tiers[i]
        await query(
          `INSERT INTO service_tiers (service_id, name, price, setup_price, monthly_price, period, popular, best_for, features, sort_order) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            id,
            tier.name,
            tier.price,
            tier.setupPrice,
            tier.monthlyPrice,
            tier.period,
            tier.popular,
            tier.bestFor,
            JSON.stringify(tier.features),
            i
          ]
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

