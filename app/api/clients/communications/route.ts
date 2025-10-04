import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { verifyClientToken } from '@/lib/client-auth'

export async function GET(request: NextRequest) {
  try {
    const clientPayload = verifyClientToken(request)
    if (!clientPayload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const dbClient = await pool.connect()
    
    try {
      // For now, return empty array since client_communications table doesn't exist
      // TODO: Create client_communications table or use existing inquiries table
      return NextResponse.json([])
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error fetching client communications:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
