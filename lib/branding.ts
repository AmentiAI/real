// Branding utilities and types

export interface BrandingSettings {
  id: string
  logo_light?: string
  logo_dark?: string
  favicon?: string
  primary_color: string
  secondary_color: string
  accent_color: string
  font_family: string
  company_name: string
  tagline: string
  contact_email: string
  contact_phone: string
  address: string
  social_media: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
    youtube?: string
  }
}

// Default branding settings
export const defaultBranding: BrandingSettings = {
  id: '1',
  primary_color: '#2563eb',
  secondary_color: '#64748b',
  accent_color: '#f59e0b',
  font_family: 'Inter',
  company_name: 'Amenti AI',
  tagline: 'Digital Marketing & SEO Services',
  contact_email: 'hello@amentiai.com',
  contact_phone: '(401) 123-4567',
  address: 'Providence, Rhode Island',
  social_media: {
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    youtube: ''
  }
}

// Fetch branding settings from API
export async function fetchBrandingSettings(): Promise<BrandingSettings> {
  try {
    const response = await fetch('/api/branding')
    if (response.ok) {
      const data = await response.json()
      return {
        ...defaultBranding,
        ...data,
        social_media: data.social_media || {}
      }
    }
  } catch (error) {
    console.error('Error fetching branding settings:', error)
  }
  return defaultBranding
}

// Apply branding to CSS custom properties
export function applyBrandingToDocument(branding: BrandingSettings) {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.style.setProperty('--primary-color', branding.primary_color)
  root.style.setProperty('--secondary-color', branding.secondary_color)
  root.style.setProperty('--accent-color', branding.accent_color)
  root.style.setProperty('--font-family', branding.font_family)
}

// Generate CSS variables for branding
export function generateBrandingCSS(branding: BrandingSettings): string {
  return `
    :root {
      --primary-color: ${branding.primary_color};
      --secondary-color: ${branding.secondary_color};
      --accent-color: ${branding.accent_color};
      --font-family: ${branding.font_family};
    }
  `
}



