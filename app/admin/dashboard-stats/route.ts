import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Get various statistics
    const [
      totalClients,
      totalProjects,
      totalInquiries,
      totalBlogPosts,
      recentInquiries,
      recentProjects
    ] = await Promise.all([
      query('SELECT COUNT(*) as count FROM clients WHERE status = $1', ['active']),
      query('SELECT COUNT(*) as count FROM projects'),
      query('SELECT COUNT(*) as count FROM inquiries WHERE status = $1', ['new']),
      query('SELECT COUNT(*) as count FROM blog_posts WHERE is_published = true'),
      query(`
        SELECT name, email, company, service_interest, created_at 
        FROM inquiries 
        ORDER BY created_at DESC 
        LIMIT 5
      `),
      query(`
        SELECT p.title, p.created_at, c.name as client_name 
        FROM projects p 
        LEFT JOIN clients c ON p.client_id = c.id 
        ORDER BY p.created_at DESC 
        LIMIT 5
      `)
    ])

    // Get monthly inquiry trends (last 6 months)
    const monthlyTrends = await query(`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as count
      FROM inquiries 
      WHERE created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month ASC
    `)

    // Get service performance
    const servicePerformance = await query(`
      SELECT 
        s.title as service_name,
        COUNT(i.id) as inquiry_count
      FROM services s
      LEFT JOIN inquiries i ON i.service_interest ILIKE '%' || s.title || '%'
      GROUP BY s.id, s.title
      ORDER BY inquiry_count DESC
    `)

    return NextResponse.json({
      stats: {
        totalClients: parseInt(totalClients.rows[0].count),
        totalProjects: parseInt(totalProjects.rows[0].count),
        totalInquiries: parseInt(totalInquiries.rows[0].count),
        totalBlogPosts: parseInt(totalBlogPosts.rows[0].count)
      },
      recentInquiries: recentInquiries.rows,
      recentProjects: recentProjects.rows,
      monthlyTrends: monthlyTrends.rows,
      servicePerformance: servicePerformance.rows
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}









