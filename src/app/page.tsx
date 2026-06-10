import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Pricing } from '@/components/landing/pricing'
import { FAQ } from '@/components/landing/faq'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />

      {/* Social proof section */}
      <section className="py-20 border-y border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-dark-400 text-sm mb-8 uppercase tracking-widest font-medium">Ils utilisent LocalScore.ai</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {[
              'Restaurant Le Central',
              'Boulangerie Dupont',
              'Cabinet Dr. Martin',
              'Coiffeur Style +',
              'Garage AutoPro',
              'Boutique Mode & Co',
            ].map((name) => (
              <span key={name} className="text-dark-600 font-medium text-sm">{name}</span>
            ))}
          </div>
        </div>
      </section>

      <Pricing />
      <FAQ />

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-primary-950/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Prêt à dominer
            <br />
            <span className="text-primary-400">votre marché local ?</span>
          </h2>
          <p className="text-xl text-dark-400 mb-10 max-w-xl mx-auto">
            Commencez gratuitement. Votre premier score en 60 secondes.
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-10 py-5 rounded-xl text-lg font-bold shadow-glow hover:shadow-glow-lg transition-all duration-200"
          >
            Analyser mon établissement — C'est gratuit
          </a>
          <p className="text-dark-500 text-sm mt-4">Sans carte bancaire • Résultats en 60 secondes</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
