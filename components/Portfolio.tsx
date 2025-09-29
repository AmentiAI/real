'use client'

import { ExternalLink, TrendingUp, Users, MapPin } from 'lucide-react'

const portfolioItems = [
  // Portfolio items will be loaded from database
]

export default function Portfolio() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped businesses across Rhode Island and the USA achieve 
            remarkable growth through our digital marketing expertise.
          </p>
        </div>

        {/* Portfolio Grid */}
        {portfolioItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {portfolioItems.map((item, index) => (
              <div key={index} className="card overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center text-white">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{item.results.traffic}</div>
                      <div className="text-xs text-gray-500">Traffic</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{item.results.leads}</div>
                      <div className="text-xs text-gray-500">Leads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{item.results.revenue}</div>
                      <div className="text-xs text-gray-500">Revenue</div>
                    </div>
                  </div>

                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                    <ExternalLink size={16} className="mr-2" />
                    View Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-16">
            <div className="bg-gray-50 rounded-2xl p-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Portfolio Coming Soon
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We're currently working on showcasing our client success stories. 
                Check back soon to see real results from our digital marketing campaigns.
              </p>
              <a
                href="/contact"
                className="btn-primary"
              >
                Get Started Today
              </a>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-100">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">$50M+</div>
              <div className="text-primary-100">Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-primary-100">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
