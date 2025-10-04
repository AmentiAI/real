import { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact Amenti AI - Rhode Island Digital Marketing Agency | Providence SEO Experts',
  description: 'Contact Amenti AI, Rhode Island\'s #1 digital marketing agency. Get your free SEO consultation from our Providence-based experts. Call (401) 123-4567 or visit our RI office.',
  keywords: 'contact Amenti AI, Rhode Island digital marketing, Providence SEO consultation, RI marketing agency contact, free SEO audit Rhode Island, Providence web design consultation, RI digital marketing experts, Rhode Island SEO agency contact, Providence marketing company, RI business consultation',
  alternates: {
    canonical: 'https://amentiai.com/contact',
  },
  openGraph: {
    title: 'Contact Amenti AI - Rhode Island Digital Marketing Agency',
    description: 'Get in touch with Amenti AI, Rhode Island\'s premier digital marketing agency. Free consultation, expert advice, and proven strategies for your business growth.',
    url: 'https://amentiai.com/contact',
    siteName: 'Amenti AI',
    images: [
      {
        url: 'https://amentiai.com/images/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Amenti AI - Rhode Island Digital Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Amenti AI - Rhode Island Digital Marketing Agency',
    description: 'Get in touch with Amenti AI, Rhode Island\'s premier digital marketing agency. Free consultation, expert advice, and proven strategies for your business growth.',
    images: ['https://amentiai.com/images/contact-og.jpg'],
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

export default function ContactPage() {
  return <ContactContent />
}