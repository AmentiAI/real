'use client'

import { useState, useEffect } from 'react'
import { Star, Users, Award, CheckCircle } from 'lucide-react'

interface SocialProof {
  id: number
  type: string
  value: string
  label: string
  icon: string
  order_index: number
}

interface ClientLogo {
  id: number
  name: string
  logo_url?: string
  website?: string
  order_index: number
}

const iconMap = {
  Star,
  Users,
  Award,
  CheckCircle
}

export default function SocialProofBar() {
  const [socialProof, setSocialProof] = useState<SocialProof[]>([])
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [socialProofResponse, clientLogosResponse] = await Promise.all([
          fetch('/api/content/social-proof'),
          fetch('/api/content/client-logos')
        ])

        if (socialProofResponse.ok) {
          const socialProofData = await socialProofResponse.json()
          setSocialProof(socialProofData)
        }

        if (clientLogosResponse.ok) {
          const clientLogosData = await clientLogosResponse.json()
          setClientLogos(clientLogosData)
        }
      } catch (error) {
        console.error('Error fetching social proof data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {socialProof.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap]
            return (
              <div key={item.id} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {IconComponent && <IconComponent className="text-primary-600 mr-2" size={24} />}
                  <span className="text-3xl font-bold text-gray-900">{item.value}</span>
                </div>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            )
          })}
        </div>

        {/* Client Logos */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-6">Trusted by local businesses across Rhode Island</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {clientLogos.map((logo) => (
              <div key={logo.id} className="text-gray-400 font-medium text-sm">
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

