'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Save, X, CheckCircle, Star, Search, Monitor, TrendingUp } from 'lucide-react'

interface PricingTier {
  id: number
  name: string
  description: string
  price: number
  currency: string
  billing_period: string
  features: string[]
  is_popular: boolean
  is_active: boolean
  display_order: number
}

interface Service {
  id: number
  package_id?: number
  name: string
  description: string
  icon: string
  color: string
  gradient: string
  textGradient: string
  badgeColor: string
  bgGradient: string
  hoverColor: string
  tiers: PricingTier[]
}

const serviceConfigs = {
  'SEO Services': {
    icon: '🔍',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    textGradient: 'from-slate-900 via-blue-900 to-indigo-900',
    badgeColor: 'border-blue-200/50 text-blue-700',
    bgGradient: 'from-blue-500/10 to-purple-500/10',
    hoverColor: 'group-hover:text-blue-600'
  },
  'Website Design': {
    icon: '💻',
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    textGradient: 'from-slate-900 via-green-900 to-blue-900',
    badgeColor: 'border-green-200/50 text-green-700',
    bgGradient: 'from-green-500/10 to-blue-500/10',
    hoverColor: 'group-hover:text-green-600'
  },
  'Complete Growth Packages': {
    icon: '📈',
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    textGradient: 'from-slate-900 via-purple-900 to-pink-900',
    badgeColor: 'border-purple-200/50 text-purple-700',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
    hoverColor: 'group-hover:text-purple-600'
  }
}

