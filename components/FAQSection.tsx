'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "How quickly will I see results from your SEO services?",
    answer: "Most clients see initial improvements in rankings within 30-60 days, with significant lead increases typically occurring within 90 days. Our average client sees a 247% increase in organic leads within 12 weeks."
  },
  {
    question: "Do you guarantee results?",
    answer: "Yes! If we don't increase your organic leads by at least 25% in 90 days, we'll work for free the next month until we do. We're confident in our process and stand behind our work."
  },
  {
    question: "What makes you different from other SEO agencies?",
    answer: "We're Rhode Island natives who understand local business challenges. We combine technical expertise with deep local market knowledge and provide transparent reporting with real results, not vanity metrics."
  },
  {
    question: "How much do your services cost?",
    answer: "Our SEO services start at $2,500/month for local businesses. We also offer website development starting at $5,000 and digital marketing packages from $3,000/month. Every package is customized to your specific needs and goals."
  },
  {
    question: "Do you work with businesses outside of Rhode Island?",
    answer: "While we specialize in Rhode Island businesses, we work with clients across New England and select national accounts. Our local expertise gives us unique insights into regional market dynamics."
  },
  {
    question: "What information do you need to get started?",
    answer: "We'll need access to your Google Analytics, Google Search Console, and website hosting. We also need to understand your current marketing efforts, target keywords, and business goals. We handle all the technical setup."
  },
  {
    question: "How do you measure success?",
    answer: "We focus on metrics that matter to your business: organic leads, phone calls, form submissions, and revenue. We track rankings, traffic, and conversions, but our primary goal is increasing your qualified leads and sales."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Generate JSON-LD schema for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our SEO and digital marketing services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <Minus className="text-primary-600 flex-shrink-0" size={20} />
                  ) : (
                    <Plus className="text-gray-400 flex-shrink-0" size={20} />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Still have questions? We're here to help.
            </p>
            <a
              href="/contact"
              className="btn-primary"
            >
              Get Your Free Strategy Call
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
