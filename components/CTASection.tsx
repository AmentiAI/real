'use client'

import { Calendar, Phone, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join 150+ successful businesses that have generated $50M+ in additional revenue with our proven AI-powered strategies.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center justify-center text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Guaranteed Results</div>
                <div className="text-sm text-blue-100">First-page rankings or we work for free</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Fast Results</div>
                <div className="text-sm text-blue-100">See improvements in 30-60 days</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Dedicated Support</div>
                <div className="text-sm text-blue-100">Personal account manager included</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Free Strategy Call
            </Link>
          </div>

          {/* Microcopy */}
          <p className="text-sm text-blue-200">
            No long-term contracts • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  )
}