export default function PackagesPage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showTierModal, setShowTierModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    description: '',
    icon: '🔍',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    textGradient: 'from-slate-900 via-blue-900 to-indigo-900',
    badgeColor: 'border-blue-200/50 text-blue-700',
    bgGradient: 'from-blue-500/10 to-purple-500/10',
    hoverColor: 'group-hover:text-blue-600'
  })
  
  const [tierFormData, setTierFormData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'USD',
    billing_period: 'monthly',
    features: [] as string[],
    is_popular: false,
    is_active: true,
    display_order: 1
  })
  
  const [newFeature, setNewFeature] = useState('')
  const [newTierFeature, setNewTierFeature] = useState('')

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/packages')
      const data = await response.json()
      
      if (data.success && data.data && data.data.length > 0) {
        // Group packages by service type
        const groupedServices = data.data.reduce((acc: Record<string, Service>, pkg: any) => {
          // Use the actual service_name from the database, or infer it
          const serviceName = pkg.service_name || 
                             (pkg.name?.includes('SEO') ? 'SEO Services' : 
                             pkg.name?.includes('Website') ? 'Website Design' : 
                             'Complete Growth Packages')
          
          if (!acc[serviceName]) {
            const config = serviceConfigs[serviceName as keyof typeof serviceConfigs] || serviceConfigs['SEO Services']
            acc[serviceName] = {
              id: pkg.id,  // Use the actual package ID from database
              package_id: pkg.id,  // Store the package ID for adding tiers
              name: serviceName,
              description: pkg.service_description || `Professional ${serviceName.toLowerCase()} that deliver measurable results`,
              icon: config.icon,
              color: config.color,
              gradient: config.gradient,
              textGradient: config.textGradient,
              badgeColor: config.badgeColor,
              bgGradient: config.bgGradient,
              hoverColor: config.hoverColor,
              tiers: []
            }
          }
          
          // Only add tiers that exist (package_id will be null if no tiers exist yet)
          if (pkg.package_id) {
            acc[serviceName].tiers.push({
              id: pkg.package_id,  // This is the tier ID from package_tiers
              name: pkg.name,
              description: pkg.description,
              price: pkg.price,
              currency: pkg.currency,
              billing_period: pkg.billing_period,
              features: pkg.features || [],
              is_popular: pkg.is_popular,
              is_active: pkg.is_active,
              display_order: pkg.display_order
            })
          }
          
          return acc
        }, {})
        
        // Convert to array and sort tiers within each service
        const servicesArray = Object.values(groupedServices).map(service => ({
          ...service,
          tiers: service.tiers.sort((a, b) => a.display_order - b.display_order)
        }))
        
        setServices(servicesArray)
      } else {
        // Initialize with empty services if none found
        setServices([])
      }
    } catch (err) {
      setError('Failed to fetch services')
    } finally {
      setLoading(false)
    }
  }

  const handleAddService = () => {
    setEditingService(null)
    setServiceFormData({
      name: '',
      description: '',
      icon: '🔍',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      textGradient: 'from-slate-900 via-blue-900 to-indigo-900',
      badgeColor: 'border-blue-200/50 text-blue-700',
      bgGradient: 'from-blue-500/10 to-purple-500/10',
      hoverColor: 'group-hover:text-blue-600'
    })
    setShowServiceModal(true)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setServiceFormData({
      name: service.name,
      description: service.description,
      icon: service.icon,
      color: service.color,
      gradient: service.gradient,
      textGradient: service.textGradient,
      badgeColor: service.badgeColor,
      bgGradient: service.bgGradient,
      hoverColor: service.hoverColor
    })
    setShowServiceModal(true)
  }

  const handleSaveService = async () => {
    try {
      // Here you would save the service to the database
      // For now, we'll just update the local state
      const newService: Service = {
        id: editingService?.id || Date.now(),
        name: serviceFormData.name,
        description: serviceFormData.description,
        icon: serviceFormData.icon,
        color: serviceFormData.color,
        gradient: serviceFormData.gradient,
        textGradient: serviceFormData.textGradient,
        badgeColor: serviceFormData.badgeColor,
        bgGradient: serviceFormData.bgGradient,
        hoverColor: serviceFormData.hoverColor,
        tiers: editingService?.tiers || []
      }

      if (editingService) {
        setServices(prev => prev.map(s => s.id === editingService.id ? newService : s))
      } else {
        setServices(prev => [...prev, newService])
      }

      setShowServiceModal(false)
      setEditingService(null)
    } catch (err) {
      setError('Failed to save service')
    }
  }

  const handleAddTier = (service: Service) => {
    setSelectedService(service)
    setEditingTier(null)
    setTierFormData({
      name: '',
      description: '',
      price: '',
      currency: 'USD',
      billing_period: 'monthly',
      features: [],
      is_popular: false,
      is_active: true,
      display_order: service.tiers.length + 1
    })
    setShowTierModal(true)
  }

  const handleEditTier = (tier: PricingTier, service: Service) => {
    setSelectedService(service)
    setEditingTier(tier)
    setTierFormData({
      name: tier.name,
      description: tier.description,
      price: tier.price.toString(),
      currency: tier.currency,
      billing_period: tier.billing_period,
      features: tier.features,
      is_popular: tier.is_popular,
      is_active: tier.is_active,
      display_order: tier.display_order
    })
    setShowTierModal(true)
  }

  const handleSaveTier = async () => {
    if (!selectedService) return

    try {
      const tierData = {
        package_id: selectedService.package_id,
        name: tierFormData.name,
        description: tierFormData.description,
        price: parseFloat(tierFormData.price),
        currency: tierFormData.currency,
        billing_period: tierFormData.billing_period,
        features: tierFormData.features,
        is_popular: tierFormData.is_popular,
        is_active: tierFormData.is_active,
        display_order: tierFormData.display_order
      }

      if (editingTier) {
        // Update existing tier
        const response = await fetch('/api/packages', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...tierData,
            id: editingTier.id
          })
        })

        const result = await response.json()
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to update tier')
        }
      } else {
        // Create new tier
        const response = await fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tierData)
        })

        const result = await response.json()
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to add tier')
        }
      }

      // Refresh services from database
      await fetchServices()

      setShowTierModal(false)
      setEditingTier(null)
      setSelectedService(null)
      setError('')
    } catch (err) {
      console.error('Error saving tier:', err)
      setError(err instanceof Error ? err.message : 'Failed to save tier')
    }
  }

  const handleDeleteTier = async (tierId: number, serviceId: number) => {
    if (!confirm('Are you sure you want to delete this pricing tier?')) return

    try {
      setError('')
      const response = await fetch(`/api/packages?id=${tierId}`, {
        method: 'DELETE'
      })

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete tier')
      }

      // Refresh services from database
      await fetchServices()
    } catch (err) {
      console.error('Error deleting tier:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete tier')
      // Show error for 5 seconds then clear
      setTimeout(() => setError(''), 5000)
    }
  }

  const addFeature = (isTier: boolean = false) => {
    const feature = isTier ? newTierFeature : newFeature
    if (!feature.trim()) return

    if (isTier) {
      setTierFormData(prev => ({
        ...prev,
        features: [...prev.features, feature.trim()]
      }))
      setNewTierFeature('')
    } else {
      setServiceFormData(prev => ({
        ...prev,
        features: [...(prev as any).features, feature.trim()]
      }))
      setNewFeature('')
    }
  }

  const removeFeature = (index: number, isTier: boolean = false) => {
    if (isTier) {
      setTierFormData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }))
    } else {
      setServiceFormData(prev => ({
        ...prev,
        features: (prev as any).features.filter((_: any, i: number) => i !== index)
      }))
    }
  }

  const formatPrice = (price: number, currency: string, period: string) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
    
    if (period === 'one-time') {
      return formattedPrice
    }
    return `${formattedPrice}/${period}`
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <p className="text-slate-600 text-lg">Loading services...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Services & Pricing Management</h1>
            <p className="text-slate-600">Manage your services and their pricing tiers</p>
          </div>
          <button
            onClick={handleAddService}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Service
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Services List */}
        <div className="space-y-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              {/* Service Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{service.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">{service.name}</h2>
                    <p className="text-slate-600">{service.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleEditService(service)}
                  className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>

              {/* Pricing Tiers */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {service.tiers.map((tier) => (
                  <div key={tier.id} className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                    tier.is_popular ? 'border-blue-500/50 bg-blue-50/50' : 'border-slate-200 hover:border-blue-300'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <h3 className="text-xl font-bold text-slate-900 mr-3">{tier.name}</h3>
                        {tier.is_popular && (
                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            Popular
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditTier(tier, service)}
                          className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors duration-200"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTier(tier.id, service.id)}
                          className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-4">{tier.description}</p>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      {formatPrice(tier.price, tier.currency, tier.billing_period)}
                    </div>
                    <div className="space-y-2">
                      {tier.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 text-sm">{feature}</span>
                        </div>
                      ))}
                      {tier.features.length > 3 && (
                        <div className="text-slate-500 text-sm">
                          +{tier.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Tier Button */}
              <button
                onClick={() => handleAddTier(service)}
                className="w-full border-2 border-dashed border-slate-300 rounded-2xl p-6 text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Pricing Tier
              </button>
            </div>
          ))}

          {services.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No services yet</h3>
              <p className="text-slate-600 mb-6">Create your first service to get started</p>
              <button
                onClick={handleAddService}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Add Your First Service
              </button>
            </div>
          )}
        </div>

        {/* Service Modal */}
        {showServiceModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Name
                  </label>
                  <input
                    type="text"
                    value={serviceFormData.name}
                    onChange={(e) => setServiceFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="e.g., SEO Services"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={serviceFormData.description}
                    onChange={(e) => setServiceFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    rows={3}
                    placeholder="Describe what this service offers..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={serviceFormData.icon}
                    onChange={(e) => setServiceFormData(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="🔍"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowServiceModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveService}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    {editingService ? 'Update Service' : 'Create Service'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tier Modal */}
        {showTierModal && selectedService && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingTier ? 'Edit Pricing Tier' : 'Add Pricing Tier'}
                </h2>
                <button
                  onClick={() => setShowTierModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Tier Name
                    </label>
                    <input
                      type="text"
                      value={tierFormData.name}
                      onChange={(e) => setTierFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="e.g., Basic, Professional, Enterprise"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      value={tierFormData.price}
                      onChange={(e) => setTierFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={tierFormData.description}
                    onChange={(e) => setTierFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    rows={3}
                    placeholder="Describe this pricing tier..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={tierFormData.currency}
                      onChange={(e) => setTierFormData(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Billing Period
                    </label>
                    <select
                      value={tierFormData.billing_period}
                      onChange={(e) => setTierFormData(prev => ({ ...prev, billing_period: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="one-time">One-time</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Features
                  </label>
                  <div className="space-y-2 mb-4">
                    {tierFormData.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                        <span className="text-slate-700">{feature}</span>
                        <button
                          onClick={() => removeFeature(index, true)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTierFeature}
                      onChange={(e) => setNewTierFeature(e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Add a feature..."
                      onKeyPress={(e) => e.key === 'Enter' && addFeature(true)}
                    />
                    <button
                      onClick={() => addFeature(true)}
                      className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={tierFormData.is_popular}
                      onChange={(e) => setTierFormData(prev => ({ ...prev, is_popular: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-slate-700">Mark as Most Popular</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={tierFormData.is_active}
                      onChange={(e) => setTierFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-slate-700">Active</span>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowTierModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTier}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    {editingTier ? 'Update Tier' : 'Add Tier'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}