'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, CheckCircle, Star, ArrowRight, ChevronDown } from 'lucide-react'
import { useBranding } from '@/components/BrandingProvider'

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

interface Product {
  id: number
  name: string
  description: string
  icon: any
  color: string
  gradient: string
  textGradient: string
  badgeColor: string
  bgGradient: string
  hoverColor: string
  tiers: PricingTier[]
}

interface CheckoutForm {
  productId: string
  tierId: string
  clientName: string
  clientEmail: string
  company: string
  website: string
  phone: string
  industry: string
  agreeToTerms: boolean
  subscribeToNewsletter: boolean
}

const productConfigs = {
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

function CheckoutContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const { branding } = useBranding()
  
  const [formData, setFormData] = useState<CheckoutForm>({
    productId: '',
    tierId: '',
    clientName: '',
    clientEmail: '',
    company: '',
    website: '',
    phone: '',
    industry: '',
    agreeToTerms: false,
    subscribeToNewsletter: false
  })

  useEffect(() => {
    fetchProducts()
    
    const productId = searchParams.get('product')
    if (productId) {
      setFormData(prev => ({ ...prev, productId }))
    }
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/packages')
      const data = await response.json()
      
      if (data.success && data.data && data.data.length > 0) {
        // Group packages by service
        const groupedProducts = data.data.reduce((acc: Record<string, Product>, pkg: any) => {
          // Skip if no package_id (service without tiers)
          if (!pkg.package_id) return acc
          
          const productName = pkg.service_name || 'Service'
          
          if (!acc[productName]) {
            const config = productConfigs[productName as keyof typeof productConfigs] || productConfigs['Complete Growth Packages']
            acc[productName] = {
              id: Object.keys(acc).length + 1,
              name: productName,
              description: pkg.service_description || `Professional ${productName.toLowerCase()} that deliver measurable results`,
              icon: pkg.service_icon || config.icon,
              color: config.color,
              gradient: config.gradient,
              textGradient: config.textGradient,
              badgeColor: config.badgeColor,
              bgGradient: config.bgGradient,
              hoverColor: config.hoverColor,
              tiers: []
            }
          }
          
          // Add package tier
          acc[productName].tiers.push({
            id: pkg.package_id,
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
          
          return acc
        }, {})
        
        // Convert to array and sort tiers within each product
        const productsArray = Object.values(groupedProducts).map(product => ({
          ...product,
          tiers: product.tiers.sort((a, b) => a.display_order - b.display_order)
        }))
        
        setProducts(productsArray)
        console.log('Loaded products from database:', productsArray)
      } else {
        console.log('No products found in database, showing empty state')
        setProducts([])
      }
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    setSelectedTier(null) // Reset tier selection when product changes
    setFormData(prev => ({ 
      ...prev, 
      productId: product.id.toString(),
      tierId: ''
    }))
    setShowDropdown(false)
  }

  const handleTierSelect = (tier: PricingTier) => {
    setSelectedTier(tier)
    setFormData(prev => ({ ...prev, tierId: tier.id.toString() }))
  }

  const handleInputChange = (field: keyof CheckoutForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedProduct) {
      setError('Please select a service')
      return
    }

    if (!selectedTier) {
      setError('Please select a pricing tier')
      return
    }

    if (!formData.clientName || !formData.clientEmail || !formData.phone) {
      setError('Please fill in all required fields')
      return
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions')
      return
    }

    setProcessing(true)
    setError('')

    try {
      // Here you would typically send the form data to your payment processor
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to success page
      window.location.href = '/payment/success'
    } catch (err) {
      setError('Payment processing failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-slate-600 text-lg">Loading checkout...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No Services Available</h2>
          <p className="text-slate-600 mb-6">
            No services have been configured yet. Please contact us to set up your custom packages.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full text-blue-700 text-sm font-medium mb-8 shadow-lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Choose Your Service & Pricing
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-8">
            Get Started Today
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Select your service and choose the perfect pricing tier for your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Service Selection */}
          <div className="space-y-8">
            <div>
              <label className="block text-2xl font-bold text-slate-900 mb-6">
                Select Your Service
              </label>
              
              {/* Service Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl p-6 text-left hover:border-blue-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {selectedProduct ? (
                        <>
                          <span className="text-3xl mr-4">{selectedProduct.icon}</span>
                          <div>
                            <div className="text-xl font-bold text-slate-900">{selectedProduct.name}</div>
                            <div className="text-slate-600">{selectedProduct.description}</div>
                          </div>
                        </>
                      ) : (
                        <div className="text-slate-500 text-lg">Choose a service...</div>
                      )}
                    </div>
                    <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-2xl z-10 overflow-hidden">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => handleProductSelect(product)}
                        className="w-full p-6 text-left hover:bg-slate-50 transition-colors duration-200 border-b border-slate-100 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <span className="text-3xl mr-4">{product.icon}</span>
                          <div>
                            <div className="text-xl font-bold text-slate-900">{product.name}</div>
                            <div className="text-slate-600">{product.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Tiers */}
            {selectedProduct && (
              <div>
                <label className="block text-2xl font-bold text-slate-900 mb-6">
                  Choose Your Pricing Tier
                </label>
                <div className="space-y-4">
                  {selectedProduct.tiers.map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => handleTierSelect(tier)}
                      className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedTier?.id === tier.id
                          ? 'border-blue-500 bg-blue-50/50'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-bold text-slate-900 mr-3">{tier.name}</h3>
                            {tier.is_popular && (
                              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                                <Star className="w-4 h-4 mr-1" />
                                Most Popular
                              </div>
                            )}
                          </div>
                          <p className="text-slate-600 mb-3">{tier.description}</p>
                          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {formatPrice(tier.price, tier.currency, tier.billing_period)}
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedTier?.id === tier.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-300 group-hover:border-blue-400'
                        }`}>
                          {selectedTier?.id === tier.id && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-2xl font-bold text-slate-900 mb-6">
                  Contact Information
                </label>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">Select your industry</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="legal">Legal Services</option>
                      <option value="construction">Construction</option>
                      <option value="retail">Retail</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="professional-services">Professional Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        className="mt-1 mr-3 w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                        required
                      />
                      <span className="text-sm text-slate-600">
                        I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> *
                      </span>
                    </label>

                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.subscribeToNewsletter}
                        onChange={(e) => handleInputChange('subscribeToNewsletter', e.target.checked)}
                        className="mt-1 mr-3 w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-600">
                        Subscribe to our newsletter for marketing tips and updates
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={processing || !selectedProduct || !selectedTier}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Order
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-slate-600 text-lg">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}