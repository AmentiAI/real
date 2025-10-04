import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM key_outcomes WHERE is_active = true ORDER BY order_index ASC'
    )
    
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching key outcomes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch key outcomes' },
      { status: 500 }
    )
  }
}

