'use client'

import { Calendar, Phone, Clock, CheckCircle } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get 3-10 New Leads Per Month?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Book a free 15-minute strategy call. We'll analyze your current setup and show you 
            exactly how to get more qualified leads from Google.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://calendly.com/amenti-ai/strategy-call"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center text-lg"
            >
              <Calendar className="mr-2" size={20} />
              Book Free Strategy Call
            </a>
            <a
              href="tel:+14011234567"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center text-lg"
            >
              <Phone className="mr-2" size={20} />
              Call (401) 123-4567
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="text-primary-200" size={20} />
              <span className="text-primary-100">15-minute call</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="text-primary-200" size={20} />
              <span className="text-primary-100">No obligation</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="text-primary-200" size={20} />
              <span className="text-primary-100">Instant booking</span>
            </div>
          </div>

          {/* Microcopy */}
          <div className="mt-8 text-sm text-primary-200">
            <p>We reply within 1 business day • Your information is 100% secure</p>
          </div>
        </div>
      </div>
    </section>
  )
}
