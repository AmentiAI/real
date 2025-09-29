'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowLeft, CreditCard, Shield, Clock } from 'lucide-react'
import Link from 'next/link'

const defaultServices = [
  {
    id: 'complete-growth-packages',
    title: 'Complete Growth Packages',
    description: 'All-in-one solutions combining website development with ongoing SEO for maximum business growth.',
    icon: '🚀',
    category: 'Direct Services',
    tiers: [
      {
        name: 'Starter Growth Package',
        price: '$2,200 + $1,200/mo',
        setupPrice: '$2,200',
        monthlyPrice: '$1,200',
        period: 'setup + monthly',
        popular: false,
        bestFor: 'local shops, contractors, salons, restaurants',
        features: [
          'Up to 5-page SEO-ready site (responsive, mobile-first)',
          'Basic on-page SEO setup (titles, metadata, headers, alt tags)',
          'Blog section included for future growth',
          'Google Analytics + Search Console',
          '20 local keywords targeted',
          'Google Business Profile optimization',
          'Local directory submissions (Yelp, BBB, Maps, etc.)',
          'Basic backlinks (citations & local links)',
          'Monthly SEO performance report'
        ]
      },
      {
        name: 'Business Growth Package',
        price: '$5,000 + $3,500/mo',
        setupPrice: '$5,000',
        monthlyPrice: '$3,500',
        period: 'setup + monthly',
        popular: true,
        bestFor: 'law firms, e-commerce shops, agencies, clinics',
        features: [
          '10–15 page custom website',
          'Keyword-targeted service & location pages',
          'Blog system with categories/tags',
          'Lead capture forms (CRM/email integrations)',
          'Advanced speed + Core Web Vitals optimization',
          '60 targeted keywords (local + regional/national mix)',
          'Full technical SEO audit & fixes',
          'Keyword clustering + content gap strategy',
          '4 SEO-optimized blog posts/month',
          'Competitor tracking + rank monitoring',
          'White-hat backlink campaigns',
          'Live whitelabel analytics dashboard'
        ]
      },
      {
        name: 'Enterprise Domination Package',
        price: '$12,500 + $8,000/mo',
        setupPrice: '$12,500',
        monthlyPrice: '$8,000',
        period: 'setup + monthly',
        popular: false,
        bestFor: 'franchises, SaaS companies, large e-commerce',
        features: [
          '20–30+ page premium website (franchise, SaaS, or large e-com)',
          'Conversion funnels (booking, memberships, checkout/e-commerce)',
          'Multi-location SEO architecture',
          'Advanced schema markup (services, products, reviews, FAQs)',
          'Custom integrations (dashboards, APIs, automation)',
          '150 targeted keywords (local + national)',
          'Enterprise technical SEO (site architecture, schema layers, Core Web Vitals)',
          'Advanced backlink outreach (PR features, high DA guest posts)',
          'Content engine: 8+ SEO blogs/month + AI-powered automation',
          'Multi-location SEO strategy for franchises',
          'Conversion optimization (A/B testing, funnel tracking, heatmaps)',
          'Dedicated account manager + quarterly workshops'
        ]
      }
    ]
  },
  {
    id: 'website-design',
    title: 'Website Design & Development',
    description: 'Professional websites that convert visitors into customers with modern design and advanced functionality.',
    icon: '🖥️',
    category: 'Direct Services',
    tiers: [
      {
        name: 'Starter Website',
        price: '$1,000',
        setupPrice: '$1,000',
        monthlyPrice: '$0',
        period: 'one-time',
        popular: false,
        bestFor: 'small businesses, startups, personal brands',
        features: [
          'Up to 5 SEO-ready pages',
          'Mobile-friendly design',
          'Basic SEO setup',
          'Google Analytics'
        ]
      },
      {
        name: 'Growth Website',
        price: '$3,500',
        setupPrice: '$3,500',
        monthlyPrice: '$0',
        period: 'one-time',
        popular: true,
        bestFor: 'growing businesses, service companies',
        features: [
          '10-15 SEO-optimized pages',
          'Keyword-targeted copywriting',
          'Lead capture forms',
          'Blog system setup'
        ]
      },
      {
        name: 'Dominate Website',
        price: '$7,500+',
        setupPrice: '$7,500+',
        monthlyPrice: '$0',
        period: 'one-time',
        popular: false,
        bestFor: 'enterprises, e-commerce, franchises',
        features: [
          '20-30+ pages',
          'Conversion funnels',
          'Multi-location SEO',
          'Custom integrations'
        ]
      }
    ]
  },
  {
    id: 'seo-services',
    title: 'SEO Services',
    description: 'Comprehensive SEO strategies that dominate search results and drive qualified traffic to your business.',
    icon: '🔍',
    category: 'Direct Services',
    tiers: [
      {
        name: 'Starter SEO',
        price: '$1,200/mo',
        setupPrice: '$0',
        monthlyPrice: '$1,200',
        period: 'monthly',
        popular: false,
        bestFor: 'local businesses, small companies',
        features: [
          '20 local keywords',
          'Google Business optimization',
          'On-page SEO',
          'Monthly reports'
        ]
      },
      {
        name: 'Growth SEO',
        price: '$3,500/mo',
        setupPrice: '$0',
        monthlyPrice: '$3,500',
        period: 'monthly',
        popular: true,
        bestFor: 'regional businesses, growing companies',
        features: [
          '60 regional keywords',
          'Technical SEO audit',
          '4 blogs/month',
          'Backlink campaigns'
        ]
      },
      {
        name: 'Dominate SEO',
        price: '$8,000+/mo',
        setupPrice: '$0',
        monthlyPrice: '$8,000+',
        period: 'monthly',
        popular: false,
        bestFor: 'enterprises, national brands',
        features: [
          '150+ keywords',
          'Enterprise technical SEO',
          '8+ blogs/month',
          'Dedicated manager'
        ]
      }
    ]
  },
  {
    id: 'white-label-seo',
    title: 'White Label SEO',
    description: 'Agency-focused SEO services that you can resell to your clients at 2-3x markup for maximum profit.',
    icon: '🏷️',
    category: 'White Label Services',
    tiers: [
      {
        name: 'Starter SEO',
        price: '$1,200/mo',
        setupPrice: '$0',
        monthlyPrice: '$1,200',
        period: 'monthly',
        popular: false,
        bestFor: 'agencies starting SEO services',
        features: [
          '20 keywords (local focus)',
          'Google Business optimization',
          'On-page SEO + local citations',
          'Basic backlink building',
          'Monthly report (agency-branded)',
          'White-label support'
        ]
      },
      {
        name: 'Growth SEO',
        price: '$3,500/mo',
        setupPrice: '$0',
        monthlyPrice: '$3,500',
        period: 'monthly',
        popular: true,
        bestFor: 'established agencies with multiple clients',
        features: [
          '60 keywords (local + regional/national)',
          'Full technical SEO audit & fixes',
          '4 SEO-optimized blogs/month',
          'Competitor analysis + tracking',
          'White-hat backlinks',
          'Live dashboard (whitelabel)'
        ]
      },
      {
        name: 'Dominate SEO',
        price: '$8,000/mo',
        setupPrice: '$0',
        monthlyPrice: '$8,000',
        period: 'monthly',
        popular: false,
        bestFor: 'large agencies with enterprise clients',
        features: [
          '150 keywords (local + national)',
          'Enterprise technical SEO + architecture',
          'Advanced backlink & PR outreach',
          '8+ blogs/month + automation',
          'Multi-location SEO',
          'Dedicated account manager (invisible to client)'
        ]
      }
    ]
  },
  {
    id: 'white-label-web-design',
    title: 'White Label Website Design',
    description: 'Professional website design services for agencies to resell at 2-3x markup with full white-label support.',
    icon: '🖥️',
    category: 'White Label Services',
    tiers: [
      {
        name: 'Starter Website',
        price: '$1,000',
        setupPrice: '$1,000',
        monthlyPrice: '$0',
        period: 'one-time',
        popular: false,
        bestFor: 'agencies starting web design services',
        features: [
          'Up to 5 SEO-optimized pages',
          'Responsive, mobile-friendly',
          'Basic SEO setup',
          'Google Analytics + Search Console',
          'White-label delivery'
        ]
      },
      {
        name: 'Growth Website',
        price: '$3,500',
        setupPrice: '$3,500',
        monthlyPrice: '$0',
        period: 'one-time',
        popular: true,
        bestFor: 'agencies with growing client base',
        features: [
          '10-15 SEO-optimized pages',
          'Service + location landing pages',
          'Keyword-targeted copywriting',
          'Lead capture forms (CRM/email)',
          'Blog system setup',
          'White-label branding'
        ]
      },
      {
        name: 'Dominate Website',
        price: '$7,500+',
        setupPrice: '$7,500+',
        monthlyPrice: '$0',
        period: 'one-time',
        popular: false,
        bestFor: 'agencies with enterprise clients',
        features: [
          '20-30+ custom pages',
          'Conversion funnels (e-com, bookings, memberships)',
          'Multi-location SEO',
          'Advanced schema markup',
          'Custom integrations (dashboards, APIs)',
          'Full white-label support'
        ]
      }
    ]
  }
]

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const [services, setServices] = useState(defaultServices)
  const [selectedService, setSelectedService] = useState(defaultServices[0])
  const [selectedTier, setSelectedTier] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  })

  const categories = ['all', 'Direct Services', 'White Label Services']
  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  // Fetch services from database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services')
        if (response.ok) {
          const data = await response.json()
          setServices(data)
          setSelectedService(data[0])
        }
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchServices()
  }, [])

  useEffect(() => {
    const serviceId = searchParams.get('service')
    const tierIndex = searchParams.get('tier')
    
    if (serviceId) {
      const service = services.find(s => s.id === serviceId)
      if (service) {
        setSelectedService(service)
        setSelectedCategory(service.category)
        if (tierIndex) {
          setSelectedTier(parseInt(tierIndex))
        }
      }
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    const submissionData = {
      service: selectedService.title,
      tier: currentTier.name,
      category: selectedService.category,
      price: currentTier.price,
      setupPrice: currentTier.setupPrice,
      monthlyPrice: currentTier.monthlyPrice,
      bestFor: currentTier.bestFor,
      features: currentTier.features,
      ...formData
    }
    console.log('Form submitted:', submissionData)
    alert(`Thank you! We'll contact you within 24 hours to discuss your ${selectedService.title} project.`)
  }

  const currentTier = selectedService.tiers[selectedTier]

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
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Service Selection */}
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-4">Choose Your Service</h1>
            
          {/* Category Filter */}
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">Service Category:</label>
            <div className="flex space-x-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Service Selection */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">Select Service:</label>
            <div className="space-y-1">
              {filteredServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service)
                    setSelectedTier(0) // Reset tier when changing service
                  }}
                  className={`w-full p-2 rounded border text-left transition-all duration-200 ${
                    selectedService.id === service.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{service.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 text-xs">{service.title}</h3>
                        <span className={`px-1 py-0.5 rounded text-xs font-semibold ${
                          service.category === 'White Label Services'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {service.category === 'White Label Services' ? 'White Label' : 'Direct'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{service.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

            {/* Tier Selection */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">Select Plan:</label>
              <div className="space-y-1">
                {selectedService.tiers.map((tier, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTier(index)}
                    className={`w-full p-2 rounded border text-left transition-all duration-200 ${
                      selectedTier === index
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-xs">{tier.name}</h4>
                        <p className="text-xs text-gray-500">{tier.period}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-primary-600">{tier.price}</div>
                        {tier.popular && (
                          <div className="text-xs text-primary-600 font-semibold">Popular</div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Service Details */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded p-3 mb-3">
              <h3 className="font-semibold text-gray-900 mb-2 text-xs">What You Get with {selectedService.title}</h3>
              <div className="space-y-2">
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 mb-0.5">Description:</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{selectedService.description}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 mb-0.5">Best For:</h4>
                  <p className="text-xs text-gray-600">{currentTier.bestFor}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 mb-0.5">Key Features:</h4>
                  <ul className="space-y-0.5">
                    {currentTier.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-start text-xs text-gray-600">
                        <CheckCircle className="w-2.5 h-2.5 text-success-500 mr-1.5 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                    {currentTier.features.length > 2 && (
                      <li className="text-xs text-gray-500 ml-4">
                        +{currentTier.features.length - 2} more features
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Selected Plan Summary */}
            <div className="bg-gray-50 rounded p-3">
              <h3 className="font-semibold text-gray-900 mb-2 text-xs">Plan Summary</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold text-xs">{selectedService.title}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-semibold text-xs">{currentTier.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Setup:</span>
                  <span className="font-semibold text-xs">{currentTier.setupPrice}</span>
                </div>
                {currentTier.monthlyPrice !== '$0' && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Monthly:</span>
                    <span className="font-semibold text-xs">{currentTier.monthlyPrice}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Total:</span>
                    <span className="text-primary-600">{currentTier.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Get Started Today</h2>
            <p className="text-xs text-gray-600 mb-4">
              Fill out the form below and we'll contact you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="businessName" className="block text-xs font-medium text-gray-700 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors text-xs"
                    placeholder="Your Business Name"
                  />
                </div>
                <div>
                  <label htmlFor="contactName" className="block text-xs font-medium text-gray-700 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors text-xs"
                    placeholder="Your Full Name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors text-xs"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors text-xs"
                    placeholder="(401) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-xs font-medium text-gray-700 mb-1">
                  Current Website (if any)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors text-xs"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-700 mb-1">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors text-xs"
                  placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                />
              </div>

              <div className="bg-blue-50 rounded p-2">
                <div className="flex items-start">
                  <Clock className="w-3 h-3 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1 text-xs">What Happens Next?</h4>
                    <ul className="text-xs text-blue-800 space-y-0.5">
                      <li>• We'll contact you within 24 hours</li>
                      <li>• Schedule a free strategy call</li>
                      <li>• Discuss your project in detail</li>
                      <li>• Provide a custom proposal</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold py-2 px-3 rounded hover:from-primary-700 hover:to-accent-700 transition-all duration-200 flex items-center justify-center text-xs"
              >
                <CreditCard className="w-3 h-3 mr-1" />
                Get Started - No Payment Required
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our terms of service and privacy policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
