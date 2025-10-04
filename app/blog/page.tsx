import { Metadata } from 'next'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Rhode Island Digital Marketing Blog - SEO Tips & Strategies | Amenti AI',
  description: 'Rhode Island\'s #1 digital marketing blog. Get expert SEO tips, local marketing strategies, and business growth insights from Amenti AI\'s Providence-based team. Free RI marketing resources.',
  keywords: 'Rhode Island digital marketing blog, RI SEO tips, Providence marketing strategies, Rhode Island business growth, local SEO blog RI, Providence digital marketing tips, RI marketing insights, Rhode Island SEO blog, Providence business marketing, RI digital marketing resources',
  alternates: {
    canonical: 'https://amentiai.com/blog',
  },
  openGraph: {
    title: 'Digital Marketing Blog - Amenti AI | SEO Tips & Strategies',
    description: 'Stay updated with the latest digital marketing insights, SEO strategies, and business growth tips from Amenti AI\'s expert team.',
    url: 'https://amentiai.com/blog',
    siteName: 'Amenti AI',
    images: [
      {
        url: 'https://amentiai.com/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amenti AI Digital Marketing Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Blog - Amenti AI | SEO Tips & Strategies',
    description: 'Stay updated with the latest digital marketing insights, SEO strategies, and business growth tips from Amenti AI\'s expert team.',
    images: ['https://amentiai.com/images/blog-og.jpg'],
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

export default function BlogPage() {
  return <BlogContent />
}