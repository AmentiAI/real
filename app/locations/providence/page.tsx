import { Metadata } from 'next'
import ProvidenceContent from './ProvidenceContent'

export const metadata: Metadata = {
  title: 'Providence RI Digital Marketing Agency | SEO, Web Design & PPC | Amenti AI',
  description: 'Providence\'s #1 digital marketing agency. Amenti AI helps RI businesses dominate Google with proven SEO, web design & PPC strategies. Located in Providence, serving all of Rhode Island.',
  keywords: 'Providence digital marketing, Providence SEO agency, RI web design Providence, Providence PPC management, local SEO Providence RI, Providence marketing agency, Rhode Island digital marketing Providence, Providence business marketing, RI SEO services Providence, Providence website design',
  alternates: {
    canonical: 'https://amentiai.com/locations/providence',
  },
  openGraph: {
    title: 'Providence RI Digital Marketing Agency | SEO, Web Design & PPC | Amenti AI',
    description: 'Providence\'s #1 digital marketing agency. Amenti AI helps RI businesses dominate Google with proven SEO, web design & PPC strategies. Located in Providence, serving all of Rhode Island.',
    url: 'https://amentiai.com/locations/providence',
    siteName: 'Amenti AI - Providence Digital Marketing',
    images: [
      {
        url: 'https://amentiai.com/images/providence-digital-marketing-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Providence RI Digital Marketing Agency - Amenti AI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Providence RI Digital Marketing Agency | SEO, Web Design & PPC | Amenti AI',
    description: 'Providence\'s #1 digital marketing agency. Amenti AI helps RI businesses dominate Google with proven SEO, web design & PPC strategies.',
    images: ['https://amentiai.com/images/providence-digital-marketing-og.jpg'],
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

// Structured Data for Local Business in Providence
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Amenti AI - Providence Digital Marketing",
  "description": "Providence's premier digital marketing agency specializing in SEO, web design, and PPC management for Rhode Island businesses.",
  "url": "https://amentiai.com/locations/providence",
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
  "image": "https://amentiai.com/images/providence-office.jpg",
  "logo": "https://amentiai.com/images/amenti-ai-logo.jpg",
  "areaServed": [
    {
      "@type": "City",
      "name": "Providence",
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
    "geoRadius": "25000"
  }
}

export default function ProvidencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProvidenceContent />
    </>
  )
}