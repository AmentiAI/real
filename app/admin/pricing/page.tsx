'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Service {
  id: string
  title: string
  description: string
  icon: string
  category: string
  tiers: Tier[]
}

interface Tier {
  name: string
  price: string
  setupPrice: string
  monthlyPrice: string
  period: string
  popular: boolean
  bestFor: string
  features: string[]
}

export default function AdminPricingPage() {
  const [services, setServices] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [editingTier, setEditingTier] = useState<number | null>(null)
  const [isAddingService, setIsAddingService] = useState(false)
  const [isAddingTier, setIsAddingTier] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveService = async (service: Service) => {
    try {
      const response = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      })
      
      if (response.ok) {
        setServices(services.map(s => s.id === service.id ? service : s))
        setEditingService(null)
      }
    } catch (error) {
      console.error('Error saving service:', error)
    }
  }

  const deleteService = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    
    try {
      const response = await fetch(`/api/admin/services/${serviceId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setServices(services.filter(s => s.id !== serviceId))
      }
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }

  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      })
      
      if (response.ok) {
        const newService = await response.json()
        setServices([...services, newService])
        setIsAddingService(false)
      }
    } catch (error) {
      console.error('Error adding service:', error)
    }
  }

  const updateTier = (serviceId: string, tierIndex: number, updatedTier: Tier) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        const newTiers = [...service.tiers]
        newTiers[tierIndex] = updatedTier
        return { ...service, tiers: newTiers }
      }
      return service
    })
    setServices(updatedServices)
  }

  const addTier = (serviceId: string, newTier: Tier) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        return { ...service, tiers: [...service.tiers, newTier] }
      }
      return service
    })
    setServices(updatedServices)
  }

  const deleteTier = (serviceId: string, tierIndex: number) => {
    if (!confirm('Are you sure you want to delete this tier?')) return
    
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        const newTiers = service.tiers.filter((_, index) => index !== tierIndex)
        return { ...service, tiers: newTiers }
      }
      return service
    })
    setServices(updatedServices)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center text-gray-600 hover:text-primary-600 mr-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Admin
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Pricing Management</h1>
            </div>
            <button
              onClick={() => setIsAddingService(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Services List */}
        <div className="space-y-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{service.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-2 ${
                        service.category === 'White Label Services'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingService(service)}
                      className="btn-secondary flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Service
                    </button>
                    <button
                      onClick={() => deleteService(service.id)}
                      className="btn-ghost text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Tiers */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">Pricing Tiers</h4>
                    <button
                      onClick={() => {
                        setEditingService(service)
                        setIsAddingTier(true)
                      }}
                      className="btn-ghost text-primary-600 hover:bg-primary-50 flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Tier
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {service.tiers.map((tier, tierIndex) => (
                      <div key={tierIndex} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">{tier.name}</h5>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => {
                                setEditingService(service)
                                setEditingTier(tierIndex)
                              }}
                              className="text-gray-400 hover:text-primary-600"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteTier(service.id, tierIndex)}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-primary-600 mb-2">{tier.price}</div>
                        <div className="text-sm text-gray-500 mb-2">{tier.period}</div>
                        <div className="text-xs text-gray-600 mb-2">Best for: {tier.bestFor}</div>
                        {tier.popular && (
                          <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs font-semibold rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Service Modal */}
        {isAddingService && (
          <ServiceModal
            service={null}
            onSave={addService}
            onClose={() => setIsAddingService(false)}
          />
        )}

        {/* Edit Service Modal */}
        {editingService && !isAddingTier && (
          <ServiceModal
            service={editingService}
            onSave={saveService}
            onClose={() => setEditingService(null)}
          />
        )}

        {/* Add/Edit Tier Modal */}
        {editingService && (editingTier !== null || isAddingTier) && (
          <TierModal
            service={editingService}
            tier={editingTier !== null ? editingService.tiers[editingTier] : null}
            onSave={(updatedTier) => {
              if (editingTier !== null) {
                updateTier(editingService.id, editingTier, updatedTier)
              } else {
                addTier(editingService.id, updatedTier)
              }
              setEditingTier(null)
              setIsAddingTier(false)
              setEditingService(null)
            }}
            onClose={() => {
              setEditingTier(null)
              setIsAddingTier(false)
              setEditingService(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

// Service Modal Component
function ServiceModal({ service, onSave, onClose }: {
  service: Service | null
  onSave: (service: Service) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    id: service?.id || '',
    title: service?.title || '',
    description: service?.description || '',
    icon: service?.icon || '',
    category: service?.category || 'Direct Services',
    tiers: service?.tiers || []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as Service)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {service ? 'Edit Service' : 'Add Service'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., complete-growth-packages"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., Complete Growth Packages"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              placeholder="Brief description of the service"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Icon (Emoji)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="🚀"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="Direct Services">Direct Services</option>
              <option value="White Label Services">White Label Services</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Save className="w-4 h-4 mr-2" />
              Save Service
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Tier Modal Component
function TierModal({ service, tier, onSave, onClose }: {
  service: Service
  tier: Tier | null
  onSave: (tier: Tier) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    name: tier?.name || '',
    price: tier?.price || '',
    setupPrice: tier?.setupPrice || '',
    monthlyPrice: tier?.monthlyPrice || '',
    period: tier?.period || 'one-time',
    popular: tier?.popular || false,
    bestFor: tier?.bestFor || '',
    features: tier?.features || ['']
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tierData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== '')
    }
    onSave(tierData as Tier)
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({ ...formData, features: newFeatures })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {tier ? 'Edit Tier' : 'Add Tier'} - {service.title}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tier Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Starter Package"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Display Price</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., $2,200 + $1,200/mo"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Setup Price</label>
              <input
                type="text"
                value={formData.setupPrice}
                onChange={(e) => setFormData({ ...formData, setupPrice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., $2,200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Price</label>
              <input
                type="text"
                value={formData.monthlyPrice}
                onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., $1,200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Period</label>
              <select
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="one-time">One-time</option>
                <option value="monthly">Monthly</option>
                <option value="setup + monthly">Setup + Monthly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Best For</label>
            <input
              type="text"
              value={formData.bestFor}
              onChange={(e) => setFormData({ ...formData, bestFor: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., local shops, contractors, salons, restaurants"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="popular"
              checked={formData.popular}
              onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="popular" className="ml-2 text-sm text-gray-700">
              Mark as Popular
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Features</label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Feature description"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="btn-ghost text-primary-600 hover:bg-primary-50 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Save className="w-4 h-4 mr-2" />
              Save Tier
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
