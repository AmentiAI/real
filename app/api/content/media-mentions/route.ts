import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM media_mentions WHERE is_active = true ORDER BY order_index ASC'
    )
    
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching media mentions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media mentions' },
      { status: 500 }
    )
  }
}

