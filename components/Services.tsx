'use client'

import { useState } from 'react'
import { Search, Globe, BarChart3, Target, Users, Zap, ArrowRight, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'complete-growth-packages',
    icon: Target,
    title: 'Complete Growth Packages',
    description: 'All-in-one solutions combining website development with ongoing SEO for maximum business growth.',
    tiers: [
      { name: 'Starter Growth Package', price: '$2,200 + $1,200/mo', features: ['5-page SEO-ready website', '20 local keywords', 'Google Business optimization', 'Monthly SEO reports'] },
      { name: 'Business Growth Package', price: '$5,000 + $3,500/mo', features: ['10-15 page custom website', '60 targeted keywords', 'Technical SEO audit', '4 blogs/month'] },
      { name: 'Enterprise Domination Package', price: '$12,500 + $8,000/mo', features: ['20-30+ page premium website', '150 targeted keywords', 'Advanced backlink outreach', 'Dedicated account manager'] }
    ],
    popular: true,
    category: 'Complete Packages'
  },
  {
    id: 'website-design',
    icon: Target,
    title: 'Website Design & Development',
    description: 'Professional websites that convert visitors into customers with modern design and advanced functionality.',
    tiers: [
      { name: 'Starter Website', price: '$1,000', features: ['Up to 5 SEO-ready pages', 'Mobile-friendly design', 'Basic SEO setup', 'Google Analytics'] },
      { name: 'Growth Website', price: '$3,500', features: ['10-15 SEO-optimized pages', 'Keyword-targeted copywriting', 'Lead capture forms', 'Blog system setup'] },
      { name: 'Dominate Website', price: '$7,500+', features: ['20-30+ pages', 'Conversion funnels', 'Multi-location SEO', 'Custom integrations'] }
    ],
    popular: false,
    category: 'Development'
  },
  {
    id: 'seo-services',
    icon: Search,
    title: 'SEO Services',
    description: 'Comprehensive SEO strategies that dominate search results and drive qualified traffic to your business.',
    tiers: [
      { name: 'Starter SEO', price: '$1,200/mo', features: ['20 local keywords', 'Google Business optimization', 'On-page SEO', 'Monthly reports'] },
      { name: 'Growth SEO', price: '$3,500/mo', features: ['60 regional keywords', 'Technical SEO audit', '4 blogs/month', 'Backlink campaigns'] },
      { name: 'Dominate SEO', price: '$8,000+/mo', features: ['150+ keywords', 'Enterprise technical SEO', '8+ blogs/month', 'Dedicated manager'] }
    ],
    popular: false,
    category: 'SEO Services'
  },
  {
    id: 'branding-identity',
    icon: BarChart3,
    title: 'Branding & Identity',
    description: 'Create a powerful brand identity that resonates with your audience and builds trust in your business.',
    tiers: [
      { name: 'Starter Branding', price: '$750', features: ['Logo design (3 concepts)', 'Basic color palette', 'Font selection'] },
      { name: 'Growth Branding', price: '$2,500', features: ['Full brand kit', 'Style guide', 'Marketing collateral'] },
      { name: 'Dominate Branding', price: '$5,000+', features: ['Enterprise identity system', 'Multi-logo variations', 'Full corporate collateral'] }
    ],
    popular: false,
    category: 'Branding'
  },
  {
    id: 'content-marketing',
    icon: Users,
    title: 'Content Marketing',
    description: 'Strategic content that ranks, engages, and converts your target audience into loyal customers.',
    tiers: [
      { name: 'Starter Content', price: '$500/mo', features: ['2 SEO blog posts', 'Keyword research', 'Topic research'] },
      { name: 'Growth Content', price: '$1,200/mo', features: ['4-6 blog posts', 'Content calendar', 'SEO clustering'] },
      { name: 'Dominate Content', price: '$2,500+/mo', features: ['8-12 blogs/month', 'Infographics', 'AI-assisted scaling'] }
    ],
    popular: false,
    category: 'Content'
  },
  {
    id: 'paid-ads-social-media',
    icon: Globe,
    title: 'Paid Ads & Social Media',
    description: 'Targeted advertising campaigns that reach your ideal customers and drive measurable results.',
    tiers: [
      { name: 'Starter Ads/Social', price: '$750/mo', features: ['Google Ads setup', '3 posts/week', 'Basic reporting'] },
      { name: 'Growth Ads/Social', price: '$1,500-2,000/mo', features: ['Multiple campaigns', '5 posts/week', 'Growth strategy'] },
      { name: 'Dominate Ads/Social', price: '$3,000+/mo', features: ['Advanced funnels', 'Daily content', 'Dedicated manager'] }
    ],
    popular: false,
    category: 'Marketing'
  },
  {
    id: 'platforms-custom-systems',
    icon: Zap,
    title: 'Platforms & Custom Systems',
    description: 'Build comprehensive digital platforms and custom systems that scale with your business growth.',
    tiers: [
      { name: 'Startup MVP', price: '$15,000+', features: ['Basic SaaS app', 'Admin panel', 'Core features'] },
      { name: 'Growth Platform', price: '$50,000+', features: ['Multi-user system', 'Payment integration', 'API integrations'] },
      { name: 'Enterprise Platform', price: '$100,000+', features: ['Multi-tenant platform', 'AI features', 'Custom architecture'] }
    ],
    popular: false,
    category: 'Platforms'
  },
  {
    icon: Globe,
    title: 'White Label SEO',
    description: 'Agency-focused SEO services that you can resell to your clients at 2-3x markup for maximum profit.',
    tiers: [
      { name: 'Starter SEO', price: '$1,200/mo', features: ['20 keywords (local focus)', 'Google Business optimization', 'On-page SEO + citations', 'Agency-branded reports'] },
      { name: 'Growth SEO', price: '$3,500/mo', features: ['60 keywords (local + regional)', 'Technical SEO audit', '4 blogs/month', 'White-label dashboard'] },
      { name: 'Dominate SEO', price: '$8,000/mo', features: ['150 keywords (local + national)', 'Enterprise technical SEO', '8+ blogs/month + automation', 'Dedicated account manager'] }
    ],
    popular: false,
    category: 'White Label'
  },
  {
    icon: Target,
    title: 'White Label Website Design',
    description: 'Professional website design services for agencies to resell at 2-3x markup with full white-label support.',
    tiers: [
      { name: 'Starter Website', price: '$1,000', features: ['Up to 5 SEO-optimized pages', 'Responsive, mobile-friendly', 'Basic SEO setup', 'Google Analytics + Search Console'] },
      { name: 'Growth Website', price: '$3,500', features: ['10-15 SEO-optimized pages', 'Service + location landing pages', 'Keyword-targeted copywriting', 'Lead capture forms'] },
      { name: 'Dominate Website', price: '$7,500+', features: ['20-30+ custom pages', 'Conversion funnels', 'Multi-location SEO', 'Custom integrations'] }
    ],
    popular: false,
    category: 'White Label'
  }
]

