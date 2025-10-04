import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query('SELECT * FROM branding_settings LIMIT 1')
    return NextResponse.json(result.rows[0] || null)
  } catch (error) {
    console.error('Error fetching branding:', error)
    return NextResponse.json({ error: 'Failed to fetch branding' }, { status: 500 })
  }
}



