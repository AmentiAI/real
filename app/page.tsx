import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import CredibilitySection from '@/components/CredibilitySection'
import CTASection from '@/components/CTASection'
import FAQSection from '@/components/FAQSection'
import StatsSection from '@/components/StatsSection'
import AboutSection from '@/components/AboutSection'
import ProcessSection from '@/components/ProcessSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import PricingPreview from '@/components/PricingPreview'

export const metadata: Metadata = {
  title: 'Amenti AI - #1 Rhode Island Digital Marketing Agency | SEO, Web Design & PPC',
  description: 'Rhode Island\'s premier digital marketing agency. We help RI businesses dominate Google with proven SEO, web design & PPC strategies. 150+ clients, 400% growth guaranteed. Free consultation!',
  keywords: 'Rhode Island digital marketing, RI SEO agency, Providence web design, Rhode Island SEO services, RI PPC management, local SEO Rhode Island, digital marketing Providence RI, RI marketing agency, Rhode Island web design, RI social media marketing',
  alternates: {
    canonical: 'https://amentiai.com',
  },
  openGraph: {
    title: 'Amenti AI - #1 Rhode Island Digital Marketing Agency | SEO, Web Design & PPC',
    description: 'Rhode Island\'s premier digital marketing agency. We help RI businesses dominate Google with proven SEO, web design & PPC strategies. 150+ clients, 400% growth guaranteed. Free consultation!',
    url: 'https://amentiai.com',
    siteName: 'Amenti AI - Rhode Island Digital Marketing',
    images: [
      {
        url: 'https://amentiai.com/images/rhode-island-digital-marketing-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amenti AI - Rhode Island Digital Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amenti AI - #1 Rhode Island Digital Marketing Agency | SEO, Web Design & PPC',
    description: 'Rhode Island\'s premier digital marketing agency. We help RI businesses dominate Google with proven SEO, web design & PPC strategies. 150+ clients, 400% growth guaranteed.',
    images: ['https://amentiai.com/images/rhode-island-digital-marketing-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Structured Data for Local Business
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Amenti AI",
  "description": "Rhode Island's premier digital marketing agency specializing in SEO, web design, and PPC management for local businesses.",
  "url": "https://amentiai.com",
  "telephone": "+1-401-123-4567",
  "email": "hello@amentiai.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Business Ave, Suite 100",
    "addressLocality": "Providence",
    "addressRegion": "RI",
    "postalCode": "02903",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.8240",
    "longitude": "-71.4128"
  },
  "openingHours": "Mo-Fr 09:00-18:00,Sa 10:00-16:00",
  "priceRange": "$$",
  "image": "https://amentiai.com/images/amenti-ai-logo.jpg",
  "logo": "https://amentiai.com/images/amenti-ai-logo.jpg",
  "sameAs": [
    "https://www.facebook.com/amentiai",
    "https://www.linkedin.com/company/amenti-ai",
    "https://twitter.com/amentiai"
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "Providence",
      "containedInPlace": {
        "@type": "State",
        "name": "Rhode Island"
      }
    },
    {
      "@type": "City", 
      "name": "Cranston",
      "containedInPlace": {
        "@type": "State",
        "name": "Rhode Island"
      }
    },
    {
      "@type": "City",
      "name": "Warwick", 
      "containedInPlace": {
        "@type": "State",
        "name": "Rhode Island"
      }
    },
    {
      "@type": "City",
      "name": "Newport",
      "containedInPlace": {
        "@type": "State", 
        "name": "Rhode Island"
      }
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "41.8240",
      "longitude": "-71.4128"
    },
    "geoRadius": "50000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Marketing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SEO Services Rhode Island",
          "description": "Local SEO optimization for Rhode Island businesses"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Web Design Providence RI",
          "description": "Custom website design and development for Providence businesses"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "PPC Management Rhode Island",
          "description": "Google Ads and Facebook Ads management for RI businesses"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Sarah Johnson"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Amenti AI transformed our online presence completely. We went from struggling to get leads to being the #1 contractor in our area. Our revenue increased by 300% in just 6 months."
    }
  ]
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Hero />
        <StatsSection />
        <AboutSection />
        <Services />
        <ProcessSection />
        <Portfolio />
        <TestimonialsSection />
        <PricingPreview />
        <CredibilitySection />
        <CTASection />
        <FAQSection />
      </main>
    </>
  )
}