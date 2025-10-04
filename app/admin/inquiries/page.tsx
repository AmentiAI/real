'use client'

import { useState, useEffect } from 'react'
import { 
  Search, Filter, Mail, Phone, Calendar, Eye, Reply, Archive, 
  Star, StarOff, Tag, Clock, TrendingUp, Download, Upload, 
  CheckCircle, XCircle, AlertCircle, Plus, Edit, Trash2,
  MessageSquare, UserPlus, FileText, BarChart3, Filter as FilterIcon,
  SortAsc, SortDesc, RefreshCw, Send, Copy, ExternalLink, Zap
} from 'lucide-react'

interface Inquiry {
  id: number
  name: string
  email: string
  phone: string
  company: string
  message: string
  service_interest: string
  status: string
  created_at: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  tags?: string[]
  notes?: string
  last_contacted?: string
  follow_up_date?: string
  source?: string
  budget?: string
  timeline?: string
  is_starred?: boolean
  response_time?: number
  conversion_status?: 'lead' | 'qualified' | 'proposal' | 'closed_won' | 'closed_lost'
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterSource, setFilterSource] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [selectedInquiries, setSelectedInquiries] = useState<number[]>([])
  const [showQuickReply, setShowQuickReply] = useState(false)
  const [quickReplyText, setQuickReplyText] = useState('')
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'timeline'>('list')
  const [showNotes, setShowNotes] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    fetchInquiries()
    fetchAnalytics()
  }, [])

  const fetchInquiries = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/admin/inquiries')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch inquiries: ${response.statusText}`)
      }
      
      const data = await response.json()
      setInquiries(data)
    } catch (error) {
      console.error('Error fetching inquiries:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch inquiries')
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/inquiries/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    }
  }

  // Feature 1: Advanced Filtering & Sorting
  const filteredAndSortedInquiries = inquiries
    .filter(inquiry => {
      const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inquiry.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || inquiry.status === filterStatus
      const matchesPriority = filterPriority === 'all' || inquiry.priority === filterPriority
      const matchesSource = filterSource === 'all' || inquiry.source === filterSource
      return matchesSearch && matchesStatus && matchesPriority && matchesSource
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof Inquiry]
      let bValue = b[sortBy as keyof Inquiry]
      
      if (sortBy === 'created_at') {
        aValue = new Date(a.created_at).getTime()
        bValue = new Date(b.created_at).getTime()
      }
      
      if (sortOrder === 'asc') {
        return (aValue || 0) > (bValue || 0) ? 1 : -1
      } else {
        return (aValue || 0) < (bValue || 0) ? 1 : -1
      }
    })

  // Feature 2: Bulk Actions
  const handleBulkAction = async (action: string) => {
    if (selectedInquiries.length === 0) return
    
    try {
      const response = await fetch('/api/admin/inquiries/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedInquiries, action })
      })
      
      if (response.ok) {
        await fetchInquiries()
        setSelectedInquiries([])
        setShowBulkActions(false)
      }
    } catch (error) {
      console.error('Error performing bulk action:', error)
    }
  }

  // Feature 3: Quick Reply System
  const sendQuickReply = async () => {
    if (!selectedInquiry || !quickReplyText.trim()) return
    
    try {
      const response = await fetch(`/api/admin/inquiries/${selectedInquiry.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: quickReplyText })
      })
      
      if (response.ok) {
        setQuickReplyText('')
        setShowQuickReply(false)
        await fetchInquiries()
      }
    } catch (error) {
      console.error('Error sending reply:', error)
    }
  }

  // Feature 4: Status Management
  const updateInquiryStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      if (response.ok) {
        await fetchInquiries()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  // Feature 5: Priority Management
  const updateInquiryPriority = async (id: number, priority: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority })
      })
      
      if (response.ok) {
        await fetchInquiries()
      }
    } catch (error) {
      console.error('Error updating priority:', error)
    }
  }

  // Feature 6: Star/Bookmark System
  const toggleStar = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}/star`, {
        method: 'POST'
      })
      
      if (response.ok) {
        await fetchInquiries()
      }
    } catch (error) {
      console.error('Error toggling star:', error)
    }
  }

  // Feature 7: Notes System
  const addNote = async (id: number) => {
    if (!newNote.trim()) return
    
    try {
      const response = await fetch(`/api/admin/inquiries/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: newNote })
      })
      
      if (response.ok) {
        setNewNote('')
        await fetchInquiries()
      }
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  // Feature 8: Export Functionality
  const exportInquiries = () => {
    const csvContent = [
      ['Name', 'Email', 'Company', 'Service Interest', 'Status', 'Priority', 'Created At', 'Source'],
      ...filteredAndSortedInquiries.map(inquiry => [
        inquiry.name,
        inquiry.email,
        inquiry.company || '',
        inquiry.service_interest || '',
        inquiry.status,
        inquiry.priority || '',
        new Date(inquiry.created_at).toLocaleDateString(),
        inquiry.source || ''
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inquiries-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Feature 9: Quick Actions
  const quickActions = [
    { label: 'Mark as Contacted', action: () => selectedInquiry && updateInquiryStatus(selectedInquiry.id, 'contacted') },
    { label: 'Mark as Qualified', action: () => selectedInquiry && updateInquiryStatus(selectedInquiry.id, 'qualified') },
    { label: 'Set High Priority', action: () => selectedInquiry && updateInquiryPriority(selectedInquiry.id, 'high') },
    { label: 'Schedule Follow-up', action: () => {/* Implementation */} },
    { label: 'Add to CRM', action: () => {/* Implementation */} }
  ]

  // Feature 10: Smart Suggestions
  const getSmartSuggestions = (inquiry: Inquiry) => {
    const suggestions = []
    if (inquiry.status === 'new' && new Date(inquiry.created_at).getTime() < Date.now() - 24 * 60 * 60 * 1000) {
      suggestions.push('Follow up - inquiry is over 24 hours old')
    }
    if (inquiry.priority === 'urgent') {
      suggestions.push('High priority - respond immediately')
    }
    if (inquiry.budget && parseInt(inquiry.budget) > 10000) {
      suggestions.push('High value lead - prioritize')
    }
    return suggestions
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'qualified':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading inquiries...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Inquiries</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchInquiries}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Page Header with Analytics */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Inquiries Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Advanced lead management with smart features and analytics
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="btn-secondary flex items-center"
          >
            <BarChart3 className="mr-2" size={16} />
            Analytics
          </button>
          <button
            onClick={exportInquiries}
            className="btn-secondary flex items-center"
          >
            <Download className="mr-2" size={16} />
            Export
          </button>
          <button
            onClick={fetchInquiries}
            className="btn-secondary flex items-center"
          >
            <RefreshCw className="mr-2" size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Analytics Dashboard */}
      {showAnalytics && analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Inquiries</p>
                <p className="text-2xl font-semibold text-gray-900">{analytics.total || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Qualified</p>
                <p className="text-2xl font-semibold text-gray-900">{analytics.qualified || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">New Today</p>
                <p className="text-2xl font-semibold text-gray-900">{analytics.newToday || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <p className="text-2xl font-semibold text-gray-900">{analytics.conversionRate || 0}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Filters and Controls */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search inquiries, companies, emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center"
          >
            <FilterIcon className="mr-2" size={16} />
            Filters
          </button>
          
          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-2 text-sm ${viewMode === 'timeline' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}
            >
              Timeline
            </button>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <select
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Sources</option>
                  <option value="website">Website</option>
                  <option value="social">Social Media</option>
                  <option value="referral">Referral</option>
                  <option value="ad">Advertisement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <div className="flex">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="created_at">Date</option>
                    <option value="name">Name</option>
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50"
                  >
                    {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {selectedInquiries.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary-700">
              {selectedInquiries.length} inquiry(ies) selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction('mark_contacted')}
                className="btn-secondary text-sm"
              >
                Mark as Contacted
              </button>
              <button
                onClick={() => handleBulkAction('mark_qualified')}
                className="btn-secondary text-sm"
              >
                Mark as Qualified
              </button>
              <button
                onClick={() => handleBulkAction('set_high_priority')}
                className="btn-secondary text-sm"
              >
                Set High Priority
              </button>
              <button
                onClick={() => setSelectedInquiries([])}
                className="btn-secondary text-sm"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Inquiries List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Inquiries ({filteredAndSortedInquiries.length})
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Bulk Actions
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredAndSortedInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                    selectedInquiry?.id === inquiry.id ? 'bg-primary-50 border-r-4 border-primary-600' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {/* Checkbox for bulk selection */}
                      <input
                        type="checkbox"
                        checked={selectedInquiries.includes(inquiry.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedInquiries([...selectedInquiries, inquiry.id])
                          } else {
                            setSelectedInquiries(selectedInquiries.filter(id => id !== inquiry.id))
                          }
                        }}
                        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        onClick={(e) => e.stopPropagation()}
                      />
                      
                      {/* Star/Bookmark */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleStar(inquiry.id)
                        }}
                        className="mt-1 text-gray-400 hover:text-yellow-500"
                      >
                        {inquiry.is_starred ? <Star className="h-4 w-4 fill-current text-yellow-500" /> : <StarOff className="h-4 w-4" />}
                      </button>
                      
                      {/* Avatar */}
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">
                            {inquiry.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {inquiry.name}
                            </p>
                            {inquiry.priority && (
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(inquiry.priority)}`}>
                                {inquiry.priority}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
                              {inquiry.status}
                            </span>
                            {inquiry.source && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {inquiry.source}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-1 space-x-4">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-400 mr-1" />
                            <p className="text-sm text-gray-500 truncate">
                              {inquiry.email}
                            </p>
                          </div>
                          {inquiry.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 text-gray-400 mr-1" />
                              <p className="text-sm text-gray-500">
                                {inquiry.phone}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {inquiry.company && (
                          <p className="text-sm text-gray-500 truncate mt-1">
                            {inquiry.company}
                          </p>
                        )}
                        
                        {inquiry.service_interest && (
                          <p className="text-sm text-primary-600 truncate mt-1">
                            {inquiry.service_interest}
                          </p>
                        )}
                        
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {inquiry.message}
                        </p>
                        
                        {/* Tags */}
                        {inquiry.tags && inquiry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {inquiry.tags.map((tag, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center text-xs text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(inquiry.created_at).toLocaleDateString()}
                            {inquiry.last_contacted && (
                              <>
                                <span className="mx-2">•</span>
                                <Clock className="h-3 w-3 mr-1" />
                                Last contacted: {new Date(inquiry.last_contacted).toLocaleDateString()}
                              </>
                            )}
                          </div>
                          
                          {/* Smart Suggestions */}
                          {getSmartSuggestions(inquiry).length > 0 && (
                            <div className="flex items-center text-xs text-orange-600">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {getSmartSuggestions(inquiry).length} suggestion(s)
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex items-center space-x-1 ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedInquiry(inquiry)
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedInquiry(inquiry)
                          setShowQuickReply(true)
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600"
                        title="Quick Reply"
                      >
                        <Reply className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Inquiry Details Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg sticky top-6">
            {selectedInquiry ? (
              <div>
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Inquiry Details</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleStar(selectedInquiry.id)}
                        className="text-gray-400 hover:text-yellow-500"
                      >
                        {selectedInquiry.is_starred ? <Star className="h-5 w-5 fill-current text-yellow-500" /> : <StarOff className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => setShowNotes(!showNotes)}
                        className="text-gray-400 hover:text-blue-500"
                      >
                        <FileText className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Contact Information */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <p className="text-sm text-gray-900">{selectedInquiry.name}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-900">{selectedInquiry.email}</p>
                        <button
                          onClick={() => window.open(`mailto:${selectedInquiry.email}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    {selectedInquiry.phone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-gray-900">{selectedInquiry.phone}</p>
                          <button
                            onClick={() => window.open(`tel:${selectedInquiry.phone}`)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {selectedInquiry.company && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <p className="text-sm text-gray-900">{selectedInquiry.company}</p>
                      </div>
                    )}
                  </div>

                  {/* Status and Priority Management */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={selectedInquiry.status}
                        onChange={(e) => updateInquiryStatus(selectedInquiry.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={selectedInquiry.priority || 'medium'}
                        onChange={(e) => updateInquiryPriority(selectedInquiry.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  {/* Service and Business Info */}
                  {selectedInquiry.service_interest && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Interest</label>
                      <p className="text-sm text-gray-900">{selectedInquiry.service_interest}</p>
                    </div>
                  )}
                  
                  {selectedInquiry.budget && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                      <p className="text-sm text-gray-900">${selectedInquiry.budget}</p>
                    </div>
                  )}
                  
                  {selectedInquiry.timeline && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                      <p className="text-sm text-gray-900">{selectedInquiry.timeline}</p>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">
                        {selectedInquiry.message}
                      </p>
                    </div>
                  </div>

                  {/* Smart Suggestions */}
                  {getSmartSuggestions(selectedInquiry).length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Smart Suggestions</label>
                      <div className="space-y-2">
                        {getSmartSuggestions(selectedInquiry).map((suggestion, index) => (
                          <div key={index} className="flex items-start space-x-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                            <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-orange-800">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedInquiry.created_at).toLocaleString()}
                      </p>
                    </div>
                    
                    {selectedInquiry.last_contacted && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Contacted</label>
                        <p className="text-sm text-gray-900">
                          {new Date(selectedInquiry.last_contacted).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Enhanced Action Buttons */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 space-y-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowQuickReply(true)}
                      className="flex-1 btn-primary text-sm flex items-center justify-center"
                    >
                      <Reply className="mr-2" size={16} />
                      Quick Reply
                    </button>
                    <button
                      onClick={() => window.open(`mailto:${selectedInquiry.email}`)}
                      className="btn-secondary text-sm flex items-center justify-center"
                    >
                      <Send className="mr-2" size={16} />
                      Email
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateInquiryStatus(selectedInquiry.id, 'contacted')}
                      className="flex-1 btn-secondary text-sm"
                    >
                      Mark Contacted
                    </button>
                    <button
                      onClick={() => updateInquiryStatus(selectedInquiry.id, 'qualified')}
                      className="flex-1 btn-secondary text-sm"
                    >
                      Mark Qualified
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateInquiryPriority(selectedInquiry.id, 'high')}
                      className="flex-1 btn-secondary text-sm"
                    >
                      High Priority
                    </button>
                    <button
                      onClick={() => {/* Archive functionality */}}
                      className="flex-1 btn-secondary text-sm"
                    >
                      <Archive className="mr-2" size={16} />
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select an inquiry to view details</p>
                <p className="text-sm mt-2">Use the search and filters to find specific inquiries</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Reply Modal */}
      {showQuickReply && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Reply to {selectedInquiry.name}</h3>
            <textarea
              value={quickReplyText}
              onChange={(e) => setQuickReplyText(e.target.value)}
              placeholder="Type your reply here..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowQuickReply(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={sendQuickReply}
                className="btn-primary"
                disabled={!quickReplyText.trim()}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotes && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Note for {selectedInquiry.name}</h3>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a note about this inquiry..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowNotes(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => addNote(selectedInquiry.id)}
                className="btn-primary"
                disabled={!newNote.trim()}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

