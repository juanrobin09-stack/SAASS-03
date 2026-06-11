'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Check, Zap, Lock, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Gratuit',
    price: 0,
    description: 'Découvrez votre score local',
    icon: Lock,
    features: [
      '1 analyse complète',
      'Score Local IA (0–100)',
      'Comparaison avec 1 concurrent',
      'Détail du score en 6 dimensions',
      '5 missions de la semaine',
      'Rapport PDF basique',
    ],
    limit: 'Pas de suivi dans le temps',
    cta: 'Commencer gratuitement',
    href: '/register',
    highlighted: false,
    isPro: false,
  },
  {
    name: 'Pro',
    price: 19,
    description: 'Progressez semaine après semaine',
    icon: Zap,
    features: [
      '1 établissement suivi en continu',
      'Mise à jour automatique hebdomadaire',
      'Historique complet de vos scores',
      'Coach IA personnalisé à votre situation',
      'Alertes : concurrent actif, gain rapide',
      'Missions renouvelées chaque semaine',
      'Gamification : niveaux, badges, XP',
      'Export PDF premium partageable',
      'Analyse concurrentielle avancée',
    ],
    cta: 'Démarrer le Pro',
    href: '/register?plan=pro',
    highlighted: true,
    badge: 'Le plus populaire',
    isPro: true,
  },
]

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { isSignedIn, isLoaded } = useAuth()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const handleProCheckout = async () => {
    setCheckoutLoading(true)
    setCheckoutError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'PRO' }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setCheckoutError(data.error ?? 'Erreur lors du paiement. Réessayez.')
        setCheckoutLoading(false)
      }
    } catch {
      setCheckoutError('Impossible de contacter le serveur. Vérifiez votre connexion.')
      setCheckoutLoading(false)
    }
  }

  return (
    <section id="tarifs" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Tarifs simples et transparents
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Commencez gratuitement,
            <br />
            <span className="text-primary-400">évoluez à votre rythme</span>
          </h2>
          <p className="text-dark-400 text-lg">Sans engagement · Annulable à tout moment</p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-primary-600/15 via-dark-900/80 to-dark-900/80 border-2 border-primary-500/40 shadow-[0_0_60px_rgba(99,102,241,0.1)]'
                    : 'bg-dark-900/40 border border-dark-800'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-glow">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-7">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    plan.highlighted ? 'bg-primary-500/20 text-primary-400' : 'bg-dark-800 text-dark-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-black text-2xl tracking-tight mb-1">{plan.name}</h3>
                  <p className="text-dark-400 text-sm mb-5">{plan.description}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-5xl font-black text-white tracking-tight">
                      {plan.price === 0 ? 'Gratuit' : `${plan.price}€`}
                    </span>
                    {plan.price > 0 && <span className="text-dark-500 text-sm">/mois</span>}
                  </div>
                </div>

                {/* CTA — auth-aware for Pro plan */}
                <div className="mb-7">
                  {isLoaded && isSignedIn && plan.isPro ? (
                    <div className="space-y-2">
                      <Button
                        variant="primary"
                        className="w-full shadow-glow"
                        size="lg"
                        onClick={handleProCheckout}
                        loading={checkoutLoading}
                      >
                        <Zap className="w-4 h-4" />
                        {plan.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      {checkoutError && (
                        <p className="text-red-400 text-xs text-center">{checkoutError}</p>
                      )}
                    </div>
                  ) : (
                    <Link href={plan.href} className="block">
                      <Button
                        variant={plan.highlighted ? 'primary' : 'secondary'}
                        className={`w-full ${plan.highlighted ? 'shadow-glow' : ''}`}
                        size="lg"
                      >
                        {plan.highlighted && <Zap className="w-4 h-4" />}
                        {plan.cta}
                        {plan.highlighted && <ArrowRight className="w-4 h-4" />}
                      </Button>
                    </Link>
                  )}
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'bg-accent-500/15 border border-accent-500/20' : 'bg-dark-800'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? 'text-accent-400' : 'text-dark-400'}`} />
                      </div>
                      <span className="text-dark-300 text-sm">{feature}</span>
                    </li>
                  ))}
                  {'limit' in plan && plan.limit && (
                    <li className="flex items-start gap-3 pt-3 border-t border-dark-800/60">
                      <span className="text-dark-700 text-xs mt-0.5">—</span>
                      <span className="text-dark-600 text-sm">{plan.limit}</span>
                    </li>
                  )}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Trust footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-dark-600 text-sm">
            Paiement sécurisé par Stripe · Sans engagement · Remboursement 30 jours
          </p>
        </motion.div>

        {/* Multi-site note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-3 text-sm text-dark-400 bg-dark-900/40 border border-dark-800 rounded-2xl p-5 max-w-lg mx-auto"
        >
          <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
          <span>
            Plusieurs établissements ou franchise ?{' '}
            <a href="mailto:juanrobin09@gmail.com" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
              Contactez-nous
            </a>
            {' '}pour une offre personnalisée.
          </span>
        </motion.div>
      </div>
    </section>
  )
}
