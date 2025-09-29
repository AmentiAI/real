'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, ChevronDown, DollarSign, Users, Shield, Clock, Award, BarChart3, Phone } from 'lucide-react'

const service = {
  title: 'White Label SEO',
  icon: '🏷️',
  description: 'Agency-focused SEO services that you can resell to your clients at 2-3x markup for maximum profit.',
  longDescription: 'Our white label SEO services are designed specifically for agencies. We provide all the tools, reporting, and support you need to offer professional SEO services to your clients under your own brand.',
  tiers: [
    {
      name: 'Starter SEO',
      price: '$1,200',
      period: 'month',
      popular: false,
      features: [
        '20 keywords (local focus)',
        'Google Business optimization',
        'On-page SEO + local citations',
        'Basic backlink building',
        'Monthly report (agency-branded)',
        'White-label support',
        'Client dashboard access',
        'Basic training materials'
      ]
    },
    {
      name: 'Growth SEO',
      price: '$3,500',
      period: 'month',
      popular: true,
      features: [
        '60 keywords (local + regional/national)',
        'Full technical SEO audit & fixes',
        '4 SEO-optimized blogs/month',
        'Competitor analysis + tracking',
        'White-hat backlinks',
        'Live dashboard (whitelabel)',
        'Agency training materials',
        'Dedicated account manager',
        'Custom reporting tools',
        'Priority support'
      ]
    },
    {
      name: 'Dominate SEO',
      price: '$8,000',
      period: 'month',
      popular: false,
      features: [
        '150 keywords (local + national)',
        'Enterprise technical SEO + architecture',
        'Advanced backlink & PR outreach',
        '8+ blogs/month + automation',
        'Multi-location SEO',
        'Dedicated account manager (invisible to client)',
        'Custom reporting tools',
        'Priority support',
        'Agency certification program',
        'White-label marketing materials'
      ]
    }
  ]
}

