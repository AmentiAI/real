import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Get various statistics
    const [
      totalClients,
      activeClients,
      totalProjects,
      totalInquiries,
      totalBlogPosts,
      recentInquiries,
      recentProjects,
      revenueStats,
      debugPayments
    ] = await Promise.all([
      query('SELECT COUNT(*) as count FROM clients'),
      query('SELECT COUNT(*) as count FROM clients WHERE status = $1', ['active']),
      query(`
        SELECT (
          (SELECT COUNT(*) FROM clients 
           WHERE website_status IS NOT NULL AND website_status != '' AND website_status != 'completed') +
          (SELECT COUNT(*) FROM clients 
           WHERE seo_status IS NOT NULL AND seo_status != '' AND seo_status != 'completed')
        ) as count
      `),
      query('SELECT COUNT(*) as count FROM inquiries WHERE status = $1', ['new']),
      query('SELECT COUNT(*) as count FROM blog_posts WHERE is_published = true'),
      query(`
        SELECT name, email, company, service_interest, created_at 
        FROM inquiries 
        ORDER BY created_at DESC 
        LIMIT 5
      `),
      query(`
        SELECT 
          c.name as client_name,
          c.company,
          c.website_status,
          c.seo_status,
          c.created_at 
        FROM clients c
        WHERE (
          (c.website_status IS NOT NULL AND c.website_status != '' AND c.website_status != 'completed') OR
          (c.seo_status IS NOT NULL AND c.seo_status != '' AND c.seo_status != 'completed')
        )
        ORDER BY c.updated_at DESC 
        LIMIT 5
      `),
      query(`
        SELECT 
          SUM(CASE 
            WHEN billing_frequency IN ('monthly', 'Monthly') THEN amount * 12
            WHEN billing_frequency IN ('yearly', 'Yearly') THEN amount
            WHEN billing_frequency IN ('one-time', 'One-time', 'one_time') THEN amount
            ELSE amount * 12
          END) as yearly_revenue,
          SUM(amount) as total_payment_amount,
          COUNT(*) as active_payment_count
        FROM client_payments
        WHERE is_active = true AND status = 'active'
      `),
      query(`
        SELECT id, client_id, amount, billing_frequency, is_active, status
        FROM client_payments
        WHERE is_active = true AND status = 'active'
        ORDER BY client_id
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

    // Log payment details for debugging
    console.log('=== Payment Debug Info ===')
    console.log('Active Payments:', debugPayments.rows)
    debugPayments.rows.forEach((payment: any) => {
      const yearlyValue = payment.billing_frequency === 'monthly' ? payment.amount * 12 :
                         payment.billing_frequency === 'yearly' ? payment.amount :
                         payment.billing_frequency === 'one-time' ? payment.amount :
                         payment.amount * 12
      console.log(`Payment ${payment.id}: $${payment.amount} ${payment.billing_frequency} = $${yearlyValue}/year`)
    })
    console.log('Total Yearly Revenue:', revenueStats.rows[0].yearly_revenue)
    console.log('========================')

    return NextResponse.json({
      stats: {
        totalClients: parseInt(totalClients.rows[0].count),
        activeClients: parseInt(activeClients.rows[0].count),
        totalProjects: parseInt(totalProjects.rows[0].count),
        totalInquiries: parseInt(totalInquiries.rows[0].count),
        totalBlogPosts: parseInt(totalBlogPosts.rows[0].count),
        yearlyRevenue: parseFloat(revenueStats.rows[0].yearly_revenue || 0),
        totalPaymentAmount: parseFloat(revenueStats.rows[0].total_payment_amount || 0),
        activePaymentCount: parseInt(revenueStats.rows[0].active_payment_count || 0)
      },
      recentInquiries: recentInquiries.rows,
      recentProjects: recentProjects.rows,
      monthlyTrends: monthlyTrends.rows,
      servicePerformance: servicePerformance.rows,
      debugPayments: debugPayments.rows
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}









