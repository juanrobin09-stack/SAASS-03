'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, Cpu, BarChart3, TrendingUp } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: <Building2 className="w-6 h-6" />,
    title: 'Renseignez votre établissement',
    description: 'Nom, adresse, catégorie. C\'est tout. Le minimum pour démarrer l\'analyse.',
    detail: 'En moins de 30 secondes',
  },
  {
    step: '02',
    icon: <Cpu className="w-6 h-6" />,
    title: 'L\'IA scanne tout',
    description: 'Notre IA analyse votre fiche Google, trouve vos concurrents et calcule votre score de visibilité.',
    detail: 'Analyse complète en 60 secondes',
  },
  {
    step: '03',
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Votre tableau de bord',
    description: 'Score Local, analyse concurrentielle, faiblesses identifiées, missions de la semaine.',
    detail: 'Immédiatement exploitable',
  },
  {
    step: '04',
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Progressez chaque semaine',
    description: 'Suivez l\'évolution de votre score, battez vos concurrents, cumulez les badges.',
    detail: 'Rétention maximale',
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="comment-ca-marche" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-dark-950/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-accent-300 font-medium">Simple et puissant</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            De zéro à votre score
            <br />
            <span className="text-accent-400">en 60 secondes</span>
          </h2>
          <p className="text-xl text-dark-400 max-w-xl mx-auto">
            Le minimum de saisie, le maximum d'intelligence. Tout est automatique.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-dark-900 border border-dark-700 flex items-center justify-center text-primary-400 mb-6 group-hover:border-primary-500/50 transition-colors">
                  {step.icon}
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                </div>
                <div className="mb-1">
                  <span className="text-xs text-primary-500 font-mono font-bold">{step.step}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed mb-3">{step.description}</p>
                <span className="text-xs text-accent-400 font-medium bg-accent-500/10 px-2 py-1 rounded-full">
                  {step.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
