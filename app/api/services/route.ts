import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
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
      ORDER BY s.created_at ASC
    `)

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
