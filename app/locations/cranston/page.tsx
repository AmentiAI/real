import { Metadata } from 'next'
import CranstonContent from './CranstonContent'

export const metadata: Metadata = {
  title: 'Cranston RI Digital Marketing Services | Amenti AI',
  description: 'Professional digital marketing services for Cranston, RI businesses. Local SEO, web design, and marketing strategies that drive results.',
  keywords: 'Cranston RI digital marketing, Cranston SEO, Cranston web design, Rhode Island marketing agency',
  alternates: {
    canonical: 'https://amentiai.com/locations/cranston',
  },
  openGraph: {
    title: 'Cranston RI Digital Marketing Services | Amenti AI',
    description: 'Professional digital marketing services for Cranston, RI businesses. Local SEO, web design, and marketing strategies that drive results.',
    url: 'https://amentiai.com/locations/cranston',
    siteName: 'Amenti AI',
    images: [
      {
        url: 'https://amentiai.com/images/locations/cranston-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Cranston RI Digital Marketing Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cranston RI Digital Marketing Services | Amenti AI',
    description: 'Professional digital marketing services for Cranston, RI businesses. Local SEO, web design, and marketing strategies that drive results.',
    images: ['https://amentiai.com/images/locations/cranston-og.jpg'],
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

export default function CranstonPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <CranstonContent />
    </main>
  )
}