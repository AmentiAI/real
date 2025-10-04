'use client'

import { useState, useEffect } from 'react'
import { Search, Target, Zap, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'

interface ProcessStep {
  id: number
  icon: any
  title: string
  description: string
  details: string[]
  color: string
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    icon: Search,
    title: 'Discovery & Analysis',
    description: 'We dive deep into your business, market, and competition',
    details: [
      'Comprehensive business audit',
      'Competitor analysis',
      'Market opportunity assessment',
      'Goal setting and KPI definition'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    icon: Target,
    title: 'Strategy Development',
    description: 'Custom strategy tailored to your unique needs and goals',
    details: [
      'Keyword research and targeting',
      'Content strategy planning',
      'Technical SEO roadmap',
      'Conversion optimization plan'
    ],
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 3,
    icon: Zap,
    title: 'Implementation',
    description: 'Rapid deployment of our proven systems and processes',
    details: [
      'Website optimization',
      'Content creation and publishing',
      'Technical SEO implementation',
      'Analytics and tracking setup'
    ],
    color: 'from-green-500 to-green-600'
  },
  {
    id: 4,
    icon: TrendingUp,
    title: 'Optimization & Growth',
    description: 'Continuous monitoring, testing, and improvement',
    details: [
      'Performance monitoring',
      'A/B testing and optimization',
      'Monthly strategy reviews',
      'Scaling successful campaigns'
    ],
    color: 'from-orange-500 to-orange-600'
  }
]

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
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

    const element = document.getElementById('process-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="process-section" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Our Proven Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How We Transform Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our systematic approach ensures consistent, measurable results that drive sustainable growth for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Process Steps */}
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className={`group cursor-pointer transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{animationDelay: `${index * 0.2}s`}}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeStep === index
                    ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-gray-500">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Representation */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Process Flow Visualization */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Growth Journey</h3>
                  <p className="text-gray-600">From discovery to domination</p>
                </div>

                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg ${
                        activeStep >= index ? 'opacity-100 scale-100' : 'opacity-50 scale-90'
                      } transition-all duration-300`}>
                        {step.id}
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className={`font-semibold ${
                          activeStep >= index ? 'text-gray-900' : 'text-gray-400'
                        } transition-colors duration-300`}>
                          {step.title}
                        </h4>
                        <p className={`text-sm ${
                          activeStep >= index ? 'text-gray-600' : 'text-gray-400'
                        } transition-colors duration-300`}>
                          {step.description}
                        </p>
                      </div>
                      {index < processSteps.length - 1 && (
                        <ArrowRight className={`w-5 h-5 ml-4 ${
                          activeStep > index ? 'text-blue-500' : 'text-gray-300'
                        } transition-colors duration-300`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Metrics */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 text-center border border-green-200">
                  <div className="text-2xl font-bold text-green-600">30 Days</div>
                  <div className="text-sm text-gray-600">To First Results</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 text-center border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">400%</div>
                  <div className="text-sm text-gray-600">Average Growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
