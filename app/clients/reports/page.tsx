'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Download, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Calendar,
  Target,
  Search,
  Globe,
  FileText,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'

interface Client {
  id: number
  name: string
  email: string
  company: string
  website: string
  phone?: string
  industry?: string
  location?: string
  status: string
  website_status: string
  seo_status: string
  join_date: string
}

interface WebsiteReports {
  client: Client
  performance: {
    organicTraffic: number
    organicTrafficChange: number
    keywordRankings: number
    keywordRankingsChange: number
    averagePosition: number
    averagePositionChange: number
    clickThroughRate: string
    clickThroughRateChange: string
    impressions: number
    clicks: number
  }
  keywords: {
    total: number
    onFirstPage: number
    inTop3: number
    averageRank: number
    list: Array<{
      keyword: string
      current_rank: number
      target_rank: number
      search_volume: number
      difficulty: string
      competition: string
    }>
  }
  websiteHealth: {
    status: string
    seoStatus: string
    lastChecked: string
    issues: string[]
    recommendations: string[]
  }
  projects: Array<{
    id: number
    title: string
    description: string
    services_used: any
    results: any
    created_at: string
  }>
  lastUpdated: string
}

export default function ClientReports() {
  const [client, setClient] = useState<Client | null>(null)
  const [reports, setReports] = useState<WebsiteReports | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('clientToken')
    const clientData = localStorage.getItem('clientData')

    if (!token || !clientData) {
      router.push('/clients/login')
      return
    }

    try {
      setClient(JSON.parse(clientData))
      fetchReports()
    } catch (error) {
      console.error('Error parsing client data:', error)
      router.push('/clients/login')
    }
  }, [router])

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('clientToken')
      const response = await fetch('/api/clients/website-reports', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setReports(data)
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchReports()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-slate-600 text-lg">Loading your reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/clients/dashboard"
                className="flex items-center text-slate-600 hover:text-blue-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-slate-300"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {client?.name || 'Client'}'s Reports
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Report Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
            Performance Reports
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Detailed analytics and insights for {client?.company || 'your business'}
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full text-blue-700 text-sm font-medium shadow-lg">
            <Calendar className="w-5 h-5 mr-2" />
            Last updated: {reports ? formatDate(reports.lastUpdated) : 'Never'}
          </div>
        </div>

        {reports ? (
          <>
            {/* Executive Summary */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Executive Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-2">{reports.performance.organicTraffic.toLocaleString()}</h4>
                  <p className="text-slate-600 font-medium mb-2">Organic Traffic</p>
                  <div className={`flex items-center justify-center text-sm ${
                    reports.performance.organicTrafficChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {reports.performance.organicTrafficChange >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(reports.performance.organicTrafficChange)}%
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-2">{reports.keywords.onFirstPage}</h4>
                  <p className="text-slate-600 font-medium mb-2">Keywords on Page 1</p>
                  <div className={`flex items-center justify-center text-sm ${
                    reports.performance.keywordRankingsChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {reports.performance.keywordRankingsChange >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(reports.performance.keywordRankingsChange)}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-2">{reports.performance.averagePosition}</h4>
                  <p className="text-slate-600 font-medium mb-2">Average Position</p>
                  <div className={`flex items-center justify-center text-sm ${
                    reports.performance.averagePositionChange <= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {reports.performance.averagePositionChange <= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(reports.performance.averagePositionChange)}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-2">{reports.performance.clickThroughRate}%</h4>
                  <p className="text-slate-600 font-medium mb-2">Click-Through Rate</p>
                  <div className={`flex items-center justify-center text-sm ${
                    parseFloat(reports.performance.clickThroughRateChange) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {parseFloat(reports.performance.clickThroughRateChange) >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(parseFloat(reports.performance.clickThroughRateChange))}%
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Keyword Report */}
            {reports.keywords.total > 0 && (
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Keyword Performance Report</h3>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{reports.keywords.total}</div>
                      <p className="text-slate-600 font-medium">Total Keywords</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">{reports.keywords.inTop3}</div>
                      <p className="text-slate-600 font-medium">Top 3 Rankings</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-2">{reports.keywords.averageRank}</div>
                      <p className="text-slate-600 font-medium">Average Rank</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-slate-900 mb-4">Keyword Rankings</h4>
                    {reports.keywords.list.map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                        <div className="flex-1">
                          <h5 className="font-semibold text-slate-900">{keyword.keyword}</h5>
                          <p className="text-sm text-slate-600">
                            Search Volume: {keyword.search_volume?.toLocaleString() || 'N/A'} | 
                            Difficulty: {keyword.difficulty} | 
                            Competition: {keyword.competition}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            keyword.current_rank <= 3 ? 'text-green-600' :
                            keyword.current_rank <= 10 ? 'text-blue-600' :
                            keyword.current_rank <= 20 ? 'text-orange-600' :
                            'text-red-600'
                          }`}>
                            {keyword.current_rank || 'N/A'}
                          </div>
                          <p className="text-sm text-slate-500">Current Rank</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Website Health Report */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Website Health Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Website Status</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Status</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        reports.websiteHealth.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {reports.websiteHealth.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">SEO Status</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        reports.websiteHealth.seoStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {reports.websiteHealth.seoStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Last Checked</span>
                      <span className="text-slate-900">{formatDate(reports.websiteHealth.lastChecked)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Impressions</span>
                      <span className="text-slate-900 font-semibold">{reports.performance.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Clicks</span>
                      <span className="text-slate-900 font-semibold">{reports.performance.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">CTR</span>
                      <span className="text-slate-900 font-semibold">{reports.performance.clickThroughRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Download Reports</h3>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                  Export your performance data in various formats for offline analysis
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                    <Download className="h-5 w-5 mr-2" />
                    Download PDF Report
                  </button>
                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Download Excel Data
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">No Reports Available</h3>
            <p className="text-slate-600 text-lg">Reports will appear here once data is available</p>
          </div>
        )}
      </div>
    </div>
  )
}


