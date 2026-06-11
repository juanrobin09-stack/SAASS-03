'use client'

import { motion } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TrendingUp, MapPin, RefreshCw, AlertCircle } from 'lucide-react'
import { ScoreCard } from '@/components/dashboard/score-card'
import { WeeklyMissions } from '@/components/dashboard/weekly-missions'
import { AICoach } from '@/components/dashboard/ai-coach'
import { ScoreHistoryChart } from '@/components/dashboard/score-history'
import { Alerts } from '@/components/dashboard/alerts'
import { Gamification } from '@/components/dashboard/gamification'
import { ScoreBreakdownCard } from '@/components/dashboard/breakdown'
import { Badge } from '@/components/ui/badge'
import type { ScoreBreakdown, WeekTask, AlertItem, ScoreHistory } from '@/types'

interface DashboardClientProps {
  business: { id: string; name: string; city: string; category: string }
  analysis: {
    score: number
    previousScore?: number
    scoreDelta: number
    breakdown: ScoreBreakdown
    coachMessage: string
    priorityAction: string
    xpPoints: number
  }
  competitor: { name: string; score: number; scoreDiff: number } | null
  tasks: WeekTask[]
  alerts: AlertItem[]
  scoreHistory: ScoreHistory[]
  badges: Array<{ slug: string; name: string; icon: string; color: string; earnedAt: string }>
}

export function DashboardClient({
  business, analysis, competitor, tasks, alerts, scoreHistory, badges
}: DashboardClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showUpgradeSuccess, setShowUpgradeSuccess] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [rescanError, setRescanError] = useState<string | null>(null)
  const [needsUpgrade, setNeedsUpgrade] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    setRescanError(null)
    setNeedsUpgrade(false)
    try {
      const res = await fetch('/api/rescan', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        router.refresh()
        setTimeout(() => setRefreshing(false), 1200)
      } else {
        if (data.upgrade) setNeedsUpgrade(true)
        else setRescanError(data.error ?? 'Analyse impossible. Réessayez.')
        setRefreshing(false)
      }
    } catch {
      setRescanError('Connexion impossible. Réessayez.')
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (searchParams.get('upgrade') === 'success') {
      setShowUpgradeSuccess(true)
      // Webhook may not have fired yet — refresh server data after 3s then again at 7s
      const t1 = setTimeout(() => router.refresh(), 3000)
      const t2 = setTimeout(() => router.refresh(), 7000)
      const t3 = setTimeout(() => setShowUpgradeSuccess(false), 10000)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
  }, [searchParams, router])

  const now = new Date()
  const weekLabel = `Semaine ${getWeekNumber(now)} • ${now.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Upgrade success */}
      {showUpgradeSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-4 sm:mb-6 p-4 bg-accent-500/10 border border-accent-500/20 rounded-xl flex items-center gap-3"
        >
          <TrendingUp className="w-5 h-5 text-accent-400 shrink-0" />
          <p className="text-accent-300 font-medium text-sm sm:text-base">Paiement reçu — activation du plan Pro en cours...</p>
        </motion.div>
      )}

      {/* Re-scan feedback */}
      {(rescanError || needsUpgrade) && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          {needsUpgrade ? (
            <p className="text-red-300 text-sm flex-1">
              Le re-scan à la demande est réservé au plan Pro.{' '}
              <Link href="/dashboard/parametres" className="underline font-semibold text-white">Passer au Pro</Link>
            </p>
          ) : (
            <p className="text-red-300 text-sm flex-1">{rescanError}</p>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <MapPin className="w-4 h-4 text-primary-400 shrink-0" />
            <h1 className="text-xl sm:text-2xl font-bold text-white truncate">{business.name}</h1>
            <Badge variant="info" size="sm" className="shrink-0">{business.category}</Badge>
          </div>
          <p className="text-dark-400 text-sm">{business.city} • {weekLabel}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {analysis.scoreDelta !== 0 && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
              analysis.scoreDelta > 0
                ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              <TrendingUp className="w-4 h-4" />
              <span>{analysis.scoreDelta > 0 ? '+' : ''}{analysis.scoreDelta}</span>
            </div>
          )}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 px-4 py-2 min-h-[40px] bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-dark-300 hover:text-white text-sm font-medium transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 shrink-0 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Analyse en cours…' : 'Nouvelle analyse'}</span>
          </button>
        </div>
      </div>

      {/* Score cards - top */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 sm:mb-6">
        <ScoreCard
          score={analysis.score}
          previousScore={analysis.previousScore}
          competitorScore={competitor?.score}
          competitorName={competitor?.name}
          businessName={business.name}
        />
      </motion.div>

      {/*
        Main grid. Mobile = single column, ordered by usefulness:
        Coach → Missions → Alerts → Breakdown → Gamification → History.
        Desktop = 2/1 columns filling cleanly (span2 + span1 per row).
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="order-1 lg:order-1 lg:col-span-2"
        >
          <AICoach
            message={analysis.coachMessage}
            priorityAction={analysis.priorityAction}
            score={analysis.score}
            delta={analysis.scoreDelta}
            businessName={business.name}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="order-2 lg:order-3 lg:col-span-2"
        >
          <WeeklyMissions tasks={tasks} weekOf={weekLabel} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="order-3 lg:order-2 lg:col-span-1"
        >
          <Alerts alerts={alerts} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="order-4 lg:order-4 lg:col-span-1"
        >
          <ScoreBreakdownCard breakdown={analysis.breakdown} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="order-5 lg:order-6 lg:col-span-1"
        >
          <Gamification xpPoints={analysis.xpPoints} badges={badges} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="order-6 lg:order-5 lg:col-span-2"
        >
          <ScoreHistoryChart data={scoreHistory} competitorName={competitor?.name} />
        </motion.div>
      </div>
    </div>
  )
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}
