'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, X, Plus, Trash2, Edit, Search, Filter } from 'lucide-react'

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

export default function EditClientPage() {
  const router = useRouter()
  const params = useParams()
  const clientId = params.id

  const [client, setClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    industry: '',
    location: '',
    status: 'active',
    website_status: 'not_started',
    seo_status: 'not_started',
    billing_date: '',
    join_date: '',
    payment_method: '',
    password: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'info' | 'keywords' | 'payments'>('info')
  
  // Keywords state
  const [keywords, setKeywords] = useState([])
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
  const [keywordLoading, setKeywordLoading] = useState(false)
  const [bulkKeywords, setBulkKeywords] = useState('')
  const [bulkLoading, setBulkLoading] = useState(false)
  const [addMode, setAddMode] = useState<'single' | 'bulk'>('bulk')
  const [editingKeyword, setEditingKeyword] = useState<any>(null)
  const [editFormData, setEditFormData] = useState({
    keyword: '',
    target_url: '',
    current_rank: '',
    target_rank: '',
    difficulty: 'medium',
    search_volume: '',
    competition: 'medium',
    notes: ''
  })
  
  // Payments state
  const [payments, setPayments] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [editingPayment, setEditingPayment] = useState<any>(null)
  const [showAddPayment, setShowAddPayment] = useState(false)
  const [paymentFormData, setPaymentFormData] = useState({
    package_id: '',
    package_name: '',
    amount: '',
    billing_frequency: 'monthly',
    next_billing_date: '',
    start_date: new Date().toISOString().split('T')[0],
    status: 'active',
    is_custom: false,
    notes: ''
  })
  const [paymentLoading, setPaymentLoading] = useState(false)

  useEffect(() => {
    if (clientId) {
      fetchClient()
      fetchKeywords()
      fetchPaymentInfo()
      fetchPackages()
    }
  }, [clientId])

  const fetchClient = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/clients/${clientId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch client')
      }
      
      const clientData = await response.json()
      setClient(clientData)
      
      // Format dates for HTML date inputs (YYYY-MM-DD)
      const formatDateForInput = (dateString: string | null | undefined) => {
        if (!dateString) return ''
        try {
          const date = new Date(dateString)
          return date.toISOString().split('T')[0]
        } catch {
          return ''
        }
      }
      
      setFormData({
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone || '',
        company: clientData.company || '',
        website: clientData.website || '',
        industry: clientData.industry || '',
        location: clientData.location || '',
        status: clientData.status,
        website_status: clientData.website_status || 'not_started',
        seo_status: clientData.seo_status || 'not_started',
        billing_date: formatDateForInput(clientData.billing_date),
        join_date: formatDateForInput(clientData.join_date),
        payment_method: clientData.payment_method || '',
        password: ''
      })
    } catch (error) {
      console.error('Error fetching client:', error)
      setError('Failed to load client data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/clients', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: clientId, ...formData }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update client')
      }

      // Redirect back to clients list
      router.push('/admin/clients')
    } catch (error) {
      console.error('Error updating client:', error)
      setError(error instanceof Error ? error.message : 'Failed to update client')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleCancel = () => {
    router.push('/admin/clients')
  }

  // Keyword management functions
  const fetchKeywords = async () => {
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

  const addKeyword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKeyword.keyword.trim()) return

    try {
      setKeywordLoading(true)
      
      // Prepare data with proper null values for empty fields
      const keywordData = {
        keyword: newKeyword.keyword,
        target_url: newKeyword.target_url || null,
        current_rank: newKeyword.current_rank ? parseInt(newKeyword.current_rank) : null,
        target_rank: newKeyword.target_rank ? parseInt(newKeyword.target_rank) : null,
        difficulty: newKeyword.difficulty,
        search_volume: newKeyword.search_volume ? parseInt(newKeyword.search_volume) : null,
        competition: newKeyword.competition,
        notes: newKeyword.notes || null
      }
      
      const response = await fetch(`/api/admin/clients/${clientId}/keywords`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keywordData)
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
        fetchKeywords()
      }
    } catch (error) {
      console.error('Error adding keyword:', error)
    } finally {
      setKeywordLoading(false)
    }
  }

  const addBulkKeywords = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bulkKeywords.trim()) return

    try {
      setBulkLoading(true)
      const lines = bulkKeywords.split('\n').filter(line => line.trim())
      
      // Submit each keyword
      const promises = lines.map(line => {
        const keyword = line.trim()
        return fetch(`/api/admin/clients/${clientId}/keywords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            keyword,
            target_url: null,
            current_rank: null,
            target_rank: null,
            difficulty: 'medium',
            search_volume: null,
            competition: 'medium',
            notes: null
          })
        })
      })

      await Promise.all(promises)
      setBulkKeywords('')
      fetchKeywords()
    } catch (error) {
      console.error('Error adding bulk keywords:', error)
      alert('Error adding keywords. Please try again.')
    } finally {
      setBulkLoading(false)
    }
  }

  const startEditKeyword = (keyword: any) => {
    setEditingKeyword(keyword)
    setEditFormData({
      keyword: keyword.keyword || '',
      target_url: keyword.target_url || '',
      current_rank: keyword.current_rank?.toString() || '',
      target_rank: keyword.target_rank?.toString() || '',
      difficulty: keyword.difficulty || 'medium',
      search_volume: keyword.search_volume?.toString() || '',
      competition: keyword.competition || 'medium',
      notes: keyword.notes || ''
    })
  }

  const cancelEdit = () => {
    setEditingKeyword(null)
    setEditFormData({
      keyword: '',
      target_url: '',
      current_rank: '',
      target_rank: '',
      difficulty: 'medium',
      search_volume: '',
      competition: 'medium',
      notes: ''
    })
  }

  const updateKeyword = async (keywordId: number) => {
    try {
      const keywordData = {
        keyword: editFormData.keyword,
        target_url: editFormData.target_url || null,
        current_rank: editFormData.current_rank ? parseInt(editFormData.current_rank) : null,
        target_rank: editFormData.target_rank ? parseInt(editFormData.target_rank) : null,
        difficulty: editFormData.difficulty,
        search_volume: editFormData.search_volume ? parseInt(editFormData.search_volume) : null,
        competition: editFormData.competition,
        notes: editFormData.notes || null
      }

      const response = await fetch(`/api/admin/clients/${clientId}/keywords/${keywordId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keywordData)
      })

      if (response.ok) {
        cancelEdit()
        fetchKeywords()
      }
    } catch (error) {
      console.error('Error updating keyword:', error)
    }
  }

  const deleteKeyword = async (keywordId: number) => {
    if (!confirm('Are you sure you want to delete this keyword?')) return

    try {
      const response = await fetch(`/api/admin/clients/${clientId}/keywords/${keywordId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchKeywords()
      }
    } catch (error) {
      console.error('Error deleting keyword:', error)
    }
  }

  // Payment management functions
  const fetchPaymentInfo = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}/payment`)
      if (response.ok) {
        const data = await response.json()
        setPayments(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching payment info:', error)
      setPayments([])
    }
  }

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages')
      if (response.ok) {
        const result = await response.json()
        // API returns { success: true, data: [...] }
        const packagesData = result.data || result.packages || result
        setPackages(Array.isArray(packagesData) ? packagesData : [])
      }
    } catch (error) {
      console.error('Error fetching packages:', error)
      setPackages([])
    }
  }

  const savePaymentInfo = async () => {
    try {
      setPaymentLoading(true)
      const paymentData = {
        package_id: paymentFormData.is_custom ? null : (paymentFormData.package_id ? parseInt(paymentFormData.package_id) : null),
        package_name: paymentFormData.package_name || null,
        amount: paymentFormData.amount ? parseFloat(paymentFormData.amount) : null,
        billing_frequency: paymentFormData.billing_frequency,
        next_billing_date: paymentFormData.next_billing_date || null,
        start_date: paymentFormData.start_date || null,
        status: paymentFormData.status || 'active',
        is_custom: paymentFormData.is_custom,
        notes: paymentFormData.notes || null
      }

      let response
      if (editingPayment) {
        // Update existing payment
        response = await fetch(`/api/admin/clients/${clientId}/payment/${editingPayment.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentData)
        })
      } else {
        // Add new payment
        response = await fetch(`/api/admin/clients/${clientId}/payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentData)
        })
      }

      if (response.ok) {
        setEditingPayment(null)
        setShowAddPayment(false)
        resetPaymentForm()
        fetchPaymentInfo()
      }
    } catch (error) {
      console.error('Error saving payment info:', error)
    } finally {
      setPaymentLoading(false)
    }
  }

  const startEditPayment = (payment: any) => {
    setEditingPayment(payment)
    setPaymentFormData({
      package_id: payment.package_id?.toString() || '',
      package_name: payment.package_name || '',
      amount: payment.amount?.toString() || '',
      billing_frequency: payment.billing_frequency || 'monthly',
      next_billing_date: payment.next_billing_date ? new Date(payment.next_billing_date).toISOString().split('T')[0] : '',
      start_date: payment.start_date ? new Date(payment.start_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      status: payment.status || 'active',
      is_custom: payment.is_custom || false,
      notes: payment.notes || ''
    })
    setShowAddPayment(true)
  }

  const cancelEditPayment = () => {
    setEditingPayment(null)
    setShowAddPayment(false)
    resetPaymentForm()
  }

  const resetPaymentForm = () => {
    setPaymentFormData({
      package_id: '',
      package_name: '',
      amount: '',
      billing_frequency: 'monthly',
      next_billing_date: '',
      start_date: new Date().toISOString().split('T')[0],
      status: 'active',
      is_custom: false,
      notes: ''
    })
  }

  const deletePayment = async (paymentId: number) => {
    if (!confirm('Are you sure you want to delete this payment?')) return

    try {
      const response = await fetch(`/api/admin/clients/${clientId}/payment/${paymentId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchPaymentInfo()
      }
    } catch (error) {
      console.error('Error deleting payment:', error)
    }
  }

  const calculateTotalYearlyRevenue = () => {
    return payments.reduce((total, payment) => {
      if (!payment.amount) return total
      const amount = parseFloat(payment.amount)
      switch (payment.billing_frequency) {
        case 'monthly':
          return total + (amount * 12)
        case 'yearly':
          return total + amount
        case 'one-time':
          return total + amount
        default:
          return total
      }
    }, 0)
  }

  const calculateYearlyRevenueForPayment = (payment: any) => {
    if (!payment.amount) return 0
    const amount = parseFloat(payment.amount)
    switch (payment.billing_frequency) {
      case 'monthly':
        return amount * 12
      case 'yearly':
        return amount
      case 'one-time':
        return amount
      default:
        return 0
    }
  }

  const calculateNextDueDate = (nextBillingDate: string) => {
    if (!nextBillingDate) return 'Not set'
    const nextDate = new Date(nextBillingDate)
    const today = new Date()
    const diffTime = nextDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`
    } else if (diffDays === 0) {
      return 'Due today'
    } else if (diffDays === 1) {
      return 'Due tomorrow'
    } else {
      return `Due in ${diffDays} days`
    }
  }

  const getNextPaymentDue = () => {
    if (payments.length === 0) return 'No payments'
    
    const upcomingPayments = payments
      .filter(p => p.next_billing_date)
      .sort((a, b) => new Date(a.next_billing_date).getTime() - new Date(b.next_billing_date).getTime())
    
    if (upcomingPayments.length === 0) return 'Not set'
    
    return calculateNextDueDate(upcomingPayments[0].next_billing_date)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading client...</p>
        </div>
      </div>
    )
  }

  if (error && !client) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Client</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchClient}
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Edit Client</h1>
            <p className="mt-1 text-sm text-gray-500">
              Update client information for {client?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
          {activeTab === 'info' && (
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white rounded-lg shadow">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'info'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Client Information
          </button>
          <button
            onClick={() => setActiveTab('keywords')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'keywords'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Keywords ({keywords.length})
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'payments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Payments & Revenue
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Enter client's full name"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="client@company.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Company name"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="https://company.com"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Technology, Healthcare, etc."
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="City, State"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="prospect">Prospect</option>
              </select>
            </div>

            {/* Website Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website Status
              </label>
              <select
                name="website_status"
                value={formData.website_status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white"
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* SEO Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Status
              </label>
              <select
                name="seo_status"
                value={formData.seo_status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white"
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Billing Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Date
              </label>
              <input
                type="date"
                name="billing_date"
                value={formData.billing_date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>

            {/* Join Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Join Date
              </label>
              <input
                type="date"
                name="join_date"
                value={formData.join_date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white"
              >
                <option value="">Select Payment Method</option>
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="check">Check</option>
                <option value="cash">Cash</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Leave blank to keep current password"
              />
              <p className="text-xs text-gray-500 mt-1">Leave blank to keep current password</p>
            </div>
          </div>
        </form>
      </div>
      )}

      {/* Keywords Tab */}
      {activeTab === 'keywords' && (
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            {/* Mode Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add Keywords</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setAddMode('bulk')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      addMode === 'bulk'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Bulk Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddMode('single')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      addMode === 'single'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Single Add
                  </button>
                </div>
              </div>

              {/* Bulk Add Form */}
              {addMode === 'bulk' && (
                <form onSubmit={addBulkKeywords} className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Keywords (one per line)
                      </label>
                      <textarea
                        value={bulkKeywords}
                        onChange={(e) => setBulkKeywords(e.target.value)}
                        placeholder="seo services rhode island&#10;web design providence&#10;digital marketing ri&#10;local seo near me&#10;website development services"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        rows={10}
                        required
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Enter one keyword per line. Additional details can be edited after submission.
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={bulkLoading}
                      className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
                    >
                      {bulkLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Adding {bulkKeywords.split('\n').filter(line => line.trim()).length} keywords...
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 mr-2" />
                          Add {bulkKeywords.split('\n').filter(line => line.trim()).length || 0} Keywords
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Single Add Form */}
              {addMode === 'single' && (
                <form onSubmit={addKeyword} className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keyword *
                    </label>
                    <input
                      type="text"
                      value={newKeyword.keyword}
                      onChange={(e) => setNewKeyword(prev => ({ ...prev, keyword: e.target.value }))}
                      placeholder="Enter keyword"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target URL
                    </label>
                    <input
                      type="url"
                      value={newKeyword.target_url}
                      onChange={(e) => setNewKeyword(prev => ({ ...prev, target_url: e.target.value }))}
                      placeholder="https://example.com/page"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Rank
                    </label>
                    <input
                      type="number"
                      value={newKeyword.current_rank}
                      onChange={(e) => setNewKeyword(prev => ({ ...prev, current_rank: e.target.value }))}
                      placeholder="50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Rank
                    </label>
                    <input
                      type="number"
                      value={newKeyword.target_rank}
                      onChange={(e) => setNewKeyword(prev => ({ ...prev, target_rank: e.target.value }))}
                      placeholder="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={newKeyword.difficulty}
                      onChange={(e) => setNewKeyword(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Search Volume
                    </label>
                    <input
                      type="number"
                      value={newKeyword.search_volume}
                      onChange={(e) => setNewKeyword(prev => ({ ...prev, search_volume: e.target.value }))}
                      placeholder="1000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <input
                      type="text"
                      value={newKeyword.notes}
                      onChange={(e) => setNewKeyword(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Additional notes about this keyword"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="lg:col-span-1 flex items-end">
                    <button
                      type="submit"
                      disabled={keywordLoading}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {keywordLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Keyword
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
              )}
            </div>

            {/* Keywords List */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Keywords List ({keywords.length})</h3>
              {keywords.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No keywords added yet. Add your first keyword above.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Keyword
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Target URL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Target Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Difficulty
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Search Volume
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {keywords.map((keyword: any) => (
                        editingKeyword?.id === keyword.id ? (
                          // Edit Mode Row
                          <tr key={keyword.id} className="bg-blue-50">
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                value={editFormData.keyword}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, keyword: e.target.value }))}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                placeholder="Keyword"
                              />
                              <input
                                type="text"
                                value={editFormData.notes}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, notes: e.target.value }))}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded mt-1"
                                placeholder="Notes"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="url"
                                value={editFormData.target_url}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, target_url: e.target.value }))}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                placeholder="Target URL"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="number"
                                value={editFormData.current_rank}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, current_rank: e.target.value }))}
                                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                                placeholder="Rank"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="number"
                                value={editFormData.target_rank}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, target_rank: e.target.value }))}
                                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                                placeholder="Target"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <select
                                value={editFormData.difficulty}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                              >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="number"
                                value={editFormData.search_volume}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, search_volume: e.target.value }))}
                                className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                                placeholder="Volume"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => updateKeyword(keyword.id)}
                                  className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Save"
                                >
                                  <Save size={16} />
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Cancel"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          // View Mode Row
                          <tr key={keyword.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{keyword.keyword}</div>
                              {keyword.notes && (
                                <div className="text-sm text-gray-500">{keyword.notes}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {keyword.target_url ? (
                                  <a href={keyword.target_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                    {keyword.target_url.length > 30 ? `${keyword.target_url.substring(0, 30)}...` : keyword.target_url}
                                  </a>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                keyword.current_rank && keyword.current_rank <= 10 
                                  ? 'bg-green-100 text-green-800'
                                  : keyword.current_rank && keyword.current_rank <= 50
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {keyword.current_rank || 'N/A'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {keyword.target_rank || 'N/A'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                                keyword.difficulty === 'easy'
                                  ? 'bg-green-100 text-green-800'
                                  : keyword.difficulty === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {keyword.difficulty}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {keyword.search_volume ? keyword.search_volume.toLocaleString() : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => startEditKeyword(keyword)}
                                  className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit Keyword"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => deleteKeyword(keyword.id)}
                                  className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete Keyword"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            {/* Revenue Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Active Payments</p>
                    <p className="text-3xl font-bold text-green-900 mt-2">
                      {payments.length}
                    </p>
                    <p className="text-xs text-green-700 mt-1">Total: ${payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0).toLocaleString()}/mo</p>
                  </div>
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Yearly Revenue</p>
                    <p className="text-3xl font-bold text-blue-900 mt-2">
                      ${calculateTotalYearlyRevenue().toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">From all payments</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-800">Next Payment</p>
                    <p className="text-xl font-bold text-purple-900 mt-2">
                      {getNextPaymentDue()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details Section */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Payments ({payments.length})</h3>
                {!showAddPayment && (
                  <button
                    onClick={() => setShowAddPayment(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment
                  </button>
                )}
              </div>

              {showAddPayment ? (
                // Edit Mode
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={paymentFormData.is_custom}
                        onChange={(e) => {
                          setPaymentFormData(prev => ({ ...prev, is_custom: e.target.checked, package_id: '' }))
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Custom Package</span>
                    </label>
                  </div>

                  {!paymentFormData.is_custom ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Package
                      </label>
                      <select
                        value={paymentFormData.package_id}
                        onChange={(e) => {
                          const selectedPackage = packages.find(pkg => (pkg.package_id || pkg.id) === parseInt(e.target.value))
                          setPaymentFormData(prev => ({
                            ...prev,
                            package_id: e.target.value,
                            package_name: selectedPackage?.name || selectedPackage?.tier_name || '',
                            amount: selectedPackage?.price?.toString() || ''
                          }))
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">
                          {Array.isArray(packages) && packages.length > 0 
                            ? 'Select a package' 
                            : 'No packages available - use custom package'}
                        </option>
                        {Array.isArray(packages) && packages.map((pkg) => (
                          <option key={pkg.package_id || pkg.id} value={pkg.package_id || pkg.id}>
                            {pkg.name || pkg.tier_name} - ${pkg.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Package Name
                      </label>
                      <input
                        type="text"
                        value={paymentFormData.package_name}
                        onChange={(e) => setPaymentFormData(prev => ({ ...prev, package_name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Custom SEO Package"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={paymentFormData.amount}
                        onChange={(e) => setPaymentFormData(prev => ({ ...prev, amount: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Billing Frequency
                      </label>
                      <select
                        value={paymentFormData.billing_frequency}
                        onChange={(e) => setPaymentFormData(prev => ({ ...prev, billing_frequency: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="one-time">One-time</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Next Billing Date
                    </label>
                    <input
                      type="date"
                      value={paymentFormData.next_billing_date}
                      onChange={(e) => setPaymentFormData(prev => ({ ...prev, next_billing_date: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={paymentFormData.notes}
                      onChange={(e) => setPaymentFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any additional payment notes..."
                    />
                  </div>

                  <div className="flex items-center space-x-3 pt-4">
                    <button
                      onClick={savePaymentInfo}
                      disabled={paymentLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {paymentLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Payment Info
                        </>
                      )}
                    </button>
                    <button
                      onClick={cancelEditPayment}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // List of Payments
                <div className="space-y-4">
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <div key={payment.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">
                                {payment.package_name || 'Unnamed Package'}
                              </h4>
                              {payment.is_custom && (
                                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                  Custom
                                </span>
                              )}
                              <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                                payment.status === 'active' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {payment.status || 'active'}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Amount</p>
                                <p className="font-semibold text-gray-900">${parseFloat(payment.amount).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Frequency</p>
                                <p className="font-semibold text-gray-900 capitalize">{payment.billing_frequency}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Yearly Value</p>
                                <p className="font-semibold text-gray-900">${calculateYearlyRevenueForPayment(payment).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Next Due</p>
                                <p className="font-semibold text-gray-900">
                                  {payment.next_billing_date 
                                    ? new Date(payment.next_billing_date).toLocaleDateString()
                                    : 'Not set'}
                                </p>
                              </div>
                            </div>
                            {payment.notes && (
                              <p className="text-sm text-gray-600 mt-2">{payment.notes}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => startEditPayment(payment)}
                              className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Payment"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => deletePayment(payment.id)}
                              className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Payment"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 mb-4">No payments set up yet.</p>
                      <button
                        onClick={() => setShowAddPayment(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Payment
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
