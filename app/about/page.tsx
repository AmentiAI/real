import { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About Amenti AI - Rhode Island Digital Marketing Experts | Providence SEO Agency',
  description: 'Learn about Amenti AI, Rhode Island\'s #1 digital marketing agency. Our Providence-based team helps RI businesses dominate Google with proven SEO, web design, and PPC strategies. 150+ successful clients.',
  keywords: 'about Amenti AI, Rhode Island digital marketing agency, Providence SEO experts, RI web design team, Rhode Island marketing company, local SEO Providence, RI digital marketing experts, Rhode Island SEO agency, Providence web design company, RI marketing specialists',
  alternates: {
    canonical: 'https://amentiai.com/about',
  },
  openGraph: {
    title: 'About Amenti AI - Rhode Island Digital Marketing Experts',
    description: 'Learn about Amenti AI, Rhode Island\'s premier digital marketing agency. Our team of experts helps businesses grow with proven SEO, web design, and marketing strategies.',
    url: 'https://amentiai.com/about',
    siteName: 'Amenti AI',
    images: [
      {
        url: 'https://amentiai.com/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'About Amenti AI - Rhode Island Digital Marketing Experts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Amenti AI - Rhode Island Digital Marketing Experts',
    description: 'Learn about Amenti AI, Rhode Island\'s premier digital marketing agency. Our team of experts helps businesses grow with proven SEO, web design, and marketing strategies.',
    images: ['https://amentiai.com/images/about-og.jpg'],
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

export default function AboutPage() {
  return <AboutContent />
}