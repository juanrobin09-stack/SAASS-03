'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, TrendingUp, Star, CheckCircle2, Play } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 sm:pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      {/* Glow orbs — hidden on small screens to keep perf */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-primary-600/8 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="hidden sm:block absolute top-2/3 right-1/4 w-[400px] h-[400px] bg-accent-500/6 rounded-full blur-[80px] pointer-events-none" />
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-dark-900/80 border border-dark-700 backdrop-blur-sm rounded-full px-3 py-1.5 mb-6 sm:mb-8 max-w-full"
          >
            <span className="flex w-2 h-2 rounded-full bg-accent-400 animate-pulse shrink-0" />
            <span className="text-xs sm:text-sm text-dark-300 font-medium truncate">Google Business API & Claude AI</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[72px] font-black text-white leading-[1.05] tracking-tight mb-5 max-w-4xl"
          >
            Pourquoi votre concurrent
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-violet-400 to-accent-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              attire plus de clients
            </span>
            <br />
            que vous ?
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-dark-400 max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
          >
            LocalScore.ai scanne votre fiche Google, identifie vos concurrents et vous donne{' '}
            <span className="text-white font-medium">exactement quoi faire</span>{' '}
            chaque semaine pour les dépasser.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto mb-8 sm:mb-12"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="xl" className="group shadow-glow shadow-primary-500/20 text-base px-8 w-full sm:w-auto">
                Analyser mon établissement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Link href="#demo" className="w-full sm:w-auto">
              <Button variant="ghost" size="xl" className="text-dark-300 hover:text-white text-base px-8 w-full sm:w-auto">
                <Play className="w-4 h-4 shrink-0" />
                Voir la démo
              </Button>
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-dark-500 text-sm mb-14 sm:mb-20"
          >
            {[
              { icon: <Shield className="w-3.5 h-3.5" />, text: 'Sans carte bancaire' },
              { icon: <TrendingUp className="w-3.5 h-3.5" />, text: 'Résultats en 60 s' },
              { icon: <Star className="w-3.5 h-3.5" />, text: 'Annulable à tout moment' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <span className="text-accent-400/70">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            id="demo"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl relative scroll-mt-24"
          >
            {/* Glow behind preview */}
            <div className="absolute -inset-x-4 sm:-inset-x-8 top-8 bottom-0 bg-primary-600/10 rounded-3xl blur-3xl pointer-events-none" />

            {/* Browser chrome */}
            <div className="relative bg-dark-900 border border-dark-700/80 rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 sm:py-3 bg-dark-800/80 border-b border-dark-700/60">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-dark-600" />
                  <div className="w-3 h-3 rounded-full bg-dark-600" />
                  <div className="w-3 h-3 rounded-full bg-dark-600" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-dark-700/60 rounded-md px-4 py-1 text-xs text-dark-400 flex items-center gap-1.5 max-w-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse shrink-0" />
                    <span className="truncate">app.localscore.ai/dashboard</span>
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <DashboardPreview />
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function DashboardPreview() {
  // Animated score count-up so the dashboard feels "alive" (AI working in real time)
  const [score, setScore] = useState(58)
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const from = 58
    const to = 71
    const duration = 1400
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setScore(Math.round(from + (to - from) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    const delay = setTimeout(() => { raf = requestAnimationFrame(tick) }, 700)
    return () => { clearTimeout(delay); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="bg-dark-950 p-4 sm:p-7 space-y-4 sm:space-y-5">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-accent-400 shrink-0 animate-pulse" />
            <p className="text-dark-400 text-xs font-medium truncate">Boulangerie Artisanale — Lyon 6e</p>
          </div>
          <p className="text-white font-bold text-base sm:text-lg tracking-tight">Tableau de bord</p>
        </div>
        <div className="flex items-center gap-1.5 bg-accent-500/10 border border-accent-500/20 rounded-full px-2.5 py-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse shrink-0" />
          <span className="text-accent-400 text-xs font-semibold">Analyse en direct</span>
        </div>
      </div>

      {/* Score grid — 2 cols on mobile, 3 on sm+ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {/* Main score */}
        <div className="bg-gradient-to-br from-primary-600/15 to-accent-500/5 border border-primary-500/20 rounded-xl p-3 sm:p-4">
          <p className="text-dark-400 text-[10px] sm:text-xs mb-1.5 sm:mb-2 font-medium">Score Local IA</p>
          <div className="flex items-end gap-1">
            <p className="text-4xl sm:text-5xl font-black text-white leading-none tabular-nums">{score}</p>
            <p className="text-dark-500 text-xs sm:text-sm mb-0.5">/100</p>
          </div>
          <div className="mt-2 sm:mt-3 h-1.5 bg-dark-800 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-400 transition-[width] duration-700 ease-out" style={{ width: `${score}%` }} />
          </div>
        </div>

        {/* Competitor */}
        <div className="bg-dark-900/60 border border-dark-700 rounded-xl p-3 sm:p-4">
          <p className="text-dark-400 text-[10px] sm:text-xs mb-1.5 sm:mb-2 font-medium">Concurrent #1</p>
          <div className="flex items-end gap-1">
            <p className="text-3xl sm:text-4xl font-black text-white leading-none">79</p>
            <p className="text-dark-500 text-xs sm:text-sm mb-0.5">/100</p>
          </div>
          <div className="flex items-center gap-1 mt-2 sm:mt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <p className="text-orange-400 text-[10px] sm:text-xs font-medium">8 pts d'écart</p>
          </div>
        </div>

        {/* Objective — hidden on mobile to keep it clean */}
        <div className="hidden sm:block bg-dark-900/60 border border-dark-700 rounded-xl p-4">
          <p className="text-dark-400 text-xs mb-2 font-medium">Objectif</p>
          <p className="text-4xl font-black text-white leading-none">80</p>
          <p className="text-accent-400 text-xs mt-3 font-medium">88% atteint</p>
        </div>
      </div>

      {/* Score breakdown — hidden on mobile */}
      <div className="hidden sm:grid grid-cols-3 lg:grid-cols-6 gap-2">
        {[
          { label: 'Avis', val: 22, max: 30, color: 'bg-primary-500' },
          { label: 'Photos', val: 14, max: 20, color: 'bg-violet-500' },
          { label: 'Fiche', val: 10, max: 15, color: 'bg-accent-500' },
          { label: 'Posts', val: 5, max: 10, color: 'bg-blue-500' },
          { label: 'Réponses', val: 12, max: 15, color: 'bg-emerald-500' },
          { label: 'Site web', val: 8, max: 10, color: 'bg-teal-500' },
        ].map((item) => (
          <div key={item.label} className="bg-dark-900/40 rounded-lg p-2.5 text-center">
            <p className="text-dark-500 text-[10px] font-medium mb-1.5">{item.label}</p>
            <p className="text-white text-sm font-bold">{item.val}</p>
            <p className="text-dark-600 text-[10px]">/{item.max}</p>
            <div className="mt-1.5 h-1 bg-dark-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.val / item.max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Coach message */}
      <div className="bg-gradient-to-r from-primary-600/8 to-accent-500/5 border border-primary-500/15 rounded-xl p-3 sm:p-4">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shrink-0 mt-0.5">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-primary-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1">Coach IA</p>
            <p className="text-dark-300 text-xs leading-relaxed">Vous êtes à <span className="text-white font-medium">8 points</span> du meilleur de votre secteur. Répondre à 5 avis peut vous faire gagner <span className="text-white font-medium">+4 pts</span> cette semaine.</p>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div>
        <p className="text-white font-semibold text-sm mb-2.5">Missions de la semaine</p>
        <div className="space-y-1.5 sm:space-y-2">
          {[
            { done: true, text: 'Répondre à 5 avis clients', pts: '+4 pts' },
            { done: true, text: 'Ajouter 3 photos de la boutique', pts: '+3 pts' },
            { done: false, text: 'Publier une actualité Google', pts: '+2 pts' },
            { done: false, text: 'Mettre à jour les horaires', pts: '+1 pt' },
          ].map((task, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2 sm:py-2.5 bg-dark-900/40">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                  task.done ? 'bg-accent-500' : 'border border-dark-600'
                }`}>
                  {task.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-xs truncate ${task.done ? 'text-dark-500 line-through' : 'text-dark-200'}`}>
                  {task.text}
                </span>
              </div>
              <span className={`text-xs font-semibold shrink-0 ml-2 ${task.done ? 'text-dark-600' : 'text-accent-400'}`}>
                {task.pts}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
