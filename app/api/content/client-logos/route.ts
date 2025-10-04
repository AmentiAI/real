import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM client_logos WHERE is_active = true ORDER BY order_index ASC'
    )
    
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching client logos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch client logos' },
      { status: 500 }
    )
  }
}

