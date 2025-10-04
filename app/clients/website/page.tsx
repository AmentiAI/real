'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Globe, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Shield,
  Zap,
  Target,
  BarChart3,
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

export default function ClientWebsite() {
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
          <p className="text-slate-600 text-lg">Loading website information...</p>
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
                Website Information
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
        {/* Website Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
            {client?.website || 'Website Information'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Detailed information about your website's performance and health
          </p>
          {client?.website && (
            <a
              href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Visit Website
            </a>
          )}
        </div>

        {reports ? (
          <>
            {/* Website Status */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Website Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 ${
                      reports.websiteHealth.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}>
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">Website Status</h4>
                      <p className="text-slate-600 capitalize">{reports.websiteHealth.status.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-slate-600">Last checked: {formatDate(reports.websiteHealth.lastChecked)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 ${
                      reports.websiteHealth.seoStatus === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}>
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">SEO Status</h4>
                      <p className="text-slate-600 capitalize">{reports.websiteHealth.seoStatus.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span className="text-slate-600">Optimization in progress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-2">{reports.performance.organicTraffic.toLocaleString()}</h4>
                  <p className="text-slate-600 font-medium">Organic Traffic</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-2">{reports.performance.averagePosition}</h4>
                  <p className="text-slate-600 font-medium">Average Position</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-2">{reports.performance.clickThroughRate}%</h4>
                  <p className="text-slate-600 font-medium">Click-Through Rate</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-2">{reports.performance.impressions.toLocaleString()}</h4>
                  <p className="text-slate-600 font-medium">Impressions</p>
                </div>
              </div>
            </div>

            {/* Issues and Recommendations */}
            {(reports.websiteHealth.issues.length > 0 || reports.websiteHealth.recommendations.length > 0) && (
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Issues & Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {reports.websiteHealth.issues.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
                      <h4 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        Issues Found
                      </h4>
                      <ul className="space-y-2">
                        {reports.websiteHealth.issues.map((issue, index) => (
                          <li key={index} className="text-red-700 flex items-start">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {reports.websiteHealth.recommendations.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
                      <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {reports.websiteHealth.recommendations.map((rec, index) => (
                          <li key={index} className="text-blue-700 flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Website Details */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Website Details</h3>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4">Basic Information</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Website URL</span>
                        <span className="text-slate-900 font-semibold">{client?.website || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Company</span>
                        <span className="text-slate-900 font-semibold">{client?.company || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Industry</span>
                        <span className="text-slate-900 font-semibold">{client?.industry || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Location</span>
                        <span className="text-slate-900 font-semibold">{client?.location || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4">Performance Summary</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Total Keywords</span>
                        <span className="text-slate-900 font-semibold">{reports.keywords.total}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Keywords on Page 1</span>
                        <span className="text-slate-900 font-semibold">{reports.keywords.onFirstPage}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Top 3 Rankings</span>
                        <span className="text-slate-900 font-semibold">{reports.keywords.inTop3}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Average Rank</span>
                        <span className="text-slate-900 font-semibold">{reports.keywords.averageRank}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">No Website Information Available</h3>
            <p className="text-slate-600 text-lg">Website information will appear here once data is available</p>
          </div>
        )}
      </div>
    </div>
  )
}


