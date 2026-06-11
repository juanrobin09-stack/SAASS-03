'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Target, Brain, BarChart3, Bell, Zap } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Score Local IA',
    description: 'Un score de 0 à 100 calculé depuis vos données Google réelles : avis, photos, fiche, réactivité. Transparent et explicable.',
    accent: 'from-primary-500/20 to-primary-600/5',
    border: 'border-primary-500/15 hover:border-primary-500/30',
    iconBg: 'bg-primary-600',
    stat: '0–100',
    statLabel: 'score précis',
  },
  {
    icon: BarChart3,
    title: 'Analyse Concurrentielle',
    description: "Identifiez automatiquement vos vrais concurrents locaux, mesurez leur score, et voyez exactement l'écart à combler.",
    accent: 'from-orange-500/15 to-orange-600/5',
    border: 'border-orange-500/15 hover:border-orange-500/30',
    iconBg: 'bg-orange-500',
    stat: '5 km',
    statLabel: 'rayon analysé',
  },
  {
    icon: Brain,
    title: 'Expert Marketing IA',
    description: 'Un rapport de consultant en 9 sections personnalisées chaque semaine : avis, photos, concurrent, plan 30 jours, potentiel de croissance.',
    accent: 'from-violet-500/15 to-violet-600/5',
    border: 'border-violet-500/15 hover:border-violet-500/30',
    iconBg: 'bg-violet-600',
    stat: '9',
    statLabel: 'sections premium',
  },
  {
    icon: Zap,
    title: 'Missions de la Semaine',
    description: '5 actions concrètes, priorisées par impact. Cochez-les et regardez votre score grimper en temps réel.',
    accent: 'from-accent-500/15 to-accent-600/5',
    border: 'border-accent-500/15 hover:border-accent-500/30',
    iconBg: 'bg-accent-600',
    stat: '+5',
    statLabel: 'pts / semaine moy.',
  },
  {
    icon: TrendingUp,
    title: 'Suivi Hebdomadaire',
    description: "Suivez l'évolution de votre score semaine après semaine. L'historique complet disponible en un clic.",
    accent: 'from-blue-500/15 to-blue-600/5',
    border: 'border-blue-500/15 hover:border-blue-500/30',
    iconBg: 'bg-blue-600',
    stat: '52',
    statLabel: "semaines d'historique",
  },
  {
    icon: Bell,
    title: 'Alertes Intelligentes',
    description: 'Recevez une alerte quand votre concurrent progresse ou quand une opportunité rapide est identifiée.',
    accent: 'from-pink-500/15 to-pink-600/5',
    border: 'border-pink-500/15 hover:border-pink-500/30',
    iconBg: 'bg-pink-600',
    stat: 'Temps',
    statLabel: 'réel',
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="fonctionnalites" className="py-20 sm:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-600/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Tout ce dont vous avez besoin
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Un système complet pour
            <br />
            <span className="text-primary-400">dominer localement</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-xl mx-auto leading-relaxed">
            Pas un simple audit. Un moteur d'amélioration continue qui transforme vos données Google en actions concrètes.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`group relative bg-gradient-to-br ${feature.accent} border ${feature.border} rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl ${feature.iconBg} flex items-center justify-center text-white shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-xl leading-none">{feature.stat}</p>
                    <p className="text-dark-500 text-[11px] mt-0.5">{feature.statLabel}</p>
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2.5 tracking-tight">{feature.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
