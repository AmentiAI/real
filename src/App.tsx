import { useState } from 'react'
import './index.css'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import CredibilitySection from './components/CredibilitySection'
import CTASection from './components/CTASection'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'
import Navigation from './components/Navigation'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-24">
        <Hero />
        <Services />
        <Portfolio />
        <CredibilitySection />
        <CTASection />
        <FAQSection />
        <Footer />
      </main>
    </div>
  )
}

export default App
