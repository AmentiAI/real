'use client'

import Head from 'next/head'

interface SEOHeadProps {
  title: string
  description: string
  keywords: string
  canonical: string
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  structuredData?: any
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://amentiai.com/images/og-default.jpg',
  ogTitle,
  ogDescription,
  structuredData
}: SEOHeadProps) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Amenti AI - Rhode Island Digital Marketing" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={ogTitle || title} />
      <meta property="twitter:description" content={ogDescription || description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Local Business Meta Tags */}
      <meta name="geo.region" content="US-RI" />
      <meta name="geo.placename" content="Providence, Rhode Island" />
      <meta name="geo.position" content="41.8240;-71.4128" />
      <meta name="ICBM" content="41.8240, -71.4128" />
      
      {/* Business Information */}
      <meta name="business:contact_data:street_address" content="123 Business Ave, Suite 100" />
      <meta name="business:contact_data:locality" content="Providence" />
      <meta name="business:contact_data:region" content="Rhode Island" />
      <meta name="business:contact_data:postal_code" content="02903" />
      <meta name="business:contact_data:country_name" content="United States" />
      <meta name="business:contact_data:phone_number" content="+1-401-123-4567" />
      <meta name="business:contact_data:email" content="hello@amentiai.com" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  )
}
