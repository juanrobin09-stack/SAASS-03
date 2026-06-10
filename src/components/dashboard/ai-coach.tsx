'use client'

import { motion } from 'framer-motion'
import { Brain, ArrowRight, Sparkles, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface AICoachProps {
  message: string
  priorityAction: string
  score: number
  delta: number
  businessName: string
}

export function AICoach({ message, priorityAction, score, delta, businessName }: AICoachProps) {
  return (
    <Card glow>
      <CardContent>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-glow">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold">Coach IA</h3>
              <span className="inline-flex items-center gap-1 bg-primary-500/10 border border-primary-500/20 rounded-full px-2 py-0.5 text-xs text-primary-400">
                <Sparkles className="w-3 h-3" />
                IA
              </span>
            </div>
            <p className="text-dark-400 text-sm">Analyse personnalisée pour {businessName}</p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-dark-800/50">
          {delta > 0 ? (
            <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0" />
          ) : delta < 0 ? (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          ) : (
            <TrendingUp className="w-5 h-5 text-primary-400 flex-shrink-0" />
          )}
          <div>
            <p className="text-white font-medium text-sm">Score actuel : {score}/100</p>
            {delta !== 0 && (
              <p className={`text-xs ${delta > 0 ? 'text-accent-400' : 'text-red-400'}`}>
                {delta > 0 ? '+' : ''}{delta} points cette semaine
              </p>
            )}
          </div>
        </div>

        {/* Coach message */}
        <div className="mb-5">
          <p className="text-dark-300 text-sm leading-relaxed">{message}</p>
        </div>

        {/* Priority action */}
        <div className="bg-gradient-to-r from-primary-600/10 to-accent-500/10 border border-primary-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-xs text-primary-400 font-semibold mb-1 uppercase tracking-wide">Action prioritaire</p>
              <p className="text-white font-medium text-sm">{priorityAction}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-dark-500 text-xs">Mis à jour automatiquement chaque semaine</p>
          <Button variant="ghost" size="sm" className="text-primary-400 hover:text-primary-300">
            Voir toutes les recommandations
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
