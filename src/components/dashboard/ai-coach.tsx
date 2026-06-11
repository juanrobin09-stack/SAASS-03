'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, ArrowRight, Sparkles, TrendingUp, AlertCircle, CheckCircle,
  BarChart3, Star, Camera, MapPin, Target, FileText, Zap, Calendar, Rocket,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { CoachReport, CoachSection } from '@/types'

interface AICoachProps {
  message: string
  priorityAction: string
  coachReport?: CoachReport | null
  score: number
  delta: number
  businessName: string
}

const SECTION_ICONS: Record<string, React.ElementType> = {
  diagnostic: BarChart3,
  reviews: Star,
  photos: Camera,
  profile: MapPin,
  competitor: Target,
  content: FileText,
  weekly: Zap,
  monthly: Calendar,
  growth: Rocket,
}

const PRIORITY_CONFIG = {
  critical: { label: 'Critique', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', dot: 'bg-red-400' },
  high: { label: 'Priorité haute', bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', dot: 'bg-orange-400' },
  medium: { label: 'Priorité moyenne', bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', dot: 'bg-yellow-400' },
  low: { label: 'Suivi', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', dot: 'bg-blue-400' },
}

function SectionContent({ section }: { section: CoachSection }) {
  const cfg = PRIORITY_CONFIG[section.priority] ?? PRIORITY_CONFIG.medium

  return (
    <motion.div
      key={section.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="pt-4"
    >
      {/* Priority + insight row */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
        {section.insight && (
          <span className="text-xs text-dark-400 bg-dark-800 px-2.5 py-1 rounded-full border border-dark-700">
            {section.insight}
          </span>
        )}
      </div>

      {/* Content */}
      <p className="text-dark-300 text-sm leading-relaxed mb-4">{section.content}</p>

      {/* Actions */}
      {section.actions && section.actions.length > 0 && (
        <div className="space-y-2">
          {section.actions.map((action, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-md bg-primary-600/20 border border-primary-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-400 text-[10px] font-bold">{i + 1}</span>
              </div>
              <p className="text-dark-300 text-sm leading-snug">{action}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function RichCoach({ report, score, delta, businessName }: {
  report: CoachReport
  score: number
  delta: number
  businessName: string
}) {
  const [activeId, setActiveId] = useState(report.sections[0]?.id ?? 'diagnostic')
  const activeSection = report.sections.find(s => s.id === activeId) ?? report.sections[0]

  return (
    <Card glow>
      <CardContent>
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-glow flex-shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white font-semibold">Expert Marketing IA</h3>
              <span className="inline-flex items-center gap-1 bg-primary-500/10 border border-primary-500/20 rounded-full px-2 py-0.5 text-xs text-primary-400 flex-shrink-0">
                <Sparkles className="w-3 h-3" />
                9 sections
              </span>
            </div>
            <p className="text-dark-400 text-sm truncate">Analyse premium pour {businessName}</p>
          </div>
        </div>

        {/* Score status bar */}
        <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-dark-800/50 border border-dark-700/50">
          {delta > 0 ? (
            <CheckCircle className="w-4 h-4 text-accent-400 flex-shrink-0" />
          ) : delta < 0 ? (
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          ) : (
            <TrendingUp className="w-4 h-4 text-primary-400 flex-shrink-0" />
          )}
          <p className="text-white text-sm font-medium">Score actuel : {score}/100</p>
          {delta !== 0 && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ml-auto flex-shrink-0 ${delta > 0 ? 'text-accent-400 bg-accent-500/10' : 'text-red-400 bg-red-500/10'}`}>
              {delta > 0 ? '+' : ''}{delta} pts
            </span>
          )}
        </div>

        {/* Summary */}
        <div className="mb-5 p-3.5 rounded-xl bg-gradient-to-r from-primary-600/8 to-accent-500/8 border border-primary-500/15">
          <p className="text-dark-200 text-sm leading-relaxed">{report.summary}</p>
        </div>

        {/* Section tab pills — horizontal scroll */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-1 scrollbar-hide -mx-1 px-1">
          {report.sections.map(section => {
            const Icon = SECTION_ICONS[section.id] ?? Brain
            const isActive = section.id === activeId
            const cfg = PRIORITY_CONFIG[section.priority] ?? PRIORITY_CONFIG.medium
            return (
              <button
                key={section.id}
                onClick={() => setActiveId(section.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 transition-all duration-200 border ${
                  isActive
                    ? 'bg-primary-600 text-white border-primary-500'
                    : 'bg-dark-800/60 text-dark-400 border-dark-700 hover:border-dark-600 hover:text-dark-300'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{section.title.split(' ')[0]}</span>
                {!isActive && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} opacity-80`} />}
              </button>
            )
          })}
        </div>

        {/* Active section label (mobile) */}
        <p className="text-dark-400 text-xs mb-1 sm:hidden font-medium">{activeSection?.title}</p>

        {/* Section content */}
        <div className="min-h-[160px]">
          <AnimatePresence mode="wait">
            {activeSection && <SectionContent key={activeSection.id} section={activeSection} />}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-dark-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-dark-500 text-xs">Mis à jour automatiquement chaque semaine</p>
          <Link href="/dashboard/rapport">
            <Button variant="ghost" size="sm" className="text-primary-400 hover:text-primary-300 w-full sm:w-auto">
              Voir le rapport complet
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function SimpleCoach({ message, priorityAction, score, delta, businessName }: {
  message: string
  priorityAction: string
  score: number
  delta: number
  businessName: string
}) {
  return (
    <Card glow>
      <CardContent>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-glow">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold">Expert Marketing IA</h3>
              <span className="inline-flex items-center gap-1 bg-primary-500/10 border border-primary-500/20 rounded-full px-2 py-0.5 text-xs text-primary-400">
                <Sparkles className="w-3 h-3" />
                IA
              </span>
            </div>
            <p className="text-dark-400 text-sm">Analyse personnalisée pour {businessName}</p>
          </div>
        </div>

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

        <div className="mb-5">
          <p className="text-dark-300 text-sm leading-relaxed">{message}</p>
        </div>

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

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-dark-500 text-xs">Mis à jour automatiquement chaque semaine</p>
          <Link href="/dashboard/rapport">
            <Button variant="ghost" size="sm" className="text-primary-400 hover:text-primary-300 w-full sm:w-auto">
              Voir le rapport complet
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export function AICoach({ message, priorityAction, coachReport, score, delta, businessName }: AICoachProps) {
  if (coachReport && coachReport.sections && coachReport.sections.length > 0) {
    return <RichCoach report={coachReport} score={score} delta={delta} businessName={businessName} />
  }
  return <SimpleCoach message={message} priorityAction={priorityAction} score={score} delta={delta} businessName={businessName} />
}
