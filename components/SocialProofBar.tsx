'use client'

import { Star, Users, Award, CheckCircle } from 'lucide-react'

const socialProof = [
  { type: 'rating', value: '4.9', label: 'Google Rating', icon: Star },
  { type: 'clients', value: '150+', label: 'Happy Clients', icon: Users },
  { type: 'awards', value: '5', label: 'Years Experience', icon: Award },
  { type: 'guarantee', value: '100%', label: 'Satisfaction', icon: CheckCircle }
]

const clientLogos = [
  'Smith Restaurant Group',
  'Providence Law Firm',
  'Rhode Island Roofing',
  'Cranston Contractors',
  'Newport Medical Center'
]

export default function SocialProofBar() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {socialProof.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <item.icon className="text-primary-600 mr-2" size={24} />
                <span className="text-3xl font-bold text-gray-900">{item.value}</span>
              </div>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-6">Trusted by local businesses across Rhode Island</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {clientLogos.map((logo, index) => (
              <div key={index} className="text-gray-400 font-medium text-sm">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

