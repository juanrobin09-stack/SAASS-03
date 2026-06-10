import { Pricing } from '@/components/landing/pricing'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <div className="pt-20">
        <Pricing />
      </div>
      <Footer />
    </div>
  )
}
