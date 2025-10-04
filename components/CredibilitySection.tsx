'use client'

import { Award, Users, Shield, CheckCircle, ExternalLink, Star } from 'lucide-react'

const credentials = [
  {
    icon: Award,
    title: 'Google Partner',
    description: 'Certified Google Ads and Analytics partner'
  },
  {
    icon: Shield,
    title: 'Chamber of Commerce',
    description: 'Active member of Providence Chamber'
  },
  {
    icon: Users,
    title: '150+ Local Clients',
    description: 'Serving Rhode Island businesses since 2019'
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    company: 'Providence Roofing Co.',
    text: 'Amenti AI transformed our business. We went from struggling to get leads to dominating Google rankings in just 6 months.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    company: 'Newport Law Firm',
    text: 'The results speak for themselves - 1,100% increase in organic traffic and $4.1M in additional revenue.',
    rating: 5
  },
  {
    name: 'Lisa Rodriguez',
    company: 'Warwick Restaurant',
    text: 'Their AI-powered approach helped us become the top restaurant in Warwick. Incredible results!',
    rating: 5
  }
]

export default function CredibilitySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-8">
              <Shield className="w-4 h-4 mr-2" />
              Trusted & Proven
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Amenti AI?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're not just another digital marketing agency. We're Rhode Island natives who understand 
              local businesses and use cutting-edge AI technology to deliver exceptional results.
            </p>

            {/* Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {credentials.map((credential, index) => {
                const IconComponent = credential.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{credential.title}</h3>
                    <p className="text-sm text-gray-600">{credential.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">AI-powered strategies that outperform traditional marketing</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Guaranteed first-page rankings or we work for free</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Local expertise with national reach</span>
              </div>
            </div>
          </div>

          {/* Right Content - Testimonials */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">What Our Clients Say</h3>
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}