export default function Services() {
  const [selectedTiers, setSelectedTiers] = useState<{[key: number]: number}>({})

  const handleTierClick = (serviceIndex: number, tierIndex: number) => {
    setSelectedTiers(prev => ({
      ...prev,
      [serviceIndex]: tierIndex
    }))
  }

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        {/* Professional Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            We Build Any Platform Your Business Needs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From simple websites to complex enterprise platforms, we create comprehensive digital solutions 
            that scale with your business.
          </p>
        </div>

        {/* Professional Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, serviceIndex) => {
            const selectedTier = selectedTiers[serviceIndex] ?? 1 // Default to middle tier
            const currentTier = service.tiers[selectedTier]
            
            return (
              <div key={serviceIndex} className={`feature-card group ${service.popular ? 'pricing-card-featured' : ''} animate-fade-in-up-delay-${serviceIndex + 1} h-full`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="flex items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200 ${
                    service.popular ? 'bg-gradient-to-r from-primary-100 to-accent-100' : 'bg-primary-100'
                  }`}>
                    <service.icon className={`${service.popular ? 'text-primary-600' : 'text-primary-600'}`} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                        {service.title}
                      </h3>
                      <div className="badge-primary text-xs">
                        {service.category}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {service.description}
                </p>
                
                {/* Interactive Pricing Tiers */}
                <div className="space-y-2 mb-4">
                  {service.tiers.map((tier, tierIndex) => (
                    <button
                      key={tierIndex}
                      onClick={() => handleTierClick(serviceIndex, tierIndex)}
                      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedTier === tierIndex 
                          ? 'border-primary-500 bg-primary-50 shadow-md' 
                          : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{tier.name}</h4>
                        <div className="text-sm font-bold text-primary-600">{tier.price}</div>
                      </div>
                      {tier.popular && (
                        <div className="text-xs text-primary-600 font-semibold mb-1">Most Popular</div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Selected Tier Details */}
                {currentTier && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-sm">{currentTier.name}</h4>
                      <div className="text-lg font-bold text-primary-600">{currentTier.price}</div>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">What's Included:</h5>
                      <ul className="space-y-1">
                        {currentTier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-gray-500">
                      Click a plan to see details
                    </div>
                    {service.popular && (
                      <div className="badge-primary text-xs">
                        Recommended
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/checkout?service=${service.id}&tier=${selectedTier}`}
                    className="w-full btn-primary flex items-center justify-center group text-sm py-2"
                  >
                    Get Started with {currentTier?.name || 'Selected Plan'}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={14} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Professional CTA Section */}
        <div className="text-center">
          <div className="card-premium p-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center mr-4">
                <BarChart3 className="text-white" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                Ready to Build Your Digital Platform?
              </h3>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
              Whether you need a simple website or a complex enterprise platform, we have the expertise 
              to build exactly what your business needs. From custom applications to AI-powered solutions, 
              we create digital platforms that scale with your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-10 py-4">
                Discuss Your Project
              </Link>
              <Link href="/case-studies" className="btn-secondary text-lg px-10 py-4">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
