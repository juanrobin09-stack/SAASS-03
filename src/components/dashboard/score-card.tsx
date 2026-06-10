'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react'
import { getScoreColor, getScoreLabel } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface ScoreCardProps {
  score: number
  previousScore?: number
  competitorScore?: number
  competitorName?: string
  businessName: string
}

export function ScoreCard({ score, previousScore, competitorScore, competitorName, businessName }: ScoreCardProps) {
  const delta = previousScore ? score - previousScore : 0
  const competitorGap = competitorScore ? competitorScore - score : null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Main Score */}
      <div className="sm:col-span-1">
        <Card glow className="h-full">
          <CardContent className="flex flex-col items-center justify-center py-4 sm:py-8">
            <p className="text-dark-400 text-sm mb-3">Votre Score Local</p>

            {/* Circular progress */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="8" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - score / 100) }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="text-4xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {score}
                </motion.span>
                <span className="text-dark-400 text-xs">/100</span>
              </div>
            </div>

            <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
              {getScoreLabel(score)}
            </span>

            {delta !== 0 && (
              <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${delta > 0 ? 'text-accent-400' : 'text-red-400'}`}>
                {delta > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{delta > 0 ? '+' : ''}{delta} cette semaine</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Competitor Score */}
      <div>
        <Card className="h-full">
          <CardContent className="flex flex-col items-center justify-center py-4 sm:py-8">
            <p className="text-dark-400 text-sm mb-2">Concurrent Principal</p>
            <p className="text-dark-300 text-xs mb-4 font-medium">{competitorName || 'Meilleur concurrent'}</p>

            {competitorScore ? (
              <>
                <div className="relative w-28 h-28 mb-3">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="8" />
                    <motion.circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke={competitorGap! > 0 ? '#f97316' : '#10b981'}
                      strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - competitorScore / 100) }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{competitorScore}</span>
                    <span className="text-dark-400 text-xs">/100</span>
                  </div>
                </div>

                {competitorGap !== null && (
                  <div className={`flex items-center gap-1.5 text-sm font-medium ${competitorGap > 0 ? 'text-orange-400' : 'text-accent-400'}`}>
                    {competitorGap > 0 ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-orange-400" />
                        <span>{competitorGap} points d'écart</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-accent-400" />
                        <span>Vous êtes devant !</span>
                      </>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-dark-600">—</span>
                <p className="text-dark-500 text-xs mt-2 text-center">Aucun concurrent défini</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Objective */}
      <div>
        <Card className="h-full">
          <CardContent className="flex flex-col items-center justify-center py-4 sm:py-8">
            <p className="text-dark-400 text-sm mb-2">Objectif</p>
            <Target className="w-8 h-8 text-primary-400 mb-3" />

            <div className="text-center">
              {competitorScore && competitorGap! > 0 ? (
                <>
                  <p className="text-white font-bold text-2xl mb-1">{competitorScore}</p>
                  <p className="text-dark-400 text-xs mb-4">Score à atteindre</p>
                  <div className="w-full bg-dark-800 rounded-full h-2 mb-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-600 to-accent-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.round((score / competitorScore) * 100)}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-primary-400 text-xs font-medium">
                    {Math.round((score / competitorScore) * 100)}% de l'objectif atteint
                  </p>
                </>
              ) : (
                <>
                  <p className="text-white font-bold text-2xl mb-1">90</p>
                  <p className="text-dark-400 text-xs mb-4">Score excellence</p>
                  <div className="w-full bg-dark-800 rounded-full h-2 mb-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-600 to-accent-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.round((score / 90) * 100)}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-primary-400 text-xs font-medium">
                    {Math.round((score / 90) * 100)}% de l'objectif
                  </p>
                </>
              )}
            </div>

            {delta > 0 && (
              <div className="mt-4 flex items-center gap-1 text-xs text-accent-400">
                <TrendingUp className="w-3 h-3" />
                <span>En progression</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
