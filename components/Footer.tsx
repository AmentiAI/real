'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import { useBranding } from './BrandingProvider'

interface FooterContent {
  id: number
  company_name: string
  description: string
  quick_links: Array<{
    text: string
    link: string
  }>
  contact_info: {
    email: string
    email2: string
    phone: string
    address: string
    city: string
  }
  social_links: {
    facebook: string
    twitter: string
    linkedin: string
    instagram: string
  }
  copyright_text: string
  legal_links: Array<{
    text: string
    link: string
  }>
}

interface NavigationPage {
  id: string
  title: string
  slug: string
  description: string
  nav_location: string
}

interface Keyword {
  keyword: string
  state: string
  category: string
}

export default function Footer() {
  const { branding } = useBranding()
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null)
  const [footerPages, setFooterPages] = useState<NavigationPage[]>([])
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        // Fetch footer content, navigation pages, and keywords in parallel
        const [footerResponse, navigationResponse, keywordsResponse] = await Promise.all([
          fetch('/api/content/footer'),
          fetch('/api/navigation?location=footer'),
          fetch('/api/keywords?limit=30')
        ])
        
        if (footerResponse.ok) {
          const data = await footerResponse.json()
          setFooterContent(data)
        }
        
        if (navigationResponse.ok) {
          const pages = await navigationResponse.json()
          setFooterPages(pages)
        }
        
        if (keywordsResponse.ok) {
          const keywordsData = await keywordsResponse.json()
          setKeywords(keywordsData)
        }
      } catch (error) {
        console.error('Error fetching footer content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFooterContent()
  }, [])

  if (loading) {
    return (
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            <p className="mt-2 text-slate-300">Loading...</p>
          </div>
        </div>
      </footer>
    )
  }

  if (!footerContent) {
    return null
  }

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              {branding.logo_dark ? (
                <img 
                  src={branding.logo_dark} 
                  alt={branding.company_name}
                  className="h-12 w-auto"
                />
              ) : (
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: branding.primary_color }}
                >
                  <span className="text-white font-bold text-xl">A</span>
                </div>
              )}
              <span 
                className="text-2xl font-bold"
                style={{ fontFamily: branding.font_family }}
              >
                {branding.company_name}
              </span>
            </div>
            <p className="text-slate-300 mb-8 max-w-md leading-relaxed">
              {branding.tagline}
            </p>
            <div className="flex space-x-6">
              {branding.social_media.facebook && (
                <a href={branding.social_media.facebook} className="text-slate-400 hover:text-white transition-colors duration-200">
                  <Facebook size={24} />
                </a>
              )}
              {branding.social_media.twitter && (
                <a href={branding.social_media.twitter} className="text-slate-400 hover:text-white transition-colors duration-200">
                  <Twitter size={24} />
                </a>
              )}
              {branding.social_media.linkedin && (
                <a href={branding.social_media.linkedin} className="text-slate-400 hover:text-white transition-colors duration-200">
                  <Linkedin size={24} />
                </a>
              )}
              {branding.social_media.instagram && (
                <a href={branding.social_media.instagram} className="text-slate-400 hover:text-white transition-colors duration-200">
                  <Instagram size={24} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {/* Static quick links */}
              {footerContent.quick_links.map((link, index) => (
                <li key={`static-${index}`}>
                  <Link href={link.link} className="text-slate-300 hover:text-white transition-colors duration-200">
                    {link.text}
                  </Link>
                </li>
              ))}
              {/* Dynamic pages */}
              {footerPages.map((page) => (
                <li key={`page-${page.id}`}>
                  <Link href={`/${page.slug}`} className="text-slate-300 hover:text-white transition-colors duration-200">
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="text-blue-400 mr-4 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-slate-300 hover:text-white transition-colors duration-200">{branding.contact_email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="text-blue-400 mr-4 flex-shrink-0" size={20} />
                <p className="text-slate-300 hover:text-white transition-colors duration-200">{branding.contact_phone}</p>
              </div>
              <div className="flex items-start">
                <MapPin className="text-blue-400 mr-4 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-slate-300 hover:text-white transition-colors duration-200">{branding.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section - Clean and Organized */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <h3 className="text-xl font-semibold mb-6 text-white text-center">Our Digital Marketing Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Rhode Island', 'Connecticut', 'Massachusetts'].map((state) => {
              const stateKeywords = keywords.filter(k => k.state === state);
              const categories = Array.from(new Set(stateKeywords.map(k => k.category)));
              
              return (
                <div key={state} className="text-center">
                  <h4 className="text-blue-400 font-semibold text-lg mb-4">{state}</h4>
                  <div className="space-y-2">
                    {categories.slice(0, 4).map((category, index) => {
                      const categoryKeywords = stateKeywords.filter(k => k.category === category);
                      return (
                        <div key={index} className="text-slate-300 text-sm">
                          {categoryKeywords[0]?.keyword || category}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} {branding.company_name}. All rights reserved.
              </p>
              <p className="text-slate-500 text-xs mt-1">
                AI-Powered Digital Marketing Solutions
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              {footerContent.legal_links.map((link, index) => (
                <Link key={index} href={link.link} className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}