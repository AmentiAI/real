import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const client = await pool.connect()
    
    try {
      // Get various analytics
      const [
        totalClients,
        statusBreakdown,
        industryBreakdown,
        locationBreakdown,
        monthlyGrowth,
        recentClients
      ] = await Promise.all([
        // Total clients count
        client.query('SELECT COUNT(*) as total FROM clients'),
        
        // Status breakdown
        client.query(`
          SELECT status, COUNT(*) as count 
          FROM clients 
          GROUP BY status 
          ORDER BY count DESC
        `),
        
        // Industry breakdown
        client.query(`
          SELECT industry, COUNT(*) as count 
          FROM clients 
          WHERE industry IS NOT NULL AND industry != ''
          GROUP BY industry 
          ORDER BY count DESC 
          LIMIT 10
        `),
        
        // Location breakdown
        client.query(`
          SELECT location, COUNT(*) as count 
          FROM clients 
          WHERE location IS NOT NULL AND location != ''
          GROUP BY location 
          ORDER BY count DESC 
          LIMIT 10
        `),
        
        // Monthly growth (last 12 months)
        client.query(`
          SELECT 
            DATE_TRUNC('month', created_at) as month,
            COUNT(*) as count
          FROM clients 
          WHERE created_at >= NOW() - INTERVAL '12 months'
          GROUP BY DATE_TRUNC('month', created_at)
          ORDER BY month
        `),
        
        // Recent clients (last 30 days)
        client.query(`
          SELECT id, name, company, status, created_at
          FROM clients 
          WHERE created_at >= NOW() - INTERVAL '30 days'
          ORDER BY created_at DESC
          LIMIT 10
        `)
      ])

      return NextResponse.json({
        totalClients: parseInt(totalClients.rows[0].total),
        statusBreakdown: statusBreakdown.rows,
        industryBreakdown: industryBreakdown.rows,
        locationBreakdown: locationBreakdown.rows,
        monthlyGrowth: monthlyGrowth.rows,
        recentClients: recentClients.rows
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching client analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


