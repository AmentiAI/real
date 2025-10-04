'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react'
import { useBranding } from './BrandingProvider'

interface NavigationPage {
  id: string
  title: string
  slug: string
  description: string
  nav_location: string
}

export default function Navigation() {
  const { branding } = useBranding()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [headerPages, setHeaderPages] = useState<NavigationPage[]>([])
  const [mobilePages, setMobilePages] = useState<NavigationPage[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchNavigationPages = async () => {
      try {
        const [headerResponse, mobileResponse] = await Promise.all([
          fetch('/api/navigation?location=header'),
          fetch('/api/navigation?location=mobile')
        ])
        
        if (headerResponse.ok) {
          const pages = await headerResponse.json()
          setHeaderPages(pages)
        }
        
        if (mobileResponse.ok) {
          const pages = await mobileResponse.json()
          setMobilePages(pages)
        }
      } catch (error) {
        console.error('Error fetching navigation pages:', error)
      }
    }

    fetchNavigationPages()
  }, [])

  const navItems = [
    { name: 'Services', 
      submenu: [
        { name: 'Complete Growth Packages', href: '/services/complete-growth-packages' },
        { name: 'Website Design & Development', href: '/services/website-design-development' },
        { name: 'SEO Services', href: '/services/seo-services' },
        { name: 'Branding & Identity', href: '/services/branding-identity' },
        { name: 'Pricing', href: '/pricing' }
      ]
    },
    { 
      name: 'Industries', 
      href: '/industries',
      submenu: [
        { name: 'Roofers', href: '/industries/roofers' },
        { name: 'Lawyers', href: '/industries/lawyers' },
        { name: 'Contractors', href: '/industries/contractors' }
      ]
    },
    { 
      name: 'Locations', 
      href: '/locations',
      submenu: [
        { name: 'Providence', href: '/locations/providence' },
        { name: 'Warwick', href: '/locations/warwick' },
        { name: 'Cranston', href: '/locations/cranston' },
        { name: 'Newport', href: '/locations/newport' }
      ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Client Portal', href: '/clients' },
  ]

  return (
    <div className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10' : 'bg-white/95 backdrop-blur-md'
    }`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-2 hidden md:block relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px] animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 group">
                <Phone size={14} className="text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
                <span className="font-medium group-hover:text-blue-100 transition-colors duration-200">{branding.contact_phone}</span>
              </div>
              <div className="flex items-center space-x-2 group">
                <Mail size={14} className="text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
                <span className="font-medium group-hover:text-blue-100 transition-colors duration-200">{branding.contact_email}</span>
              </div>
            </div>
            <div className="text-slate-300 font-medium flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Serving Rhode Island & the Entire USA
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`border-b transition-all duration-500 ${
        isScrolled ? 'border-white/20 bg-white/90 backdrop-blur-xl' : 'border-slate-200/50 bg-white/95 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Social Media Links */}
            <div className="flex items-center space-x-3 mr-8">
              {branding.social_media.facebook && (
                <a 
                  href={branding.social_media.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-blue-600 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {branding.social_media.twitter && (
                <a 
                  href={branding.social_media.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-blue-400 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
              {branding.social_media.linkedin && (
                <a 
                  href={branding.social_media.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-blue-700 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {branding.social_media.instagram && (
                <a 
                  href={branding.social_media.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-pink-600 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </a>
              )}
              {branding.social_media.youtube && (
                <a 
                  href={branding.social_media.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-red-600 transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>

            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
              {branding.logo_light ? (
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <img 
                    src={branding.logo_light} 
                    alt={branding.company_name}
                    className="relative h-10 w-auto z-10 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <div 
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg"
                    style={{ backgroundColor: branding.primary_color }}
                  >
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                </div>
              )}
              <div className="hidden sm:block">
                <span 
                  className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 group-hover:from-blue-600 group-hover:to-purple-600 bg-clip-text text-transparent transition-all duration-300"
                  style={{ fontFamily: branding.font_family }}
                >
                  {branding.company_name}
                </span>
                <div className="text-xs text-slate-500 font-medium group-hover:text-blue-600 transition-colors duration-300">{branding.tagline}</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 flex-1 justify-center">
              {navItems.map((item) => (
                <div 
                  key={item.name} 
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.href && !item.submenu ? (
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 whitespace-nowrap group relative overflow-hidden"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                    </Link>
                  ) : (
                    <button
                      className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 flex items-center whitespace-nowrap group relative overflow-hidden"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <ChevronDown className="ml-1 relative z-10 group-hover:rotate-180 transition-transform duration-300" size={14} />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                    </button>
                  )}
                  {item.submenu && activeDropdown === item.name && (
                    <>
                      <div className="absolute top-full left-0 w-full h-1"></div>
                      <div 
                        className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-500/10 border border-white/20 py-3 z-50 animate-slide-down"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.submenu.map((subItem, index) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 group relative overflow-hidden"
                            onClick={() => setActiveDropdown(null)}
                            style={{animationDelay: `${index * 0.1}s`}}
                          >
                            <span className="relative z-10">{subItem.name}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
              
              {/* Dynamic Header Pages */}
              {headerPages.map((page) => (
                <Link
                  key={`header-page-${page.id}`}
                  href={`/${page.slug}`}
                  className="px-3 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200 rounded-lg hover:bg-slate-50 whitespace-nowrap"
                >
                  {page.title}
                </Link>
              ))}
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              <Link
                href="/checkout"
                className="group relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-2xl transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:shadow-green-500/25 hover:scale-105 transform overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
              <Link
                href="/contact"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-2xl transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transform overflow-hidden"
              >
                <span className="relative z-10">Free Strategy Call</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden border-t border-slate-200">
              <div className="px-4 pt-4 pb-6 space-y-1 bg-white">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.href && !item.submenu ? (
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <div className="block px-4 py-3 text-slate-700 font-medium">
                        {item.name}
                      </div>
                    )}
                    {item.submenu && (
                      <div className="ml-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Dynamic Mobile Pages */}
                {mobilePages.map((page) => (
                  <Link
                    key={`mobile-page-${page.id}`}
                    href={`/${page.slug}`}
                    className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {page.title}
                  </Link>
                ))}
                
                {/* Mobile Social Media Links */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-center space-x-6">
                    {branding.social_media.facebook && (
                      <a 
                        href={branding.social_media.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
                        aria-label="Facebook"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                    {branding.social_media.twitter && (
                      <a 
                        href={branding.social_media.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-blue-400 transition-colors duration-200"
                        aria-label="Twitter"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    {branding.social_media.linkedin && (
                      <a 
                        href={branding.social_media.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-blue-700 transition-colors duration-200"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {branding.social_media.instagram && (
                      <a 
                        href={branding.social_media.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-pink-600 transition-colors duration-200"
                        aria-label="Instagram"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                        </svg>
                      </a>
                    )}
                    {branding.social_media.youtube && (
                      <a 
                        href={branding.social_media.youtube} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-red-600 transition-colors duration-200"
                        aria-label="YouTube"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <Link
                    href="/checkout"
                    className="block w-full text-center px-4 py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg font-semibold transition-colors duration-200 mb-3"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/contact"
                    className="block w-full text-center px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Free Strategy Call
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}