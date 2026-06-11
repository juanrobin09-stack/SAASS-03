'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Sparkles, BarChart3, Star, Camera, MapPin, Target, FileText, Zap, Calendar, Rocket, ArrowRight } from 'lucide-react'

const SECTIONS = [
  { icon: BarChart3, label: 'Diagnostic Express', color: 'text-primary-400', dot: 'bg-red-400', priority: 'Critique' },
  { icon: Star, label: 'Stratégie Avis Google', color: 'text-yellow-400', dot: 'bg-orange-400', priority: 'Priorité haute' },
  { icon: Camera, label: 'Présence Visuelle', color: 'text-blue-400', dot: 'bg-orange-400', priority: 'Priorité haute' },
  { icon: MapPin, label: 'Fiche Google Business', color: 'text-green-400', dot: 'bg-yellow-400', priority: 'Priorité moyenne' },
  { icon: Target, label: 'Analyse Concurrentielle', color: 'text-orange-400', dot: 'bg-orange-400', priority: 'Priorité haute' },
  { icon: FileText, label: 'Stratégie de Contenu', color: 'text-purple-400', dot: 'bg-yellow-400', priority: 'Priorité moyenne' },
  { icon: Zap, label: 'Actions Cette Semaine', color: 'text-accent-400', dot: 'bg-red-400', priority: 'Critique' },
  { icon: Calendar, label: 'Plan 30 Jours', color: 'text-indigo-400', dot: 'bg-yellow-400', priority: 'Priorité moyenne' },
  { icon: Rocket, label: 'Potentiel de Croissance', color: 'text-pink-400', dot: 'bg-blue-400', priority: 'Suivi' },
]

export function ExpertMarketing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-primary-950/10 to-dark-950" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-1.5 mb-6">
              <Brain className="w-4 h-4 text-primary-400" />
              <span className="text-primary-400 text-sm font-semibold">Expert Marketing IA</span>
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
              Votre consultant marketing,
              <br />
              <span className="text-primary-400">disponible 24h/24</span>
            </h2>

            <p className="text-dark-300 text-lg leading-relaxed mb-8">
              Chaque semaine, notre IA analyse en profondeur votre présence locale et génère un rapport de consultant premium en <strong className="text-white">9 sections personnalisées</strong> — le niveau d'une prestation à 500€/mois, inclus dans votre abonnement.
            </p>

            <div className="space-y-3 mb-8">
              {[
                'Analyse de vos avis Google et stratégie de réponse',
                'Plan de contenu hebdomadaire et mensuel',
                'Analyse concurrentielle avec actions pour combler l\'écart',
                'Top 3 actions à fort ROI pour cette semaine',
                'Roadmap 30 jours pour atteindre votre score cible',
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-accent-500/20 border border-accent-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                  </div>
                  <p className="text-dark-300 text-sm leading-snug">{point}</p>
                </motion.div>
              ))}
            </div>

            <a
              href="/register"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-glow hover:shadow-glow-lg"
            >
              Obtenir mon rapport gratuit
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right — report mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-primary-600/10 rounded-3xl blur-2xl scale-95" />

            <div className="relative bg-dark-900 border border-dark-700 rounded-2xl p-5 shadow-2xl">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-dark-800">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                  <Brain className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm">Expert Marketing IA</span>
                    <span className="inline-flex items-center gap-1 bg-primary-500/10 border border-primary-500/20 rounded-full px-2 py-0.5 text-[10px] text-primary-400">
                      <Sparkles className="w-2.5 h-2.5" />
                      9 sections
                    </span>
                  </div>
                  <p className="text-dark-500 text-xs">Rapport personnel · Mis à jour chaque semaine</p>
                </div>
              </div>

              {/* Score summary */}
              <div className="flex items-center gap-3 mb-4 p-2.5 rounded-lg bg-dark-800/60 border border-dark-700">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600/20 to-accent-500/20 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">71</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-xs font-semibold">Score actuel : 71/100</p>
                  <p className="text-accent-400 text-[10px]">+3 points cette semaine</p>
                </div>
              </div>

              {/* Sections list */}
              <div className="space-y-1.5">
                {SECTIONS.map((section, i) => {
                  const Icon = section.icon
                  return (
                    <motion.div
                      key={section.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                      className={`flex items-center gap-2.5 p-2 rounded-lg transition-colors ${i === 0 ? 'bg-primary-600/15 border border-primary-500/20' : 'hover:bg-dark-800/50'}`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${section.color} flex-shrink-0`} />
                      <span className={`text-xs flex-1 ${i === 0 ? 'text-white font-medium' : 'text-dark-400'}`}>
                        {section.label}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-dark-500">
                        <span className={`w-1.5 h-1.5 rounded-full ${section.dot}`} />
                        {section.priority}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer badge */}
              <div className="mt-4 pt-3 border-t border-dark-800 flex items-center justify-between">
                <p className="text-dark-600 text-[10px]">Généré par IA · Claude</p>
                <span className="text-[10px] text-primary-400 font-medium">Rapport hebdomadaire ✓</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
