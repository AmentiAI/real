'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      submenu: [
        { name: 'Complete Growth Packages', href: '/services/complete-growth-packages' },
        { name: 'Website Design & Development', href: '/services/website-design' },
        { name: 'SEO Services', href: '/services/seo-services' },
        { name: 'Branding & Identity', href: '/services/branding-identity' },
        { name: 'Content Marketing', href: '/services/content-marketing' },
        { name: 'Paid Ads & Social Media', href: '/services/paid-ads-social' },
        { name: 'Platforms & Custom Systems', href: '/services/platforms-systems' },
        { name: 'White Label SEO', href: '/services/white-label-seo' },
        { name: 'White Label Website Design', href: '/services/white-label-website' },
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
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <div className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-large' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 hidden md:block">
        <div className="container-custom">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>(401) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>hello@amentiai.com</span>
              </div>
            </div>
            <div className="text-gray-300">
              Serving Rhode Island & New England
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav>
        <div className="container-custom">
          <div className="flex justify-between items-center h-20">
            {/* Professional Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-medium">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">Amenti AI</span>
                <div className="text-xs text-gray-500 -mt-1">Digital Marketing</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
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
                      className="nav-link flex items-center py-2"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      className="nav-link flex items-center py-2"
                    >
                      {item.name}
                      {item.submenu && <ChevronDown className="ml-1" size={16} />}
                    </button>
                  )}
                  {item.submenu && activeDropdown === item.name && (
                    <>
                      {/* Invisible bridge to prevent dropdown from closing when moving mouse */}
                      <div className="absolute top-full left-0 w-full h-1"></div>
                      <div 
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-large border border-gray-200 opacity-100 visible transition-all duration-200 z-50"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="py-4">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-6 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Professional CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/contact"
                className="btn-primary"
              >
                Free Strategy Call
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden">
              <div className="px-4 pt-4 pb-6 space-y-2 bg-white border-t border-gray-200">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.href && !item.submenu ? (
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <div className="block px-4 py-3 text-gray-700 font-medium">
                        {item.name}
                      </div>
                    )}
                    {item.submenu && (
                      <div className="ml-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-4 py-3 bg-primary-600 text-white hover:bg-primary-700 rounded-xl font-medium transition-colors duration-200"
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
