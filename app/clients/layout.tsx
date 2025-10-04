import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Portal | Amenti AI',
  description: 'Access your digital marketing dashboard and track your website performance.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {children}
    </div>
  )
}