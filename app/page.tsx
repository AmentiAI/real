import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import CredibilitySection from '@/components/CredibilitySection'
import CTASection from '@/components/CTASection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen pt-24">
      <Hero />
      <Services />
      <Portfolio />
      <CredibilitySection />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  )
}
