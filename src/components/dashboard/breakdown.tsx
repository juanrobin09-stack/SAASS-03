'use client'

import { motion } from 'framer-motion'
import { Star, Camera, FileText, Globe, MessageSquare, BarChart3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { ScoreBreakdown } from '@/types'

const breakdownItems = [
  { key: 'reviews' as const, label: 'Avis & Note', max: 30, icon: <Star className="w-4 h-4" />, color: 'from-yellow-500 to-yellow-400' },
  { key: 'photos' as const, label: 'Photos', max: 20, icon: <Camera className="w-4 h-4" />, color: 'from-blue-500 to-blue-400' },
  { key: 'googleProfile' as const, label: 'Fiche Google', max: 15, icon: <BarChart3 className="w-4 h-4" />, color: 'from-primary-500 to-primary-400' },
  { key: 'posts' as const, label: 'Publications', max: 10, icon: <FileText className="w-4 h-4" />, color: 'from-purple-500 to-purple-400' },
  { key: 'engagement' as const, label: 'Engagement', max: 15, icon: <MessageSquare className="w-4 h-4" />, color: 'from-pink-500 to-pink-400' },
  { key: 'website' as const, label: 'Site Web', max: 10, icon: <Globe className="w-4 h-4" />, color: 'from-cyan-500 to-cyan-400' },
]

interface BreakdownProps {
  breakdown: ScoreBreakdown
}

export function ScoreBreakdownCard({ breakdown }: BreakdownProps) {
  return (
    <Card>
      <CardContent>
        <h3 className="text-white font-semibold text-lg mb-5">Détail du Score</h3>

        <div className="space-y-4">
          {breakdownItems.map((item, i) => {
            const value = breakdown[item.key]
            const percentage = Math.round((value / item.max) * 100)

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}>
                    {item.icon}
                  </div>
                  <span className="text-dark-300 text-sm flex-1">{item.label}</span>
                  <div className="flex items-baseline gap-0.5">
                    <span className={`font-bold text-sm ${percentage >= 80 ? 'text-accent-400' : percentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {value}
                    </span>
                    <span className="text-dark-500 text-xs">/{item.max}</span>
                  </div>
                </div>
                <Progress
                  value={value}
                  max={item.max}
                  barClassName={`bg-gradient-to-r ${item.color}`}
                  size="sm"
                />
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
