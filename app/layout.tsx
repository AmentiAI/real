import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import ConditionalNavigation from '@/components/ConditionalNavigation'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import BrandingProvider from '@/components/BrandingProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://amentiai.com'),
  title: 'Amenti AI — Rhode Island SEO & Website Design Experts',
  description: 'Rank higher, get more traffic, and grow faster with Amenti AI\'s SEO & website design. Free audit + proven results for Rhode Island businesses.',
  keywords: 'Rhode Island SEO, AI SEO company, SEO & website design experts, Local SEO Rhode Island, Grow traffic & conversions',
  authors: [{ name: 'Amenti AI' }],
  openGraph: {
    title: 'Amenti AI — Rhode Island SEO & Website Design Experts',
    description: 'Rank higher, get more traffic, and grow faster with Amenti AI\'s SEO & website design. Free audit + proven results for Rhode Island businesses.',
    type: 'website',
    locale: 'en_US',
    url: 'https://amentiai.com',
    siteName: 'Amenti AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amenti AI — Rhode Island SEO & Website Design Experts',
    description: 'Rank higher, get more traffic, and grow faster with Amenti AI\'s SEO & website design. Free audit + proven results for Rhode Island businesses.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BrandingProvider>
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
          <ConditionalNavigation />
          {children}
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </BrandingProvider>
      </body>
    </html>
  )
}
