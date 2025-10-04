'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  company: string
  role: string
  image: string
  rating: number
  content: string
  results: string[]
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'Premier Construction',
    role: 'CEO',
    image: '/images/testimonials/sarah-johnson.jpg',
    rating: 5,
    content: 'Amenti AI transformed our online presence completely. We went from struggling to get leads to being the #1 contractor in our area. Our revenue increased by 300% in just 6 months.',
    results: ['300% Revenue Increase', '50+ New Leads/Month', '#1 Google Rankings']
  },
  {
    id: 2,
    name: 'Michael Chen',
    company: 'Elite Law Firm',
    role: 'Managing Partner',
    image: '/images/testimonials/michael-chen.jpg',
    rating: 5,
    content: 'The results speak for themselves. Our organic traffic increased by 400% and we\'re now ranking #1 for all our target keywords. The ROI has been incredible.',
    results: ['400% Traffic Growth', '98% First Page Rankings', '$2M+ Additional Revenue']
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    company: 'HealthCare Plus',
    role: 'Marketing Director',
    image: '/images/testimonials/emily-rodriguez.jpg',
    rating: 5,
    content: 'Working with Amenti AI has been a game-changer. Their AI-powered approach and data-driven strategies have helped us dominate our local market and expand nationally.',
    results: ['500% Lead Generation', 'National Expansion', '95% Client Retention']
  },
  {
    id: 4,
    name: 'David Thompson',
    company: 'TechStart Solutions',
    role: 'Founder',
    image: '/images/testimonials/david-thompson.jpg',
    rating: 5,
    content: 'The team at Amenti AI understands both technology and marketing. They helped us scale from startup to market leader in just 18 months. Absolutely phenomenal results.',
    results: ['Market Leadership', '18-Month Growth', '200% Conversion Rate']
  }
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
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

    const element = document.getElementById('testimonials-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentTestimonial]

  return (
    <section id="testimonials-section" className="py-24 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Client Success Stories
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what real business owners say about working with Amenti AI.
          </p>
        </div>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-12 h-12 text-blue-300 mb-6" />
                
                <blockquote className="text-xl lg:text-2xl text-white mb-8 leading-relaxed">
                  "{current.content}"
                </blockquote>

                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {current.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">{current.name}</div>
                    <div className="text-blue-200">{current.role}, {current.company}</div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-6">Key Results:</h3>
                {current.results.map((result, index) => (
                  <div key={index} className="flex items-center p-4 bg-white/10 rounded-xl border border-white/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-white font-medium">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-12 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-blue-200 mb-8">Trusted by industry leaders across multiple sectors</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            {['Construction', 'Legal', 'Healthcare', 'Technology'].map((industry, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white mb-2">{industry}</div>
                <div className="text-blue-200">Industry Leaders</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
