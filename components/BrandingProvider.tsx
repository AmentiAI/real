'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { BrandingSettings, defaultBranding, fetchBrandingSettings, applyBrandingToDocument } from '@/lib/branding'

interface BrandingContextType {
  branding: BrandingSettings
  loading: boolean
  refreshBranding: () => Promise<void>
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined)

export function useBranding() {
  const context = useContext(BrandingContext)
  if (context === undefined) {
    throw new Error('useBranding must be used within a BrandingProvider')
  }
  return context
}

interface BrandingProviderProps {
  children: ReactNode
}

export default function BrandingProvider({ children }: BrandingProviderProps) {
  const [branding, setBranding] = useState<BrandingSettings>(defaultBranding)
  const [loading, setLoading] = useState(true)

  const refreshBranding = async () => {
    setLoading(true)
    try {
      const newBranding = await fetchBrandingSettings()
      setBranding(newBranding)
      applyBrandingToDocument(newBranding)
    } catch (error) {
      console.error('Error refreshing branding:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshBranding()
  }, [])

  useEffect(() => {
    applyBrandingToDocument(branding)
  }, [branding])

  useEffect(() => {
    // Listen for branding updates from admin
    const handleBrandingUpdate = (event: CustomEvent) => {
      console.log('Branding updated, refreshing...', event.detail)
      refreshBranding()
    }

    window.addEventListener('brandingUpdated', handleBrandingUpdate as EventListener)
    
    return () => {
      window.removeEventListener('brandingUpdated', handleBrandingUpdate as EventListener)
    }
  }, [])

  return (
    <BrandingContext.Provider value={{ branding, loading, refreshBranding }}>
      {children}
    </BrandingContext.Provider>
  )
}
