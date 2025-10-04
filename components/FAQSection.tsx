'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'How quickly will I see results?',
    answer: 'Most clients see initial improvements within 30-60 days, with significant growth within 3-6 months. Our AI-powered approach accelerates the traditional SEO timeline significantly.'
  },
  {
    id: 2,
    question: 'Do you guarantee first-page rankings?',
    answer: 'Yes! We guarantee first-page Google rankings for your target keywords, or we work for free until you get there. This is our promise to every client.'
  },
  {
    id: 3,
    question: 'What makes your approach different?',
    answer: 'We use cutting-edge AI technology combined with proven marketing strategies. Our system analyzes millions of data points to optimize your campaigns for maximum results.'
  },
  {
    id: 4,
    question: 'Do you work with businesses outside Rhode Island?',
    answer: 'Absolutely! While we\'re based in Rhode Island, we serve clients nationwide. Our digital marketing strategies work for businesses in any location.'
  },
  {
    id: 5,
    question: 'What\'s included in your services?',
    answer: 'Our services include website development, SEO optimization, content marketing, social media management, and ongoing reporting. We provide everything you need to dominate online.'
  },
  {
    id: 6,
    question: 'How much do your services cost?',
    answer: 'Our pricing varies based on your specific needs and goals. We offer flexible packages for SEO services, website design, and complete growth solutions. Contact us for a personalized quote based on your business requirements.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to the most common questions about our digital marketing services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}