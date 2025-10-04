'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, Search, Monitor, TrendingUp, Target, Zap, BarChart3, Users, Award, Clock, Shield } from 'lucide-react'

interface Service {
  id: number
  title: string
  description: string
  icon: any
  features: string[]
  results: string[]
  color: string
  gradient: string
  href: string
}

const services: Service[] = [
  {
    id: 1,
    title: 'AI-Powered SEO',
    description: 'Advanced SEO strategies that dominate search results and drive massive organic traffic growth.',
    icon: Search,
    features: [
      'Advanced keyword research & clustering',
      'Technical SEO optimization',
      'Content strategy & optimization',
      'Link building & authority development',
      'Local SEO & Google My Business',
      'Monthly performance reporting'
    ],
    results: [
      '400% average traffic increase',
      '98% first-page rankings',
      '150+ targeted keywords',
      '30-day results guarantee'
    ],
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    href: '/services/seo-services'
  },
  {
    id: 2,
    title: 'Website Design & Development',
    description: 'Stunning, conversion-optimized websites that turn visitors into customers.',
    icon: Monitor,
    features: [
      'Custom responsive design',
      'Mobile-first optimization',
      'Conversion rate optimization',
      'E-commerce integration',
      'CMS & content management',
      'Ongoing maintenance & support'
    ],
    results: [
      '50% average conversion increase',
      'Mobile-optimized design',
      'Fast loading speeds',
      'SEO-ready structure'
    ],
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    href: '/services/website-design'
  },
  {
    id: 3,
    title: 'Complete Growth Packages',
    description: 'End-to-end digital marketing solutions that transform your entire online presence.',
    icon: TrendingUp,
    features: [
      'Full SEO + Website package',
      'Content marketing strategy',
      'Social media management',
      'Paid advertising campaigns',
      'Analytics & reporting',
      'Dedicated account manager'
    ],
    results: [
      '300% revenue increase',
      'Complete digital transformation',
      'All-in-one solution',
      'Priority support & strategy'
    ],
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    href: '/services/complete-growth-packages'
  }
]

export default function Services() {
  const [activeService, setActiveService] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('services-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Users, value: '150+', label: 'Successful Clients' },
    { icon: TrendingUp, value: '400%', label: 'Average Growth' },
    { icon: Award, value: '98%', label: 'First Page Rankings' },
    { icon: Clock, value: '30 Days', label: 'To First Results' }
  ]

  return (
    <section id="services-section" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Our Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Complete Digital Marketing Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From SEO to web design, we provide everything you need to dominate your market and grow your business online.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${
                activeService === index ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-gray-200 hover:border-blue-300'
              }`}
              style={{animationDelay: `${index * 0.2}s`}}
              onMouseEnter={() => setActiveService(index)}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {service.features.slice(0, 4).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Results */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Results:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {service.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="text-sm text-gray-600">
                      • {result}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href={service.href}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 ${
                  activeService === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                Learn More
                <ArrowRight className="inline-block ml-2 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-center relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-8">
              Proven Results Across All Industries
            </h3>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Our data-driven approach delivers consistent, measurable results that transform businesses and drive sustainable growth.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
                    <stat.icon className="w-8 h-8 text-blue-300" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-blue-200 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join 150+ successful businesses that have generated millions in additional revenue with our proven strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}