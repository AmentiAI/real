'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Mail, Phone, Calendar, Eye, Reply, Archive } from 'lucide-react'

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
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/admin/inquiries')
      if (response.ok) {
        const data = await response.json()
        setInquiries(data)
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || inquiry.status === filterStatus
    return matchesSearch && matchesFilter
  })

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Inquiries</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and respond to customer inquiries and leads.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Inquiries ({filteredInquiries.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                    selectedInquiry?.id === inquiry.id ? 'bg-primary-50 border-r-4 border-primary-600' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-600">
                              {inquiry.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {inquiry.name}
                            </p>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
                              {inquiry.status}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Mail className="h-4 w-4 text-gray-400 mr-1" />
                            <p className="text-sm text-gray-500 truncate">
                              {inquiry.email}
                            </p>
                          </div>
                          {inquiry.company && (
                            <p className="text-sm text-gray-500 truncate">
                              {inquiry.company}
                            </p>
                          )}
                          {inquiry.service_interest && (
                            <p className="text-sm text-primary-600 truncate">
                              {inquiry.service_interest}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {inquiry.message}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiry Details */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg sticky top-6">
            {selectedInquiry ? (
              <div>
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Inquiry Details</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <p className="text-sm text-gray-900">{selectedInquiry.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-sm text-gray-900">{selectedInquiry.email}</p>
                  </div>
                  
                  {selectedInquiry.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <p className="text-sm text-gray-900">{selectedInquiry.phone}</p>
                    </div>
                  )}
                  
                  {selectedInquiry.company && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <p className="text-sm text-gray-900">{selectedInquiry.company}</p>
                    </div>
                  )}
                  
                  {selectedInquiry.service_interest && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Interest
                      </label>
                      <p className="text-sm text-gray-900">{selectedInquiry.service_interest}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedInquiry.status)}`}>
                      {selectedInquiry.status}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Submitted
                    </label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedInquiry.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex space-x-3">
                    <button className="flex-1 btn-primary text-sm">
                      <Reply className="mr-2" size={16} />
                      Reply
                    </button>
                    <button className="btn-secondary text-sm">
                      <Archive className="size={16}" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select an inquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
