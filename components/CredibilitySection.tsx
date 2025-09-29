'use client'

import { Award, Users, Shield, CheckCircle, ExternalLink } from 'lucide-react'

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

const mediaMentions = [
  'Featured in Providence Business News',
  'Guest speaker at RI Marketing Summit',
  'Awarded "Best Local SEO Agency" 2023'
]

export default function CredibilitySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Snippet */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose Amenti AI?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We're not just another digital marketing agency. We're Rhode Island natives who understand 
              local business challenges and have the proven track record to solve them.
            </p>
            <p className="text-gray-600 mb-8">
              Our team combines technical expertise with deep local market knowledge to deliver 
              results that actually move the needle for your business.
            </p>

            {/* Credentials */}
            <div className="space-y-4">
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <credential.icon className="text-primary-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{credential.title}</h3>
                    <p className="text-sm text-gray-600">{credential.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media Mentions & Process */}
          <div className="space-y-8">
            {/* Media Mentions */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">As Featured In</h3>
              <ul className="space-y-2">
                {mediaMentions.map((mention, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    {mention}
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How We Work</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                  <span className="text-sm text-gray-700">Discovery & Audit</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <span className="text-sm text-gray-700">Strategy & Roadmap</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                  <span className="text-sm text-gray-700">Execution & Optimization</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                  <span className="text-sm text-gray-700">Reporting & Growth</span>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Our Promise</h3>
              <p className="text-sm mb-4">
                If we don't increase your organic leads by at least 25% in 90 days, 
                we'll work for free the next month until we do.
              </p>
              <div className="flex items-center text-sm">
                <Shield className="mr-2" size={16} />
                <span>100% Results Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

