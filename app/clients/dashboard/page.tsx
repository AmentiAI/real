'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useBranding } from '@/components/BrandingProvider'
import { 
  FileText, 
  MessageSquare, 
  LogOut, 
  CheckCircle,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Globe,
  AlertCircle,
  Send,
  ArrowRight,
  Eye,
  Search,
  Zap,
  Award,
  Calendar,
  Building,
  ExternalLink
} from 'lucide-react'

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

interface Message {
  id: number
  sender_type: 'client' | 'admin'
  subject: string
  message: string
  is_read: boolean
  priority: 'low' | 'normal' | 'high' | 'urgent'
  created_at: string
}

export default function ClientDashboard() {
  const [client, setClient] = useState<Client | null>(null)
  const [reports, setReports] = useState<WebsiteReports | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [newMessage, setNewMessage] = useState({
    subject: '',
    message: '',
    priority: 'normal' as const
  })
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('clientToken')
    const clientData = localStorage.getItem('clientData')

    if (!token || !clientData) {
      router.push('/clients/login')
      return
    }

    try {
      const parsedClient = JSON.parse(clientData)
      setClient(parsedClient)
      fetchDashboardData()
    } catch (error) {
      console.error('Error parsing client data:', error)
      router.push('/clients/login')
    }
  }, [router])

  useEffect(() => {
    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchDashboardData()
    }, 10000) // Poll every 10 seconds for dashboard data
    
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('clientToken')
      
      const [reportsResponse, messagesResponse] = await Promise.all([
        fetch('/api/clients/website-reports', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('/api/clients/messages', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      ])

      if (reportsResponse.ok) {
        const reportsData = await reportsResponse.json()
        setReports(reportsData)
      }

      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json()
        setMessages(messagesData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.subject.trim() || !newMessage.message.trim()) return

    setSendingMessage(true)
    try {
      const token = localStorage.getItem('clientToken')
      const response = await fetch('/api/clients/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newMessage)
      })

      if (response.ok) {
        setNewMessage({ subject: '', message: '', priority: 'normal' })
        fetchDashboardData()
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSendingMessage(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('clientToken')
    localStorage.removeItem('clientData')
    router.push('/clients/login')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'normal': return 'bg-blue-100 text-blue-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-slate-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const unreadMessages = messages.filter(m => !m.is_read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {client?.name || 'Client'}'s Portal
                  </h1>
                  <p className="text-sm text-slate-500">
                    {client?.company ? `${client.company} Dashboard` : 'Digital Marketing Dashboard'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
              >
                <LogOut className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
            Welcome back, {client?.name || 'Client'}!
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4">
            Track your website performance, keyword rankings, and communicate directly with our team
          </p>
          {client?.company && (
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full text-blue-700 text-sm font-medium shadow-lg">
              <Building className="w-5 h-5 mr-2" />
              {client.company}
              {client.industry && (
                <span className="ml-2 text-slate-500">• {client.industry}</span>
              )}
            </div>
          )}
        </div>

        {/* Client Info Section */}
        {client && (
          <div className="mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">Client Name</h4>
                  <p className="text-slate-600 text-sm">{client.name}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">Company</h4>
                  <p className="text-slate-600 text-sm">{client.company || 'Not specified'}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">Website</h4>
                  <p className="text-slate-600 text-sm">{client.website || 'Not specified'}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">Member Since</h4>
                  <p className="text-slate-600 text-sm">
                    {client.join_date ? new Date(client.join_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    }) : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Quick Actions</h3>
            <p className="text-lg text-slate-600">Access your reports and website information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* View Reports */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">View Reports</h4>
                <p className="text-slate-600 mb-6">Access detailed performance reports and analytics</p>
                <Link
                  href="/clients/reports"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  View All Reports
                </Link>
              </div>
            </div>

            {/* Website Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Website Info</h4>
                <p className="text-slate-600 mb-6">View your website details and status</p>
                {client?.website ? (
                  <div className="space-y-3">
                    <Link
                      href="/clients/website"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center"
                    >
                      <Globe className="h-5 w-5 mr-2" />
                      View Details
                    </Link>
                    <a
                      href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center text-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </div>
                ) : (
                  <button className="w-full bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl cursor-not-allowed flex items-center justify-center">
                    <Globe className="h-5 w-5 mr-2" />
                    No Website Set
                  </button>
                )}
              </div>
            </div>

            {/* Download Reports */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Download Reports</h4>
                <p className="text-slate-600 mb-6">Export your performance data as PDF or Excel</p>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        {reports && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                {client?.company ? `${client.company}'s` : 'Your'} Website Performance
              </h3>
              <p className="text-lg text-slate-600">
                Real-time data from {client?.website || 'your website'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">{reports.performance.impressions.toLocaleString()}</h3>
                <p className="text-slate-600 font-medium">Total Impressions</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">{reports.performance.clicks.toLocaleString()}</h3>
                <p className="text-slate-600 font-medium">Total Clicks</p>
              </div>
            </div>
          </div>
        )}

        {/* Keywords Section */}
        {reports && reports.keywords.total > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                {client?.company ? `${client.company}'s` : 'Your'} Keyword Rankings
              </h3>
              <p className="text-lg text-slate-600">
                Track your keyword performance and search visibility
              </p>
            </div>

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
                <h4 className="text-xl font-bold text-slate-900 mb-4">Top Performing Keywords</h4>
                {reports.keywords.list.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
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

        {/* Website Health */}
        {reports && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                {client?.website ? `${client.website} Health` : 'Website Health'}
              </h3>
              <p className="text-lg text-slate-600">
                Current status and recommendations for your website
              </p>
            </div>

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

            {reports.websiteHealth.issues.length > 0 && (
              <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Issues Found
                </h4>
                <ul className="space-y-2">
                  {reports.websiteHealth.issues.map((issue, index) => (
                    <li key={index} className="text-red-700">• {issue}</li>
                  ))}
                </ul>
              </div>
            )}

            {reports.websiteHealth.recommendations.length > 0 && (
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {reports.websiteHealth.recommendations.map((rec, index) => (
                    <li key={index} className="text-blue-700">• {rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Messages Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Messages for {client?.name || 'You'}
            </h3>
            <p className="text-lg text-slate-600">
              Communication with our team about your projects
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Messages */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
              <h4 className="text-xl font-bold text-slate-900 mb-6">Recent Messages</h4>
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">No messages yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.slice(0, 5).map((message) => (
                    <div key={message.id} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender_type === 'client' 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                        }`}>
                          <span className="text-white font-bold text-sm">
                            {message.sender_type === 'client' ? 'Y' : 'A'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-semibold text-slate-900">
                              {message.sender_type === 'client' ? 'You' : '{branding?.company_name || "Amenti AI"} Team'}
                            </h5>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(message.priority)}`}>
                                {message.priority}
                              </span>
                              {!message.is_read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mb-1">{message.subject}</p>
                          <p className="text-sm text-slate-500">{formatDateTime(message.created_at)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Send Message */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
              <h4 className="text-xl font-bold text-slate-900 mb-6">Send Message</h4>
              <form onSubmit={sendMessage} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={newMessage.priority}
                    onChange={(e) => setNewMessage({ ...newMessage, priority: e.target.value as any })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="low">🟢 Low Priority</option>
                    <option value="normal">🟡 Normal Priority</option>
                    <option value="high">🟠 High Priority</option>
                    <option value="urgent">🔴 Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={newMessage.message}
                    onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows={4}
                    placeholder="Type your message here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={sendingMessage || !newMessage.subject.trim() || !newMessage.message.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {sendingMessage ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-8">
            Need Help, {client?.name || 'Client'}?
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Our team is here to help {client?.company || 'your business'} succeed. Use the messaging system above to reach out anytime for support or questions about your digital marketing strategy.
          </p>
          
          <div className="flex justify-center">
            <Link
              href="/clients/messages"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Send Message
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}