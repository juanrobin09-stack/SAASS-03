'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Gratuit',
    price: 0,
    description: 'Découvrez votre score',
    features: [
      '1 analyse complète',
      'Score Local IA',
      'Comparaison concurrentielle',
      'Rapport PDF basique',
    ],
    limitations: [
      'Pas de suivi hebdomadaire',
      'Pas d\'historique',
    ],
    cta: 'Commencer gratuitement',
    href: '/register',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 19,
    description: 'Pour progresser chaque semaine',
    features: [
      '1 établissement suivi',
      'Score vivant mis à jour',
      'Suivi hebdomadaire automatique',
      'Historique complet',
      'Export PDF premium',
      'Coach IA personnalisé',
      'Alertes intelligentes',
      'Missions de la semaine',
      'Gamification & badges',
    ],
    cta: 'Démarrer l\'essai Pro',
    href: '/register?plan=pro',
    highlighted: true,
    badge: 'Le plus populaire',
  },
  {
    name: 'Business',
    price: 39,
    description: 'Multi-établissements',
    features: [
      'Jusqu\'à 5 établissements',
      'Toutes les fonctionnalités Pro',
      'Comparaisons multiples',
      'Exports avancés',
      'Rapports automatiques',
      'Support prioritaire',
      'Accès API',
    ],
    cta: 'Démarrer Business',
    href: '/register?plan=business',
    highlighted: false,
  },
]

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="tarifs" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-primary-300 font-medium">Tarifs simples et transparents</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Commencez gratuitement,
            <br />
            <span className="text-primary-400">évoluez à votre rythme</span>
          </h2>
          <p className="text-xl text-dark-400">Sans engagement. Annulable à tout moment.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-primary-600/20 to-dark-900/80 border-2 border-primary-500/50 shadow-glow'
                  : 'bg-dark-900/50 border border-dark-800'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-glow">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-dark-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price === 0 ? 'Gratuit' : `${plan.price}€`}</span>
                  {plan.price > 0 && <span className="text-dark-400 text-sm">/mois</span>}
                </div>
              </div>

              <Link href={plan.href}>
                <Button
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  className="w-full mb-6"
                  size="lg"
                >
                  {plan.highlighted && <Zap className="w-4 h-4" />}
                  {plan.cta}
                </Button>
              </Link>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent-400" />
                    </div>
                    <span className="text-dark-300 text-sm">{feature}</span>
                  </li>
                ))}
                {plan.limitations?.map((limitation) => (
                  <li key={limitation} className="flex items-start gap-3 opacity-40">
                    <div className="w-5 h-5 rounded-full bg-dark-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-dark-400 text-xs">—</span>
                    </div>
                    <span className="text-dark-500 text-sm line-through">{limitation}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center text-dark-500 text-sm mt-8"
        >
          Paiement sécurisé par Stripe • Sans engagement • Remboursement 30 jours
        </motion.p>
      </div>
    </section>
  )
}
