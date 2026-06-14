import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Target,
  TrendingUp,
  MapPin,
  Star,
  ChevronRight,
  Search,
  BarChart3,
  Users,
  ListChecks,
} from 'lucide-react'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import type { Business, City } from '@/lib/seo'
import { cap, nearbyCities, similarBusinesses, relatedGuides } from '@/lib/seo'
import { buildPageContent } from '@/lib/seo/content'

interface Props {
  business: Business
  city: City
}

function CTAButton({ size = 'xl', label }: { size?: 'lg' | 'xl'; label: string }) {
  return (
    <Link href="/register" className="w-full sm:w-auto inline-block">
      <Button size={size} className="group shadow-glow shadow-primary-500/20 w-full sm:w-auto">
        {label}
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
      </Button>
    </Link>
  )
}

export function SeoLanding({ business, city }: Props) {
  const c = buildPageContent(business, city)
  const nearby = nearbyCities(city, 6)
  const similar = similarBusinesses(business, 6)
  const guides = relatedGuides(business, city, 6)

  const productPoints = [
    { icon: Search, title: 'Votre fiche Google Business', desc: 'Analyse complète de chaque champ : ce qui est rempli, ce qui manque, ce qui vous pénalise.' },
    { icon: BarChart3, title: 'Votre Score Local IA', desc: 'Une note claire sur 100 qui résume votre visibilité locale et son évolution dans le temps.' },
    { icon: Users, title: 'Vos concurrents directs', desc: `L’IA identifie les autres ${business.plural} de ${city.name} et compare avis, photos et complétude.` },
    { icon: TrendingUp, title: 'Votre visibilité', desc: 'Où vous apparaissez, où vous décrochez, et les recherches sur lesquelles vous êtes absent.' },
    { icon: ListChecks, title: 'Votre plan d’action', desc: '5 missions concrètes et priorisées, chaque action chiffrée en points de score à gagner.' },
    { icon: Sparkles, title: 'Vos recommandations marketing', desc: 'Des conseils personnalisés générés par IA selon votre situation réelle, pas des généralités.' },
  ]

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      {/* ---------- HERO ---------- */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] bg-primary-600/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Fil d’Ariane" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-dark-500">
              <li><Link href="/" className="hover:text-dark-300 transition-colors">Accueil</Link></li>
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
              <li><Link href="/seo" className="hover:text-dark-300 transition-colors">SEO local</Link></li>
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
              <li className="text-dark-300">{cap(business.singular)} à {city.name}</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 bg-dark-900/80 border border-dark-700 rounded-full px-3 py-1.5 mb-6">
            <MapPin className="w-3.5 h-3.5 text-accent-400 shrink-0" />
            <span className="text-xs sm:text-sm text-dark-300 font-medium">{city.name} · {city.region}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight mb-5">
            Analyse Google Business pour les{' '}
            <span className="bg-gradient-to-r from-primary-400 via-violet-400 to-accent-400 bg-clip-text text-transparent">
              {business.plural} à {city.name}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-dark-400 leading-relaxed mb-8 max-w-2xl">
            {c.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <CTAButton label="Analyser mon entreprise gratuitement" />
            <div className="flex items-center gap-2 text-dark-500 text-sm">
              <CheckCircle2 className="w-4 h-4 text-accent-400" />
              Gratuit · sans carte bancaire
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SECTION 1 — Why local ---------- */}
      <section className="py-14 sm:py-20 border-t border-dark-800/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
            {c.section1Title}
          </h2>
          <div className="space-y-5">
            {c.section1.map((p, i) => (
              <p key={i} className="text-dark-300 leading-relaxed text-base sm:text-[17px]">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SECTION 2 — Mistakes ---------- */}
      <section className="py-14 sm:py-20 bg-dark-900/30 border-y border-dark-800/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            {c.section2Title}
          </h2>
          <p className="text-dark-400 mb-10 max-w-2xl">
            Ces erreurs sont fréquentes et, surtout, faciles à corriger. Chacune d’elles vous coûte des clients chaque semaine sans que vous le sachiez.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {c.mistakes.map((m) => (
              <div key={m.title} className="bg-dark-900/60 border border-dark-800 rounded-2xl p-6">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-[18px] h-[18px] text-red-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{m.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SECTION 3 — How to improve ---------- */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            {c.section3Title}
          </h2>
          <p className="text-dark-400 mb-10 max-w-2xl">
            Le référencement local n’a rien de magique. Il repose sur une fiche Google Business optimisée et entretenue. Voici les leviers qui font vraiment bouger votre classement.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {c.levers.map((l) => (
              <div key={l.title} className="flex gap-4 bg-dark-900/40 border border-dark-800 rounded-2xl p-6">
                <div className="w-9 h-9 rounded-xl bg-accent-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-[18px] h-[18px] text-accent-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{l.title}</h3>
                  <p className="text-dark-400 text-sm leading-relaxed">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SECTION 4 — Why competitors win ---------- */}
      <section className="py-14 sm:py-20 bg-dark-900/30 border-y border-dark-800/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
            {c.section4Title}
          </h2>
          <p className="text-dark-300 leading-relaxed mb-8 text-base sm:text-[17px]">{c.section4Intro}</p>
          <ul className="space-y-4">
            {c.competitors.map((p, i) => (
              <li key={i} className="flex gap-3">
                <Target className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <span className="text-dark-300 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- SECTION 5 — Product ---------- */}
      <section className="py-14 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-3 py-1.5 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-xs sm:text-sm text-primary-300 font-medium">LocalScore.ai</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
              Une analyse complète de votre visibilité locale, en 60 secondes
            </h2>
            <p className="text-dark-400 leading-relaxed">
              LocalScore.ai scanne automatiquement votre présence Google et transforme ce que voit l’algorithme en un plan d’action clair. Sans jargon, sans agence, sans engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {productPoints.map((p) => (
              <div key={p.title} className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6">
                <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                  <p.icon className="w-[18px] h-[18px] text-primary-400" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm">{p.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Main CTA block */}
          <div className="relative overflow-hidden rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-950/40 to-dark-900/40 p-8 sm:p-12 text-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                Prêt à voir votre Score Local ?
              </h3>
              <p className="text-dark-300 mb-8 max-w-xl mx-auto">
                Lancez l’analyse de votre {business.singular} à {city.name} et découvrez exactement comment dépasser vos concurrents.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <CTAButton label="Lancer mon analyse gratuite" />
                <div className="flex items-center gap-1.5 text-dark-500 text-sm">
                  <Star className="w-4 h-4 text-accent-400" />
                  Résultat immédiat
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-14 sm:py-20 bg-dark-900/30 border-y border-dark-800/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 tracking-tight">
            Questions fréquentes — {business.plural} à {city.name}
          </h2>
          <div className="space-y-3">
            {c.faq.map((item) => (
              <details key={item.q} className="group bg-dark-900/60 border border-dark-800 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 text-white font-medium text-sm sm:text-base">
                  {item.q}
                  <ChevronRight className="w-5 h-5 text-dark-400 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 sm:px-6 pb-6 -mt-1">
                  <p className="text-dark-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- INTERNAL MESH ---------- */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Nearby cities */}
          <div>
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-400" />
              {cap(business.plural)} dans les villes proches
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {nearby.map((nc) => (
                <Link
                  key={nc.slug}
                  href={`/seo/${business.slug}/${nc.slug}`}
                  className="px-4 py-2 rounded-xl bg-dark-900/60 border border-dark-800 hover:border-primary-500/40 hover:bg-dark-800/60 text-dark-300 hover:text-white text-sm transition-colors"
                >
                  {cap(business.singular)} à {nc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Similar businesses */}
          <div>
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <Search className="w-4 h-4 text-primary-400" />
              Métiers similaires à {city.name}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {similar.map((sb) => (
                <Link
                  key={sb.slug}
                  href={`/seo/${sb.slug}/${city.slug}`}
                  className="px-4 py-2 rounded-xl bg-dark-900/60 border border-dark-800 hover:border-primary-500/40 hover:bg-dark-800/60 text-dark-300 hover:text-white text-sm transition-colors"
                >
                  {cap(sb.singular)} à {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Related guides */}
          <div>
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-violet-400" />
              Guides associés
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {guides.map((g) => (
                <Link
                  key={`${g.business.slug}-${g.city.slug}`}
                  href={`/seo/${g.business.slug}/${g.city.slug}`}
                  className="flex items-center justify-between gap-3 px-5 py-4 rounded-xl bg-dark-900/40 border border-dark-800 hover:border-primary-500/40 text-dark-300 hover:text-white text-sm transition-colors group"
                >
                  <span>Référencer {g.business.article} {g.business.singular} à {g.city.name}</span>
                  <ArrowRight className="w-4 h-4 text-dark-500 group-hover:text-primary-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
