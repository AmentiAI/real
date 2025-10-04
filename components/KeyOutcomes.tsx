'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Phone, Zap, Target, Users, DollarSign } from 'lucide-react'

interface KeyOutcome {
  id: number
  title: string
  metric: string
  description: string
  icon: string
  color: string
  bg_color: string
  order_index: number
}

interface CaseStudy {
  id: number
  title: string
  before_value: string
  after_value: string
  improvement: string
  description: string
  image_url?: string
  is_featured: boolean
  order_index: number
}

const iconMap = {
  Phone,
  TrendingUp,
  Zap,
  Target,
  Users,
  DollarSign
}

export default function KeyOutcomes() {
  const [outcomes, setOutcomes] = useState<KeyOutcome[]>([])
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [outcomesResponse, caseStudiesResponse] = await Promise.all([
          fetch('/api/content/key-outcomes'),
          fetch('/api/content/case-studies')
        ])

        if (outcomesResponse.ok) {
          const outcomesData = await outcomesResponse.json()
          setOutcomes(outcomesData)
        }

        if (caseStudiesResponse.ok) {
          const caseStudiesData = await caseStudiesResponse.json()
          const featuredCaseStudy = caseStudiesData.find((study: CaseStudy) => study.is_featured)
          setCaseStudy(featuredCaseStudy || caseStudiesData[0])
        }
      } catch (error) {
        console.error('Error fetching key outcomes data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    )
  }

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
          {outcomes.map((outcome) => {
            const IconComponent = iconMap[outcome.icon as keyof typeof iconMap]
            return (
              <div key={outcome.id} className="text-center">
                <div className={`w-16 h-16 ${outcome.bg_color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  {IconComponent && <IconComponent className={`${outcome.color} text-white`} size={32} />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{outcome.title}</h3>
                <div className="text-4xl font-bold text-primary-600 mb-2">{outcome.metric}</div>
                <p className="text-gray-600">{outcome.description}</p>
              </div>
            )
          })}
        </div>

        {/* Mini Case Study */}
        {caseStudy && (
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
                    <div className="text-lg font-semibold text-gray-900">{caseStudy.before_value}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">After</div>
                    <div className="text-lg font-semibold text-green-600">{caseStudy.after_value}</div>
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
                    <div className="text-4xl font-bold text-primary-600 mb-2">{caseStudy.improvement}</div>
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
        )}
      </div>
    </section>
  )
}

