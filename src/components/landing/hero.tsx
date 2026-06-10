'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, Star, MapPin, Zap, ChevronUp } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-3xl" />
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
          <span className="text-sm text-primary-300 font-medium">Propulsé par l'IA • Résultats en 60 secondes</span>
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
          Découvrez votre Score Local IA, identifiez vos faiblesses et suivez votre progression chaque semaine pour dépasser vos concurrents.
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
          <a href="#comment-ca-marche">
            <Button variant="ghost" size="xl">
              Voir la démo
            </Button>
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-dark-400 text-sm mb-20"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 border-2 border-dark-950" />
              ))}
            </div>
            <span>+1 200 commerces analysés</span>
          </div>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            <span className="ml-1">4.9/5 satisfaction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-accent-400" />
            <span>Score moyen +23 points en 4 semaines</span>
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
          <p className="text-dark-400 text-sm">Restaurant Le Marché</p>
          <p className="text-white font-semibold">Tableau de bord • Semaine 12</p>
        </div>
        <div className="flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 rounded-full px-3 py-1.5">
          <ChevronUp className="w-3.5 h-3.5 text-accent-400" />
          <span className="text-accent-400 text-sm font-medium">+3 cette semaine</span>
        </div>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
          <p className="text-dark-400 text-xs mb-1">Votre Score</p>
          <p className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">74</p>
          <p className="text-dark-400 text-xs mt-1">/100</p>
        </div>
        <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
          <p className="text-dark-400 text-xs mb-1">Concurrent Principal</p>
          <p className="text-4xl font-bold text-white">82</p>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <p className="text-orange-400 text-xs">8 points d'écart</p>
          </div>
        </div>
        <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
          <p className="text-dark-400 text-xs mb-1">Objectif</p>
          <p className="text-4xl font-bold text-white">82</p>
          <p className="text-accent-400 text-xs mt-1">Dépasser le concurrent</p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-dark-400">Progression vers l'objectif</span>
          <span className="text-primary-400">74/82 points</span>
        </div>
        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-600 to-accent-500 rounded-full" style={{ width: '90%' }} />
        </div>
      </div>

      {/* Tasks preview */}
      <div>
        <p className="text-white font-medium mb-3">Missions de la semaine</p>
        <div className="space-y-2">
          {[
            { done: true, text: 'Répondre à 6 avis clients', points: '+3' },
            { done: true, text: 'Ajouter 4 nouvelles photos', points: '+2' },
            { done: false, text: 'Publier un post Google', points: '+2' },
            { done: false, text: 'Ajouter un nouveau service', points: '+1' },
          ].map((task, i) => (
            <div key={i} className="flex items-center justify-between bg-dark-800/30 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${task.done ? 'bg-accent-500 border-accent-500' : 'border-dark-600'}`}>
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
