'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Zap, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Gratuit',
    price: 0,
    description: 'Découvrez ce que vous perdez',
    icon: <Lock className="w-5 h-5" />,
    features: [
      '1 analyse complète',
      'Score Local IA (0–100)',
      'Comparaison avec 1 concurrent',
      'Détail du score en 6 dimensions',
      '5 missions de la semaine',
      'Rapport PDF basique',
    ],
    limits: 'Pas de suivi dans le temps',
    cta: 'Commencer gratuitement',
    href: '/register',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 19,
    description: 'Pour progresser semaine après semaine',
    icon: <Zap className="w-5 h-5" />,
    features: [
      '1 établissement suivi en continu',
      'Mise à jour automatique chaque semaine',
      'Historique complet de vos scores',
      'Coach IA personnalisé à votre situation',
      'Alertes : concurrent actif, gain rapide',
      'Missions renouvelées chaque semaine',
      'Gamification : niveaux, badges, XP',
      'Export PDF premium partageable',
      'Comparaison concurrentielle avancée',
    ],
    cta: 'Démarrer le Pro',
    href: '/register?plan=pro',
    highlighted: true,
    badge: 'Le plus populaire',
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-3xl mx-auto w-full">
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
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  plan.highlighted ? 'bg-primary-500/20 text-primary-400' : 'bg-dark-800 text-dark-400'
                }`}>
                  {plan.icon}
                </div>
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
                {plan.limits && (
                  <li className="flex items-start gap-3 pt-1 border-t border-dark-800 mt-2">
                    <span className="text-dark-600 text-xs mt-1">—</span>
                    <span className="text-dark-600 text-sm">{plan.limits}</span>
                  </li>
                )}
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
          Paiement sécurisé par Stripe · Sans engagement · Remboursement 30 jours
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-3 text-sm text-dark-400 border border-dark-800 rounded-2xl p-5 max-w-lg mx-auto"
        >
          <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
          <span>
            Vous gérez plusieurs établissements ou une franchise ?{' '}
            <a href="mailto:contact@locentra.space" className="text-primary-400 hover:underline font-medium">
              Contactez-nous
            </a>{' '}
            pour une offre personnalisée.
          </span>
        </motion.div>
      </div>
    </section>
  )
}