export default function WhiteLabelSEOPage() {
  const [selectedTier, setSelectedTier] = useState(1) // Default to middle tier
  const currentTier = service.tiers[selectedTier]

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-orange-900 to-red-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
                White Label SEO Services
              </h1>
              
              {/* Gradient Subtitle */}
              <div className="text-3xl md:text-4xl font-bold mb-8 animate-slide-up delay-200">
                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                  — Scale Your Agency with 2-3x Profit Margins
                </span>
              </div>

              {/* Supporting Text */}
              <p className="text-lg md:text-xl text-orange-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-300">
                Stop turning away SEO clients due to lack of expertise. Our white label SEO services let you offer professional SEO to your clients while maintaining 2-3x profit margins. We handle the work, you keep the client relationship and profits.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up delay-400">
                <Link 
                  href="/checkout?service=white-label-seo" 
                  className="group relative px-8 py-4 bg-orange-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:bg-orange-500"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your White Label Program
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </span>
                </Link>
                <Link 
                  href="/contact" 
                  className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <div className="w-4 h-4 mr-2 border-l-4 border-b-4 border-gray-900 transform rotate-[-45deg]"></div>
                  Schedule Demo
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up delay-500">
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">2-3x</div>
                  <div className="text-orange-200 font-medium">Profit Margins</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">100+</div>
                  <div className="text-orange-200 font-medium">Agency Partners</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-orange-200 font-medium">Support Available</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">$10M+</div>
                  <div className="text-orange-200 font-medium">Revenue Generated</div>
                </div>
              </div>
            </div>

            {/* Right Content - White Label Performance Dashboard */}
            <div className="hidden lg:block">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-slide-up delay-500">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">White Label Performance Dashboard</h3>
                  <p className="text-sm text-gray-600">Real-time agency metrics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Profit Margin</span>
                      <DollarSign className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">300%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Client Retention</span>
                      <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">95%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Response Time</span>
                      <Clock className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">&lt; 2hrs</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Client Satisfaction</span>
                      <Award className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">4.9/5</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall White Label Score</span>
                    <span className="text-2xl font-bold text-gray-900">A+ Grade</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full" style={{width: '98%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-orange-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-red-400 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-yellow-400 rounded-full animate-bounce delay-3000"></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-4000"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-4 bg-orange-600">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Trusted by 100+ Agencies for White Label SEO Services</span>
          </div>
        </div>
      </section>

      {/* Why You Need White Label SEO Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Your Agency Needs White Label SEO Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The SEO market is worth $80 billion and growing. Don't let your agency miss out on this massive opportunity due to lack of in-house expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2-3x Profit Margins</h3>
              <p className="text-gray-600">
                White label SEO allows you to charge premium rates while keeping costs low, resulting in 200-300% profit margins.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Expertise Required</h3>
              <p className="text-gray-600">
                Offer professional SEO services without hiring expensive specialists or learning complex SEO techniques.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Risk-Free Scaling</h3>
              <p className="text-gray-600">
                Scale your SEO services without the risk of hiring, training, and managing in-house SEO specialists.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Faster Time to Market</h3>
              <p className="text-gray-600">
                Start offering SEO services immediately without months of training and setup time.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Results</h3>
              <p className="text-gray-600">
                Deliver enterprise-level SEO results that keep your clients happy and coming back for more services.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Recurring Revenue</h3>
              <p className="text-gray-600">
                SEO is a monthly service that creates predictable, recurring revenue for your agency.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              The White Label SEO Opportunity
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-red-600 mb-3">❌ Without White Label SEO:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Turn away 60% of potential SEO clients</li>
                  <li>• Miss out on $80 billion SEO market opportunity</li>
                  <li>• Spend 6+ months training in-house specialists</li>
                  <li>• Risk $50K+ hiring experienced SEO professionals</li>
                  <li>• Struggle to compete with SEO-focused agencies</li>
                  <li>• Lose clients to agencies offering SEO services</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-3">✅ With White Label SEO:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Capture 100% of SEO opportunities</li>
                  <li>• Access entire $80 billion SEO market</li>
                  <li>• Start offering SEO services immediately</li>
                  <li>• Zero upfront investment in training or hiring</li>
                  <li>• Compete effectively with any SEO agency</li>
                  <li>• Retain clients with comprehensive service offerings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Amenti AI the Best Choice Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Amenti AI is the Best White Label SEO Partner
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              We're not just another white label provider. We're your strategic partner, helping you build a profitable SEO practice while maintaining complete client control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete White Label</h3>
              <p className="text-primary-100">
                All work is delivered under your brand. Your clients never know we exist - you maintain complete control.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Proven Results</h3>
              <p className="text-primary-100">
                Our clients see an average 247% increase in organic leads. Your clients will be impressed with the results.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dedicated Account Manager</h3>
              <p className="text-primary-100">
                You get a dedicated account manager who knows your clients and understands your business goals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">White Label Reporting</h3>
              <p className="text-primary-100">
                All reports are branded with your logo and colors, maintaining your professional image.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Implementation</h3>
              <p className="text-primary-100">
                New clients can be onboarded within 48 hours, allowing you to start generating revenue immediately.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-primary-100">
                We're always available to support you and your clients, ensuring smooth operations.
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Our White Label SEO Success</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-primary-100">Agency Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">2-3x</div>
                <div className="text-primary-100">Profit Margins</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">48hrs</div>
                <div className="text-primary-100">Onboarding Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-primary-100">White Label</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Partnership Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the white label tier that best fits your agency's needs and client base.
            </p>
          </div>

          {/* Pricing Dropdown */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(Number(e.target.value))}
                className="w-full appearance-none bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 text-lg font-semibold text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                {service.tiers.map((tier, index) => (
                  <option key={index} value={index}>
                    {tier.name} - {tier.price} {tier.period === 'month' ? 'per month' : 'one-time'}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            </div>
          </div>

          {/* Selected Tier Details */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-large border border-gray-200 overflow-hidden">
              <div className="p-8 border-b border-gray-200">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentTier.name}
                  </h3>
                  <div className="text-5xl font-bold text-primary-600 mb-2">
                    {currentTier.price}
                  </div>
                  <div className="text-lg text-gray-500 mb-4">
                    {currentTier.period === 'month' ? 'per month' : 'one-time payment'}
                  </div>
                  {currentTier.popular && (
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-semibold">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular Choice
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  What's Included
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {currentTier.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-success-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-gray-50">
                <div className="text-center">
                  <Link
                    href="/contact"
                    className={`inline-flex items-center text-lg px-10 py-4 rounded-xl font-semibold transition-all duration-200 ${
                      currentTier.popular
                        ? 'btn-primary'
                        : 'btn-secondary'
                    }`}
                  >
                    Start Partnership with {currentTier.name}
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                  <p className="text-sm text-gray-500 mt-4">
                    No setup fees • White-label delivery • Dedicated support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="section-padding bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join our white label program and start offering professional SEO services to your clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 text-lg px-10 py-4">
              Schedule Partnership Call
            </Link>
            <Link href="tel:+14041234567" className="btn-ghost border-white text-white hover:bg-white hover:text-primary-600 text-lg px-10 py-4">
              Call (401) 123-4567
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
