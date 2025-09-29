import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import SessionProvider from '@/components/SessionProvider'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amenti AI - Internet Marketing & SEO Services',
  description: 'Professional internet marketing and SEO services for businesses across Rhode Island and the USA. We build websites and deliver high-powered SEO solutions.',
  keywords: 'SEO, internet marketing, website development, digital marketing, Rhode Island, USA',
  authors: [{ name: 'Amenti AI' }],
  openGraph: {
    title: 'Amenti AI - Internet Marketing & SEO Services',
    description: 'Professional internet marketing and SEO services for businesses across Rhode Island and the USA.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amenti AI - Internet Marketing & SEO Services',
    description: 'Professional internet marketing and SEO services for businesses across Rhode Island and the USA.',
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
        <SessionProvider>
          <Navigation />
          {children}
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
        </SessionProvider>
      </body>
    </html>
  )
}
