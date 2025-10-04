import { Metadata } from 'next'
import CaseStudiesContent from './CaseStudiesContent'

export const metadata: Metadata = {
  title: 'Rhode Island Digital Marketing Case Studies - Proven Results | Amenti AI',
  description: 'Real Rhode Island digital marketing case studies from Amenti AI clients. See how RI businesses achieved 400% growth, 98% first-page rankings, and millions in revenue with our Providence-based team.',
  keywords: 'Rhode Island digital marketing case studies, RI SEO success stories, Providence marketing results, Rhode Island business growth stories, RI digital marketing examples, Providence SEO case studies, Rhode Island marketing agency results, RI business success stories, Providence digital marketing wins, Rhode Island SEO results',
  alternates: {
    canonical: 'https://amentiai.com/case-studies',
  },
  openGraph: {
    title: 'Case Studies - Amenti AI | Proven Digital Marketing Results',
    description: 'Explore real case studies and success stories from Amenti AI clients. See how we\'ve helped businesses achieve 400% growth, 98% first-page rankings, and millions in additional revenue.',
    url: 'https://amentiai.com/case-studies',
    siteName: 'Amenti AI',
    images: [
      {
        url: 'https://amentiai.com/images/case-studies-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amenti AI Case Studies - Digital Marketing Success Stories',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies - Amenti AI | Proven Digital Marketing Results',
    description: 'Explore real case studies and success stories from Amenti AI clients. See how we\'ve helped businesses achieve 400% growth, 98% first-page rankings, and millions in additional revenue.',
    images: ['https://amentiai.com/images/case-studies-og.jpg'],
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

export default function CaseStudiesPage() {
  return <CaseStudiesContent />
}