import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const client = await pool.connect()
    
    try {
      // Get total clients
      const clientsResult = await client.query('SELECT COUNT(*) as count FROM clients WHERE status = $1', ['active'])
      const totalClients = parseInt(clientsResult.rows[0].count)

      // Get active projects
      const projectsResult = await client.query('SELECT COUNT(*) as count FROM projects WHERE created_at > NOW() - INTERVAL \'30 days\'')
      const activeProjects = parseInt(projectsResult.rows[0].count)

      // Get new inquiries (last 30 days)
      const inquiriesResult = await client.query('SELECT COUNT(*) as count FROM inquiries WHERE created_at > NOW() - INTERVAL \'30 days\'')
      const newInquiries = parseInt(inquiriesResult.rows[0].count)

      // Get monthly revenue from actual data
      const revenueResult = await client.query(`
        SELECT COALESCE(SUM(CAST(REPLACE(REPLACE(price, '$', ''), ',', '') AS DECIMAL)), 0) as revenue 
        FROM service_tiers st
        JOIN projects p ON p.services_used::text LIKE '%' || st.service_id || '%'
        WHERE p.created_at > NOW() - INTERVAL '30 days'
      `)
      const monthlyRevenue = parseFloat(revenueResult.rows[0].revenue) || 0

      // Get conversion rate from actual data
      const conversionResult = await client.query(`
        SELECT 
          CASE 
            WHEN COUNT(*) > 0 THEN 
              (COUNT(CASE WHEN status = 'active' THEN 1 END)::float / COUNT(*)::float * 100)
            ELSE 0 
          END as conversion_rate
        FROM inquiries 
        WHERE created_at > NOW() - INTERVAL '30 days'
      `)
      const conversionRate = parseFloat(conversionResult.rows[0].conversion_rate) || 0

      // Get average response time in hours (placeholder - would need to track response times)
      const avgResponseTime = 0

      const stats = {
        totalClients,
        activeProjects,
        newInquiries,
        monthlyRevenue,
        conversionRate,
        avgResponseTime
      }

      return NextResponse.json(stats)
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
