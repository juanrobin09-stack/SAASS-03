'use client'

import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TrendingUp, MapPin, RefreshCw } from 'lucide-react'
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
  const [showUpgradeSuccess, setShowUpgradeSuccess] = useState(false)

  useEffect(() => {
    if (searchParams.get('upgrade') === 'success') {
      setShowUpgradeSuccess(true)
      setTimeout(() => setShowUpgradeSuccess(false), 5000)
    }
  }, [searchParams])

  const now = new Date()
  const weekLabel = `Semaine ${getWeekNumber(now)} • ${now.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Upgrade success */}
      {showUpgradeSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 p-4 bg-accent-500/10 border border-accent-500/20 rounded-xl flex items-center gap-3"
        >
          <TrendingUp className="w-5 h-5 text-accent-400" />
          <p className="text-accent-300 font-medium">Plan mis à niveau avec succès ! Bienvenue sur le plan Pro.</p>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-primary-400" />
            <h1 className="text-2xl font-bold text-white">{business.name}</h1>
            <Badge variant="info" size="sm">{business.category}</Badge>
          </div>
          <p className="text-dark-400 text-sm">{business.city} • {weekLabel}</p>
        </div>

        <div className="flex items-center gap-2">
          {analysis.scoreDelta !== 0 && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
              analysis.scoreDelta > 0
                ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              <TrendingUp className="w-4 h-4" />
              {analysis.scoreDelta > 0 ? '+' : ''}{analysis.scoreDelta} cette semaine
            </div>
          )}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-dark-400 hover:text-white text-sm transition-all">
            <RefreshCw className="w-4 h-4" />
            Rafraîchir
          </button>
        </div>
      </div>

      {/* Score cards - top */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <ScoreCard
          score={analysis.score}
          previousScore={analysis.previousScore}
          competitorScore={competitor?.score}
          competitorName={competitor?.name}
          businessName={business.name}
        />
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <AICoach
              message={analysis.coachMessage}
              priorityAction={analysis.priorityAction}
              score={analysis.score}
              delta={analysis.scoreDelta}
              businessName={business.name}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <WeeklyMissions tasks={tasks} weekOf={weekLabel} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <ScoreHistoryChart data={scoreHistory} competitorName={competitor?.name} />
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <ScoreBreakdownCard breakdown={analysis.breakdown} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Gamification xpPoints={analysis.xpPoints} badges={badges} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Alerts alerts={alerts} />
          </motion.div>
        </div>
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
