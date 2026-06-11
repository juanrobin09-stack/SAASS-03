import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Pricing } from '@/components/landing/pricing'
import { FAQ } from '@/components/landing/faq'
import { Footer } from '@/components/landing/footer'
import { FloatingCTA } from '@/components/landing/floating-cta'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />

      {/* Value proof section — honest, no fake names */}
      <section className="py-14 sm:py-20 border-y border-dark-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-dark-400 text-sm mb-12 uppercase tracking-widest font-medium">
            Ce que LocalScore.ai vous permet de faire dès aujourd'hui
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Identifier pourquoi vous perdez des clients',
                desc: 'Votre concurrent a 47 avis, vous en avez 12. Votre score Google Profile est incomplet. LocalScore.ai vous dit exactement où vous perdez des points.',
              },
              {
                title: 'Agir sur les bons leviers chaque semaine',
                desc: '5 missions priorisées par l\'IA selon votre situation réelle. Pas de conseil générique. Chaque action est chiffrée en points de score.',
              },
              {
                title: 'Mesurer votre progression dans le temps',
                desc: 'Un historique semaine par semaine. Vous voyez l\'impact de vos actions et vous comprenez ce qui fonctionne vraiment pour votre activité.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center mb-4">
                  <CheckCircle className="w-4 h-4 text-accent-400" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm">{item.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pricing />
      <FAQ />

      {/* Final CTA */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-primary-950/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] bg-primary-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            Votre concurrent est en avance.
            <br />
            <span className="text-primary-400">Vous pouvez changer ça.</span>
          </h2>
          <p className="text-base sm:text-xl text-dark-400 mb-8 sm:mb-10 max-w-xl mx-auto">
            Votre premier score en 60 secondes. Gratuit. Sans carte bancaire.
          </p>
          <a
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-bold shadow-glow hover:shadow-glow-lg transition-all duration-200 w-full sm:w-auto"
          >
            Analyser mon établissement — Gratuit
            <ArrowRight className="w-5 h-5 shrink-0" />
          </a>
          <p className="text-dark-500 text-sm mt-4">Sans carte bancaire • Annulable à tout moment</p>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
