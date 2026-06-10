'use client'

import { motion } from 'framer-motion'
import { Award, Zap, Star, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getLevel } from '@/lib/score'

interface GamificationProps {
  xpPoints: number
  badges?: Array<{
    slug: string
    name: string
    icon: string
    color: string
    earnedAt: string
  }>
}

const levelColors: Record<number, string> = {
  1: 'from-gray-500 to-gray-400',
  2: 'from-green-500 to-green-400',
  3: 'from-blue-500 to-blue-400',
  4: 'from-purple-500 to-purple-400',
  5: 'from-yellow-500 to-yellow-400',
  6: 'from-orange-500 to-orange-400',
  7: 'from-primary-500 to-accent-400',
}

export function Gamification({ xpPoints, badges = [] }: GamificationProps) {
  const levelInfo = getLevel(xpPoints)

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Progression</h3>
            <p className="text-dark-400 text-sm">Niveaux & Badges</p>
          </div>
        </div>

        {/* Level */}
        <div className="bg-dark-800/50 rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${levelColors[levelInfo.level]} flex items-center justify-center`}>
                <span className="text-white text-xs font-bold">{levelInfo.level}</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Niveau {levelInfo.level}</p>
                <p className="text-dark-400 text-xs">{levelInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              <Zap className="w-4 h-4" />
              <span className="font-bold text-sm">{xpPoints} XP</span>
            </div>
          </div>

          <Progress
            value={levelInfo.progress}
            barClassName={`bg-gradient-to-r ${levelColors[levelInfo.level]}`}
            size="sm"
          />
          <p className="text-dark-500 text-xs mt-2 text-right">
            {levelInfo.nextXp - xpPoints} XP pour le niveau suivant
          </p>
        </div>

        {/* Badges */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-dark-300 text-sm font-medium">Badges obtenus</p>
            <span className="text-dark-500 text-xs">{badges.length} badge{badges.length > 1 ? 's' : ''}</span>
          </div>

          {badges.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {badges.slice(0, 8).map((badge, i) => (
                <motion.div
                  key={badge.slug}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center gap-1 group"
                  title={badge.name}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-dark-700 bg-dark-800/50 group-hover:scale-110 transition-transform"
                    style={{ borderColor: badge.color + '30', backgroundColor: badge.color + '10' }}
                  >
                    {badge.icon}
                  </div>
                  <span className="text-dark-500 text-xs text-center leading-tight">{badge.name}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-xl bg-dark-800 border border-dark-700 border-dashed flex items-center justify-center">
                      <Star className="w-5 h-5 text-dark-700" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-dark-500 text-xs">Complétez des missions pour débloquer des badges</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
