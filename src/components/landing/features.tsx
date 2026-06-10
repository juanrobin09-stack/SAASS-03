'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Target, Bell, Award, FileText, Brain, BarChart3, Zap } from 'lucide-react'

const features = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Score Local IA',
    description: 'Un score de 0 à 100 calculé par IA qui mesure votre visibilité locale réelle en temps réel.',
    color: 'from-primary-500 to-primary-600',
    glow: 'shadow-glow',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Suivi Hebdomadaire',
    description: 'Suivez votre progression semaine après semaine. Chaque action améliore votre score.',
    color: 'from-accent-500 to-accent-600',
    glow: 'shadow-glow-accent',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Coach IA Personnalisé',
    description: 'Votre coach IA analyse votre situation et vous dit exactement quelle action prioriser.',
    color: 'from-purple-500 to-purple-600',
    glow: '',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Analyse Concurrentielle',
    description: "Comparez-vous à vos concurrents locaux. Voyez leur score et comblez l'écart.",
    color: 'from-orange-500 to-orange-600',
    glow: '',
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Alertes Intelligentes',
    description: 'Soyez alerté quand votre concurrent progresse ou quand un gain rapide est disponible.',
    color: 'from-pink-500 to-pink-600',
    glow: '',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Gamification',
    description: 'Niveaux, badges, défis hebdomadaires. Votre produit SaaS le plus addictif.',
    color: 'from-yellow-500 to-yellow-600',
    glow: '',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Rapport PDF Premium',
    description: 'Exportez un rapport magnifique partageable avec vos associés ou votre agence.',
    color: 'from-cyan-500 to-cyan-600',
    glow: '',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Missions de la Semaine',
    description: "5 actions précises chaque semaine. Complétez-les et regardez votre score grimper.",
    color: 'from-emerald-500 to-emerald-600',
    glow: '',
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="fonctionnalites" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-primary-300 font-medium">Tout ce dont vous avez besoin</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Un arsenal complet pour
            <br />
            <span className="text-primary-400">dominer localement</span>
          </h2>
          <p className="text-xl text-dark-400 max-w-2xl mx-auto">
            Pas un simple audit. Un logiciel qui crée une amélioration continue et vous rend dépendant de vos propres progrès.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-dark-900/50 border border-dark-800 hover:border-dark-700 rounded-2xl p-6 transition-all duration-300 hover:bg-dark-900/80"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
