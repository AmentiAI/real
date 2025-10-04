import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    const clientId = decoded.clientId

    // Get client's website data
    const clientResult = await query(
      'SELECT name, website, website_status, seo_status, join_date FROM clients WHERE id = $1',
      [clientId]
    )

    if (clientResult.rows.length === 0) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const client = clientResult.rows[0]

    // Get client's keywords and rankings
    const keywordsResult = await query(
      'SELECT keyword, current_rank, target_rank, search_volume, difficulty, competition, created_at FROM client_keywords WHERE client_id = $1 AND is_active = true ORDER BY created_at DESC',
      [clientId]
    )

    // Get client's projects
    const projectsResult = await query(
      'SELECT id, title, description, services_used, results, created_at FROM projects WHERE client_id = $1 ORDER BY created_at DESC',
      [clientId]
    )

    // Calculate SEO metrics
    const keywords = keywordsResult.rows
    const totalKeywords = keywords.length
    const keywordsOnFirstPage = keywords.filter(k => k.current_rank && k.current_rank <= 10).length
    const keywordsInTop3 = keywords.filter(k => k.current_rank && k.current_rank <= 3).length
    const averageRank = keywords.length > 0 
      ? Math.round(keywords.reduce((sum, k) => sum + (k.current_rank || 100), 0) / keywords.length)
      : 0

    // Calculate keyword ranking changes (compare with previous month)
    const previousMonth = new Date()
    previousMonth.setMonth(previousMonth.getMonth() - 1)
    
    const previousKeywordsResult = await query(
      'SELECT keyword, current_rank FROM client_keywords WHERE client_id = $1 AND is_active = true AND created_at < $2',
      [clientId, previousMonth.toISOString()]
    )
    
    const previousKeywords = previousKeywordsResult.rows
    const previousKeywordsOnFirstPage = previousKeywords.filter(k => k.current_rank && k.current_rank <= 10).length
    const keywordRankingsChange = previousKeywordsOnFirstPage > 0 
      ? keywordsOnFirstPage - previousKeywordsOnFirstPage 
      : 0

    // Get real performance data from database
    const analyticsResult = await query(
      'SELECT organic_traffic, organic_traffic_change, click_through_rate, click_through_rate_change, average_position, average_position_change, impressions, clicks FROM website_analytics WHERE client_id = $1 ORDER BY date DESC LIMIT 1',
      [clientId]
    )

    const performanceData = analyticsResult.rows.length > 0 ? {
      organicTraffic: analyticsResult.rows[0].organic_traffic || 0,
      organicTrafficChange: analyticsResult.rows[0].organic_traffic_change || 0,
      keywordRankings: keywordsOnFirstPage,
      keywordRankingsChange: keywordRankingsChange,
      averagePosition: analyticsResult.rows[0].average_position || 0,
      averagePositionChange: analyticsResult.rows[0].average_position_change || 0,
      clickThroughRate: analyticsResult.rows[0].click_through_rate?.toFixed(2) || '0.00',
      clickThroughRateChange: analyticsResult.rows[0].click_through_rate_change?.toFixed(2) || '0.00',
      impressions: analyticsResult.rows[0].impressions || 0,
      clicks: analyticsResult.rows[0].clicks || 0
    } : {
      organicTraffic: 0,
      organicTrafficChange: 0,
      keywordRankings: 0,
      keywordRankingsChange: 0,
      averagePosition: 0,
      averagePositionChange: 0,
      clickThroughRate: '0.00',
      clickThroughRateChange: '0.00',
      impressions: 0,
      clicks: 0
    }

    // Get website health data
    const websiteHealth = {
      status: client.website_status,
      seoStatus: client.seo_status,
      lastChecked: new Date().toISOString(),
      issues: client.website_status === 'not_started' ? ['Website not yet created'] : [],
      recommendations: client.website_status === 'not_started' ? ['Start website development'] : []
    }

    const reports = {
      client: {
        name: client.name,
        website: client.website,
        joinDate: client.join_date
      },
      performance: performanceData,
      keywords: {
        total: totalKeywords,
        onFirstPage: keywordsOnFirstPage,
        inTop3: keywordsInTop3,
        averageRank: averageRank,
        list: keywords.slice(0, 10) // Show top 10 keywords
      },
      websiteHealth,
      projects: projectsResult.rows,
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(reports)
  } catch (error) {
    console.error('Error fetching website reports:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
