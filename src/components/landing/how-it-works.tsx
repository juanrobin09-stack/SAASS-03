'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, ScanLine, LayoutDashboard, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Building2,
    title: 'Renseignez votre établissement',
    description: 'Nom, ville, catégorie. C\'est tout. Notre moteur fait le reste en accédant directement aux données Google.',
    time: '< 30 secondes',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/20',
  },
  {
    number: '02',
    icon: ScanLine,
    title: 'L\'IA scanne votre fiche',
    description: 'Avis, photos, horaires, site web, concurrents — tout est analysé automatiquement via l\'API Google Business.',
    time: '60 secondes',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    number: '03',
    icon: LayoutDashboard,
    title: 'Votre cockpit en temps réel',
    description: 'Score précis, écart avec vos concurrents, faiblesses identifiées, coach IA, missions de la semaine.',
    time: 'Immédiat',
    color: 'text-accent-400',
    bg: 'bg-accent-500/10',
    border: 'border-accent-500/20',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Progressez chaque semaine',
    description: 'Complétez vos missions, regardez votre score monter, battez vos concurrents. L\'amélioration devient addictive.',
    time: 'Continu',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="comment-ca-marche" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-dark-900/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Simple et puissant
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            De zéro à votre score
            <br />
            <span className="text-accent-400">en 60 secondes</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-lg mx-auto">
            Le minimum de saisie, le maximum d'intelligence. Tout est automatique.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="absolute top-10 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px hidden lg:block overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 28 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step indicator */}
                  <div className="relative mb-7">
                    <div className={`w-20 h-20 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${step.color}`} />
                    </div>
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-dark-950 border ${step.border} flex items-center justify-center`}>
                      <span className={`text-xs font-black ${step.color}`}>{i + 1}</span>
                    </div>
                  </div>

                  <p className="text-dark-600 font-mono text-xs font-bold tracking-[0.15em] mb-2">{step.number}</p>
                  <h3 className="text-white font-bold text-lg mb-3 leading-tight">{step.title}</h3>
                  <p className="text-dark-400 text-sm leading-relaxed mb-4">{step.description}</p>
                  <span className={`inline-flex items-center text-xs font-semibold ${step.color} ${step.bg} border ${step.border} px-3 py-1.5 rounded-full`}>
                    {step.time}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
