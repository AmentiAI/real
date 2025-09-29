'use client'

import { TrendingUp, Phone, Zap, Target, Users, DollarSign } from 'lucide-react'

const outcomes = [
  {
    icon: Phone,
    title: 'More Qualified Leads',
    metric: '+247%',
    description: 'Average increase in organic leads within 90 days',
    color: 'bg-green-500',
    bgColor: 'bg-green-50'
  },
  {
    icon: TrendingUp,
    title: 'Higher Rankings',
    metric: '#1-3',
    description: 'Top 3 Google rankings for your main keywords',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Zap,
    title: 'Faster Website',
    metric: '<2.5s',
    description: 'Lightning-fast load times that convert better',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50'
  }
]

const caseStudy = {
  title: 'Amp Roofing: +73% Organic Leads in 4 Months',
  before: '12 leads/month',
  after: '21 leads/month',
  improvement: '+73%',
  description: 'See how we helped a local roofing company dominate Google Maps and organic search results.'
}

export default function KeyOutcomes() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What You'll Get
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three key outcomes that directly impact your bottom line
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {outcomes.map((outcome, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${outcome.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <outcome.icon className={`${outcome.color} text-white`} size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{outcome.title}</h3>
              <div className="text-4xl font-bold text-primary-600 mb-2">{outcome.metric}</div>
              <p className="text-gray-600">{outcome.description}</p>
            </div>
          ))}
        </div>

        {/* Mini Case Study */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {caseStudy.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {caseStudy.description}
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Before</div>
                  <div className="text-lg font-semibold text-gray-900">{caseStudy.before}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">After</div>
                  <div className="text-lg font-semibold text-green-600">{caseStudy.after}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Improvement</div>
                  <div className="text-2xl font-bold text-primary-600">{caseStudy.improvement}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="h-64 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">+73%</div>
                  <div className="text-gray-600">Lead Increase</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href="/case-studies" className="btn-primary">
              See Full Case Study
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

