import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Search, Sparkles } from 'lucide-react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { BUSINESSES, CITIES, cap } from '@/lib/seo'
import type { Sector } from '@/lib/seo/businesses'

const SITE_URL = 'https://locentra.space'

export const metadata: Metadata = {
  title: 'SEO local & visibilité Google par métier et par ville | LocalScore.ai',
  description:
    'Analysez gratuitement la visibilité Google de votre entreprise. Guides de référencement local pour 100 métiers dans 100 villes françaises. Score Local IA et plan d’action.',
  alternates: { canonical: `${SITE_URL}/seo` },
  openGraph: {
    title: 'SEO local par métier et par ville | LocalScore.ai',
    description: 'Guides de référencement local et analyse gratuite de votre fiche Google Business.',
    url: `${SITE_URL}/seo`,
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'LocalScore.ai' }],
  },
  robots: { index: true, follow: true },
}

const SECTOR_LABELS: Record<Sector, string> = {
  restauration: 'Restauration & alimentation',
  sante: 'Santé & bien-être',
  beaute: 'Beauté & esthétique',
  batiment: 'Artisanat & bâtiment',
  commerce: 'Commerce & boutiques',
  auto: 'Automobile',
  services: 'Services aux entreprises & particuliers',
  sport: 'Sport & loisirs',
  hotellerie: 'Hôtellerie & tourisme',
  education: 'Éducation & événementiel',
}

const SECTOR_ORDER: Sector[] = [
  'restauration', 'sante', 'beaute', 'batiment', 'commerce',
  'auto', 'services', 'sport', 'hotellerie', 'education',
]

// Representative anchors so the hub seeds crawl paths into the matrix.
const TOP_CITY = CITIES[0] // Paris
const TOP_BUSINESS = BUSINESSES[0] // restaurant

export default function SeoHubPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-dark-900/80 border border-dark-700 rounded-full px-3 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-xs sm:text-sm text-dark-300 font-medium">100 métiers · 100 villes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight mb-5">
            Le référencement local,{' '}
            <span className="bg-gradient-to-r from-primary-400 via-violet-400 to-accent-400 bg-clip-text text-transparent">
              métier par métier, ville par ville
            </span>
          </h1>
          <p className="text-base sm:text-lg text-dark-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            Choisissez votre activité et votre ville pour découvrir pourquoi vos concurrents sont mieux référencés — et comment les dépasser avec LocalScore.ai.
          </p>
          <Link href="/register" className="inline-block">
            <Button size="xl" className="group shadow-glow shadow-primary-500/20">
              Analyser mon entreprise gratuitement
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* By trade */}
      <section className="py-14 sm:py-16 border-t border-dark-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Search className="w-5 h-5 text-primary-400" />
            Par métier
          </h2>
          <p className="text-dark-400 text-sm mb-10">
            Guides de visibilité locale pour 100 métiers à {TOP_CITY.name} — et dans 99 autres villes.
          </p>
          <div className="space-y-10">
            {SECTOR_ORDER.map((sector) => {
              const items = BUSINESSES.filter((b) => b.sector === sector)
              return (
                <div key={sector}>
                  <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wider mb-4">
                    {SECTOR_LABELS[sector]}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {items.map((b) => (
                      <Link
                        key={b.slug}
                        href={`/seo/${b.slug}/${TOP_CITY.slug}`}
                        className="px-3.5 py-2 rounded-xl bg-dark-900/60 border border-dark-800 hover:border-primary-500/40 hover:bg-dark-800/60 text-dark-300 hover:text-white text-sm transition-colors"
                      >
                        {cap(b.singular)}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* By city */}
      <section className="py-14 sm:py-16 bg-dark-900/30 border-y border-dark-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent-400" />
            Par ville
          </h2>
          <p className="text-dark-400 text-sm mb-10">
            Le référencement des {TOP_BUSINESS.plural} et de 99 autres métiers, dans 100 villes françaises.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/seo/${TOP_BUSINESS.slug}/${city.slug}`}
                className="px-3.5 py-2 rounded-xl bg-dark-900/60 border border-dark-800 hover:border-accent-500/40 hover:bg-dark-800/60 text-dark-300 hover:text-white text-sm transition-colors"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
