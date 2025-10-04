'use client'

import { MapPin, Phone, Clock, Star, CheckCircle, TrendingUp, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useBranding } from '@/components/BrandingProvider'

const localStats = [
  { metric: '150+', label: 'Local Clients' },
  { metric: '4.9/5', label: 'Google Rating' },
  { metric: '5+', label: 'Years in RI' },
  { metric: '247%', label: 'Avg Lead Increase' }
]

const localTestimonials = [
  {
    name: 'Sarah Johnson',
    company: 'Providence Law Firm',
    location: 'Downtown Providence',
    content: 'Amenti AI helped us dominate local search results. We went from 2-3 leads per month to 15+ qualified leads. Our phone hasn\'t stopped ringing!',
    rating: 5
  },
  {
    name: 'Mike Rodriguez',
    company: 'Rhode Island Roofing',
    location: 'East Providence',
    content: 'The team at Amenti AI understands the local market better than anyone. They got us ranking #1 for "roofing Providence" in just 3 months.',
    rating: 5
  }
]

const localServices = [
  'Google My Business optimization',
  'Local citation building',
  'Providence-specific content',
  'Local link building',
  'Review management',
  'Local schema markup'
]

export default function ProvidenceContent() {
  const { branding } = useBranding()

  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Location Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8">
              <MapPin className="w-5 h-5 mr-2" />
              Serving Providence, Rhode Island
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Providence's #1{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                AI-Powered SEO Company
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
              We help Providence businesses dominate local search results and get more qualified leads. 
              Our proven AI strategies have helped 150+ local businesses increase their organic traffic by an average of 247%.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
              >
                Get Free Providence SEO Audit
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <a
                href={`tel:${branding.contact_phone}`}
                className="group inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 transform"
              >
                <Phone className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Call {branding.contact_phone}
              </a>
            </div>

            {/* Market Insights */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Providence Market Insights</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">190K+</div>
                  <div className="text-blue-200 text-sm">Population</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">15K+</div>
                  <div className="text-blue-200 text-sm">Businesses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">45K</div>
                  <div className="text-blue-200 text-sm">Monthly Searches</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">Medium</div>
                  <div className="text-blue-200 text-sm">Competition</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Success Stories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Providence Businesses We've Helped
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real Providence businesses using our AI-powered strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {localTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-blue-600 text-sm">{testimonial.company}</div>
                    <div className="text-gray-500 text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Providence-Specific Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored strategies designed specifically for Providence's unique market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-900 font-medium">{service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Stats */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Providence Impact
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Measurable results for Providence businesses
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {localStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-white mb-2">{stat.metric}</div>
                <div className="text-blue-200 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold text-white mb-8">Ready to Dominate Providence Search Results?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Get your free Providence SEO audit and discover how our AI-powered strategies can help your business 
            attract more local customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              Get Free Providence SEO Audit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href={`tel:${branding.contact_phone}`}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center text-lg"
            >
              <Phone className="mr-2" size={20} />
              Call {branding.contact_phone}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}


