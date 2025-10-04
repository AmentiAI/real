'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, 
  Download, Upload, CheckSquare, Square, Calendar, 
  MessageSquare, FileText, BarChart3, Settings, 
  ChevronLeft, ChevronRight, SortAsc, SortDesc,
  Mail, Phone, MapPin, Building, Globe, Tag
} from 'lucide-react'

interface Client {
  id: number
  name: string
  email: string
  phone: string
  company: string
  website: string
  industry: string
  location: string
  status: string
  website_status: string
  seo_status: string
  billing_date?: string
  join_date?: string
  payment_method?: string
  created_at: string
  updated_at?: string
}

interface Keyword {
  id: number
  keyword: string
  target_url?: string
  current_rank?: number
  target_rank?: number
  difficulty: string
  search_volume?: number
  competition: string
  notes?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface Note {
  id: number
  note: string
  note_type: string
  created_by: string
  created_at: string
  updated_at: string
}

interface Message {
  id: number
  sender_type: 'client' | 'admin'
  subject: string
  message: string
  is_read: boolean
  priority: string
  created_at: string
  parent_message_id?: number
  thread_id: number
  client_name?: string
  client_email?: string
}

interface ClientNote {
  id: number
  client_id: number
  note: string
  created_at: string
  updated_at: string
}

interface ClientCommunication {
  id: number
  client_id: number
  type: 'email' | 'call' | 'meeting' | 'note'
  subject: string
  content: string
  created_at: string
  updated_at: string
}

interface ClientProject {
  id: number
  client_id: number
  title: string
  description: string
  image_url?: string
  services_used: string[]
  results: Record<string, any>
  is_featured: boolean
  created_at: string
  updated_at: string
}

interface ClientDocument {
  id: number
  client_id: number
  name: string
  file_path: string
  file_type?: string
  file_size?: number
  category: string
  description?: string
  created_at: string
  updated_at: string
}

interface Pagination {
  page: number
  limit: number
  totalCount: number
  totalPages: number
}

 
export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0
  })
  
  // Filters and search
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterIndustry, setFilterIndustry] = useState('all')
  const [filterLocation, setFilterLocation] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC')
  
  // UI state
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [selectedClients, setSelectedClients] = useState<number[]>([])
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  
  // New tabbed interface state
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'messages' | 'notes'>('overview')
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [newKeyword, setNewKeyword] = useState({
    keyword: '',
    target_url: '',
    current_rank: '',
    target_rank: '',
    difficulty: 'medium',
    search_volume: '',
    competition: 'medium',
    notes: ''
  })
  
  useEffect(() => {
    fetchClients()
  }, [searchTerm, filterStatus, filterIndustry, filterLocation, sortBy, sortOrder, pagination.page])

  const fetchClients = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        search: searchTerm,
        status: filterStatus,
        industry: filterIndustry,
        location: filterLocation,
        sortBy,
        sortOrder,
        page: pagination.page.toString(),
        limit: pagination.limit.toString()
      })
      
      const response = await fetch(`/api/admin/clients?${params}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch clients: ${response.statusText}`)
      }
      
      const data = await response.json()
      setClients(data.clients)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching clients:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch clients')
    } finally {
      setLoading(false)
    }
  }


  // Helper functions
  const handleSelectClient = (clientId: number) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    )
  }

  const handleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([])
    } else {
      setSelectedClients(clients.map(client => client.id))
    }
  }

  const handleBulkAction = async (action: string, data?: any) => {
    if (selectedClients.length === 0) return

    try {
      let response
      
      if (action === 'delete') {
        // Use the main DELETE endpoint with bulkIds parameter
        response = await fetch(`/api/admin/clients?bulkIds=${selectedClients.join(',')}`, {
          method: 'DELETE'
        })
      } else {
        // Use the bulk endpoint for other actions
        response = await fetch('/api/admin/clients/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action,
            clientIds: selectedClients,
            data
          })
        })
      }

      if (response.ok) {
        setSelectedClients([])
        setShowBulkActions(false)
        fetchClients()
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Bulk action failed:', error)
      alert('Failed to perform bulk action')
    }
  }

  const handleExport = async () => {
    try {
      const response = await fetch('/api/admin/clients/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'export',
          clientIds: selectedClients.length > 0 ? selectedClients : clients.map(c => c.id)
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Convert to CSV and download
        const csv = convertToCSV(data.data)
        downloadCSV(csv, data.filename)
      }
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  // New functions for tabbed interface
  const fetchClientKeywords = async (clientId: number) => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}/keywords`)
      if (response.ok) {
        const data = await response.json()
        setKeywords(data)
      }
    } catch (error) {
      console.error('Error fetching keywords:', error)
    }
  }

  const fetchClientMessages = async (clientId: number) => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}/messages`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const fetchClientNotes = async (clientId: number) => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}/notes`)
      if (response.ok) {
        const data = await response.json()
        setNotes(data)
      }
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const addKeyword = async (clientId: number) => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}/keywords`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newKeyword)
      })

      if (response.ok) {
        setNewKeyword({
          keyword: '',
          target_url: '',
          current_rank: '',
          target_rank: '',
          difficulty: 'medium',
          search_volume: '',
          competition: 'medium',
          notes: ''
        })
        fetchClientKeywords(clientId)
      }
    } catch (error) {
      console.error('Error adding keyword:', error)
    }
  }

  const addNote = async (clientId: number) => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: newNote, note_type: 'general' })
      })

      if (response.ok) {
        setNewNote('')
        fetchClientNotes(clientId)
      }
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client)
    setActiveTab('overview')
    if (client) {
      fetchClientKeywords(client.id)
      fetchClientMessages(client.id)
      fetchClientNotes(client.id)
    }
  }

  const convertToCSV = (data: Client[]) => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Website', 'Industry', 'Location', 'Status', 'Payment Method', 'Billing Date', 'Created At']
    const rows = data.map(client => [
      client.name,
      client.email,
      client.phone || '',
      client.company || '',
      client.website || '',
      client.industry || '',
      client.location || '',
      client.status,
      client.payment_method || '',
      client.billing_date ? new Date(client.billing_date).toLocaleDateString() : '',
      new Date(client.created_at).toLocaleDateString()
    ])
    
    return [headers, ...rows].map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n')
  }

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading clients...</p>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Clients</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchClients}
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
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your business clients and their information. ({pagination.totalCount} total)
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <Download className="mr-2" size={18} />
            Export
          </button>
        <button
          onClick={() => {
            window.location.href = '/admin/clients/add'
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-sm"
        >
          <Plus className="mr-2" size={18} />
          Add Client
        </button>
        </div>
      </div>


      {/* Advanced Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="prospect">Prospect</option>
            </select>
          </div>
          <div>
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Legal">Legal</option>
              <option value="Construction">Construction</option>
              <option value="Retail">Retail</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              <option value="Providence, RI">Providence, RI</option>
              <option value="Warwick, RI">Warwick, RI</option>
              <option value="Cranston, RI">Cranston, RI</option>
              <option value="Newport, RI">Newport, RI</option>
              <option value="Boston, MA">Boston, MA</option>
              <option value="New York, NY">New York, NY</option>
              <option value="Connecticut">Connecticut</option>
              <option value="Other">Other</option>
            </select>
        </div>
      </div>
        
        {/* Sort Options */}
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="created_at">Created Date</option>
              <option value="name">Name</option>
              <option value="company">Company</option>
              <option value="status">Status</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {sortOrder === 'ASC' ? <SortAsc size={16} /> : <SortDesc size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedClients.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-900">
                {selectedClients.length} client{selectedClients.length > 1 ? 's' : ''} selected
              </span>
              <button
                onClick={() => setSelectedClients([])}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear selection
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction('updateStatus', { status: 'active' })}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
              >
                Mark Active
              </button>
              <button
                onClick={() => handleBulkAction('updateStatus', { status: 'inactive' })}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                Mark Inactive
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clients Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center"
                  >
                    {selectedClients.length === clients.length ? (
                      <CheckSquare size={16} className="text-primary-600" />
                    ) : (
                      <Square size={16} className="text-gray-400" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Billing Date
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap w-12">
                    <button
                      onClick={() => handleSelectClient(client.id)}
                    >
                      {selectedClients.includes(client.id) ? (
                        <CheckSquare size={16} className="text-primary-600" />
                      ) : (
                        <Square size={16} className="text-gray-400" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{client.company}</div>
            
                    {client.website && (
                      <div className="text-sm text-gray-500 mt-1">
                        <a href={client.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 inline-flex items-center">
                          <Globe size={12} className="mr-1" />
                          {client.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </a>
                      </div>
                    )}
                    {client.location && (
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPin size={12} className="mr-1" />
                        {client.location}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail size={12} className="mr-1" />
                      {client.email}
                    </div>
                    {client.phone && (
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone size={12} className="mr-1" />
                        {client.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      client.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : client.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {client.payment_method ? (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                          client.payment_method === 'credit_card'
                            ? 'bg-blue-100 text-blue-800'
                            : client.payment_method === 'bank_transfer'
                            ? 'bg-green-100 text-green-800'
                            : client.payment_method === 'paypal'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {client.payment_method.replace('_', ' ')}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {client.billing_date ? (
                        new Date(client.billing_date).toLocaleDateString()
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedClient(client)
                          setShowViewModal(true)
                        }}
                        className="p-2 text-primary-600 hover:text-primary-900 hover:bg-primary-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          window.location.href = `/admin/clients/${client.id}/edit`
                        }}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Client"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this client?')) {
                            try {
                              const response = await fetch(`/api/admin/clients?id=${client.id}`, {
                                method: 'DELETE'
                              })
                              
                              if (response.ok) {
                                fetchClients()
                              } else {
                                const errorData = await response.json()
                                alert(`Error: ${errorData.error}`)
                              }
                            } catch (error) {
                              console.error('Error deleting client:', error)
                              alert('Failed to delete client')
                            }
                          }
                        }}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Client"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {clients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {searchTerm || filterStatus !== 'all' || filterIndustry !== 'all' || filterLocation !== 'all' 
                ? 'No clients match your filters.' 
                : 'No clients found.'}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span>
                {' '}to{' '}
                <span className="font-medium">
                  {Math.min(pagination.page * pagination.limit, pagination.totalCount)}
                </span>
                {' '}of{' '}
                <span className="font-medium">{pagination.totalCount}</span>
                {' '}results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setPagination(prev => ({ ...prev, page }))}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === pagination.page
                        ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showViewModal && selectedClient && (
        <ViewClientModal 
          client={selectedClient}
          onClose={() => {
            setShowViewModal(false)
            setSelectedClient(null)
          }}
        />
      )}

    </div>
  )
}



// View Client Modal Component
function ViewClientModal({ client, onClose }: { client: Client, onClose: () => void }) {
  const [notes, setNotes] = useState<ClientNote[]>([])
  const [communications, setCommunications] = useState<ClientCommunication[]>([])
  const [projects, setProjects] = useState<ClientProject[]>([])
  const [documents, setDocuments] = useState<ClientDocument[]>([])
  const [newNote, setNewNote] = useState('')
  const [newCommunication, setNewCommunication] = useState({
    type: 'note' as 'email' | 'call' | 'meeting' | 'note',
    subject: '',
    content: ''
  })
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image_url: '',
    services_used: [] as string[],
    results: {} as Record<string, any>,
    is_featured: false
  })
  const [newDocument, setNewDocument] = useState({
    name: '',
    file_path: '',
    file_type: '',
    file_size: 0,
    category: 'general',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'info' | 'notes' | 'communications' | 'projects' | 'documents'>('info')

  useEffect(() => {
    fetchClientData()
  }, [client.id])

  const fetchClientData = async () => {
    try {
      setLoading(true)
      const [notesRes, commsRes, projectsRes, docsRes] = await Promise.all([
        fetch(`/api/admin/clients/${client.id}/notes`),
        fetch(`/api/admin/clients/${client.id}/communications`),
        fetch(`/api/admin/clients/${client.id}/projects`),
        fetch(`/api/admin/clients/${client.id}/documents`)
      ])

      if (notesRes.ok) {
        const notesData = await notesRes.json()
        setNotes(notesData)
      }

      if (commsRes.ok) {
        const commsData = await commsRes.json()
        setCommunications(commsData)
      }

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(projectsData)
      }

      if (docsRes.ok) {
        const docsData = await docsRes.json()
        setDocuments(docsData)
      }
    } catch (error) {
      console.error('Error fetching client data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return

    try {
      const response = await fetch(`/api/admin/clients/${client.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: newNote })
      })

      if (response.ok) {
        setNewNote('')
        fetchClientData()
      }
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  const handleAddCommunication = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCommunication.content.trim()) return

    try {
      const response = await fetch(`/api/admin/clients/${client.id}/communications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCommunication)
      })

      if (response.ok) {
        setNewCommunication({ type: 'note', subject: '', content: '' })
        fetchClientData()
      }
    } catch (error) {
      console.error('Error adding communication:', error)
    }
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProject.title.trim() || !newProject.description.trim()) return

    try {
      const response = await fetch(`/api/admin/clients/${client.id}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      })

      if (response.ok) {
        setNewProject({
          title: '',
          description: '',
          image_url: '',
          services_used: [],
          results: {},
          is_featured: false
        })
        fetchClientData()
      }
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDocument.name.trim() || !newDocument.file_path.trim()) return

    try {
      const response = await fetch(`/api/admin/clients/${client.id}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDocument)
      })

      if (response.ok) {
        setNewDocument({
          name: '',
          file_path: '',
          file_type: '',
          file_size: 0,
          category: 'general',
          description: ''
        })
        fetchClientData()
      }
    } catch (error) {
      console.error('Error adding document:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {client.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{client.name}</h2>
              <p className="text-gray-600">{client.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'info', label: 'Information', icon: Building },
              { id: 'notes', label: 'Notes', icon: FileText },
              { id: 'communications', label: 'Communications', icon: MessageSquare },
              { id: 'projects', label: 'Projects', icon: Settings },
              { id: 'documents', label: 'Documents', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 inline mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">

          {/* Tab Content */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Client Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-600">{client.phone}</span>
                    </div>
                  )}
                  {client.website && (
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-gray-400 mr-3" />
                      <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">
                        {client.website}
                      </a>
                    </div>
                  )}
                  {client.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-600">{client.location}</span>
                    </div>
                  )}
                  {client.industry && (
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-600">{client.industry}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      client.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : client.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {client.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Add Note</h4>
                <form onSubmit={handleAddNote} className="mb-6">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                  />
                  <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Add Note
                  </button>
                </form>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Notes History</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {notes.map((note) => (
                    <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{note.note}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(note.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'communications' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Log Communication</h4>
                <form onSubmit={handleAddCommunication} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-3">
                    <select
                      value={newCommunication.type}
                      onChange={(e) => setNewCommunication(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="note">Note</option>
                      <option value="email">Email</option>
                      <option value="call">Call</option>
                      <option value="meeting">Meeting</option>
                    </select>
                    <input
                      type="text"
                      value={newCommunication.subject}
                      onChange={(e) => setNewCommunication(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Subject (optional)"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      value={newCommunication.content}
                      onChange={(e) => setNewCommunication(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Communication details..."
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      rows={3}
                      required
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Log Communication
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Communication History</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {communications.map((comm) => (
                    <div key={comm.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900 capitalize">{comm.type}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comm.created_at).toLocaleString()}
                        </span>
                      </div>
                      {comm.subject && (
                        <p className="text-sm font-medium text-gray-700 mb-1">{comm.subject}</p>
                      )}
                      <p className="text-sm text-gray-600">{comm.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Add Project</h4>
                <form onSubmit={handleAddProject} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Project title"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Project description"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      rows={3}
                      required
                    />
                    <input
                      type="url"
                      value={newProject.image_url}
                      onChange={(e) => setNewProject(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="Image URL (optional)"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="is_featured"
                        checked={newProject.is_featured}
                        onChange={(e) => setNewProject(prev => ({ ...prev, is_featured: e.target.checked }))}
                        className="mr-2"
                      />
                      <label htmlFor="is_featured" className="text-sm text-gray-700">
                        Featured project
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Add Project
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Projects</h4>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="text-lg font-medium text-gray-900">{project.title}</h5>
                        {project.is_featured && (
                          <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                      {project.image_url && (
                        <img 
                          src={project.image_url} 
                          alt={project.title}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                        <span>Services: {project.services_used?.length || 0}</span>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No projects found for this client.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Add Document</h4>
                <form onSubmit={handleAddDocument} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newDocument.name}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Document name"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <input
                      type="url"
                      value={newDocument.file_path}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, file_path: e.target.value }))}
                      placeholder="File URL or path"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newDocument.file_type}
                        onChange={(e) => setNewDocument(prev => ({ ...prev, file_type: e.target.value }))}
                        placeholder="File type (e.g., PDF, DOC)"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="number"
                        value={newDocument.file_size}
                        onChange={(e) => setNewDocument(prev => ({ ...prev, file_size: parseInt(e.target.value) || 0 }))}
                        placeholder="File size in bytes"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <select
                      value={newDocument.category}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="general">General</option>
                      <option value="contract">Contract</option>
                      <option value="proposal">Proposal</option>
                      <option value="invoice">Invoice</option>
                      <option value="report">Report</option>
                      <option value="other">Other</option>
                    </select>
                    <textarea
                      value={newDocument.description}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Document description (optional)"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      rows={2}
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Add Document
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Documents</h4>
                <div className="space-y-3">
                  {documents.map((document) => (
                    <div key={document.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h5 className="text-lg font-medium text-gray-900">{document.name}</h5>
                          <p className="text-sm text-gray-600">{document.description}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full capitalize">
                          {document.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                        <div className="flex items-center space-x-4">
                          <span>Type: {document.file_type || 'Unknown'}</span>
                          {document.file_size && (
                            <span>Size: {formatFileSize(document.file_size)}</span>
                          )}
                          <span>Created: {new Date(document.created_at).toLocaleDateString()}</span>
                        </div>
                        <a
                          href={document.file_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Document
                        </a>
                      </div>
                    </div>
                  ))}
                  {documents.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No documents found for this client.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


