'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Award, Clock } from 'lucide-react'

interface Stat {
  id: number
  icon: any
  value: string
  label: string
  description: string
}

const defaultStats: Stat[] = [
  {
    id: 1,
    icon: TrendingUp,
    value: '400%',
    label: 'Average Traffic Increase',
    description: 'Our clients see dramatic growth in organic traffic'
  },
  {
    id: 2,
    icon: Users,
    value: '150+',
    label: 'Successful Clients',
    description: 'Businesses transformed with our proven strategies'
  },
  {
    id: 3,
    icon: Award,
    value: '98%',
    label: 'First Page Rankings',
    description: 'Achievement rate for targeted keywords'
  },
  {
    id: 4,
    icon: Clock,
    value: '30 Days',
    label: 'Average Time to Results',
    description: 'See measurable improvements in just one month'
  }
]

export default function StatsSection() {
  const [stats, setStats] = useState<Stat[]>(defaultStats)

  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Proven Results That Speak for Themselves
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our data-driven approach delivers measurable results that transform businesses and drive sustainable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-blue-100 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-blue-200">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
