import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query('SELECT COUNT(*) as count FROM blog_posts')
    return NextResponse.json({ 
      success: true, 
      count: result.rows[0].count,
      message: 'Database connection working'
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
