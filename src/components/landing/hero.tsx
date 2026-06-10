'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronUp, Shield, Clock, Zap } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-8"
        >
          <Zap className="w-3.5 h-3.5 text-primary-400" />
          <span className="text-sm text-primary-300 font-medium">Score IA • Analyse en 60 secondes • Sans carte bancaire</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Pourquoi votre concurrent
          <br />
          <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            attire plus de clients
          </span>
          <br />
          que vous ?
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-dark-400 max-w-2xl mx-auto mb-10"
        >
          Locentra analyse votre visibilité locale, la compare à vos concurrents et vous donne
          exactement quoi faire chaque semaine pour les dépasser.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link href="/register">
            <Button size="xl" className="group">
              Analyser mon établissement gratuitement
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Trust signals — honest */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-dark-400 text-sm mb-20"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent-400" />
            <span>Sans carte bancaire</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-400" />
            <span>Premier score en 60 secondes</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent-400" />
            <span>Annulable à tout moment</span>
          </div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent z-10 pointer-events-none" style={{ top: '60%' }} />
          <div className="relative bg-dark-900/80 backdrop-blur-sm border border-dark-700 rounded-2xl p-1 shadow-2xl">
            <DashboardPreview />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DashboardPreview() {
  return (
    <div className="bg-dark-950 rounded-xl p-6 space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dark-400 text-sm">Boulangerie Artisanale — Lyon 6e</p>
          <p className="text-white font-semibold">Tableau de bord • Semaine 24</p>
        </div>
        <div className="flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 rounded-full px-3 py-1.5">
          <ChevronUp className="w-3.5 h-3.5 text-accent-400" />
          <span className="text-accent-400 text-sm font-medium">+5 cette semaine</span>
        </div>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
          <p className="text-dark-400 text-xs mb-1">Votre Score</p>
          <p className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">71</p>
          <p className="text-dark-400 text-xs mt-1">/100</p>
        </div>
        <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
          <p className="text-dark-400 text-xs mb-1">Concurrent principal</p>
          <p className="text-4xl font-bold text-white">79</p>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <p className="text-orange-400 text-xs">8 points d'écart</p>
          </div>
        </div>
        <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
          <p className="text-dark-400 text-xs mb-1">Objectif</p>
          <p className="text-4xl font-bold text-white">80</p>
          <p className="text-accent-400 text-xs mt-1">Dépasser le concurrent</p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-dark-400">Progression vers l'objectif</span>
          <span className="text-primary-400">71/80 points</span>
        </div>
        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-600 to-accent-500 rounded-full" style={{ width: '89%' }} />
        </div>
      </div>

      {/* Tasks preview */}
      <div>
        <p className="text-white font-medium mb-3">Missions de la semaine</p>
        <div className="space-y-2">
          {[
            { done: true, text: 'Répondre à 5 avis clients récents', points: '+3' },
            { done: true, text: 'Ajouter 3 photos de la boutique', points: '+2' },
            { done: false, text: 'Publier un post Google My Business', points: '+2' },
            { done: false, text: 'Mettre à jour les horaires de Noël', points: '+1' },
          ].map((task, i) => (
            <div key={i} className="flex items-center justify-between bg-dark-800/30 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${task.done ? 'bg-accent-500 border-accent-500' : 'border-dark-600'}`}>
                  {task.done && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`text-sm ${task.done ? 'text-dark-400 line-through' : 'text-dark-200'}`}>{task.text}</span>
              </div>
              <span className="text-xs text-accent-400 font-medium">{task.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
