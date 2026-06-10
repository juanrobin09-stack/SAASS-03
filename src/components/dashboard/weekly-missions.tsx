'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Star, MessageSquare, Camera, FileText, Globe, Info, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { WeekTask } from '@/types'

const categoryConfig = {
  REVIEWS: { icon: <MessageSquare className="w-4 h-4" />, color: 'bg-pink-500/10 text-pink-400', label: 'Avis' },
  PHOTOS: { icon: <Camera className="w-4 h-4" />, color: 'bg-blue-500/10 text-blue-400', label: 'Photos' },
  POSTS: { icon: <FileText className="w-4 h-4" />, color: 'bg-purple-500/10 text-purple-400', label: 'Posts' },
  INFO: { icon: <Info className="w-4 h-4" />, color: 'bg-yellow-500/10 text-yellow-400', label: 'Infos' },
  WEBSITE: { icon: <Globe className="w-4 h-4" />, color: 'bg-cyan-500/10 text-cyan-400', label: 'Site' },
  ENGAGEMENT: { icon: <Star className="w-4 h-4" />, color: 'bg-orange-500/10 text-orange-400', label: 'Engagement' },
}

interface WeeklyMissionsProps {
  tasks: WeekTask[]
  weekOf?: string
}

export function WeeklyMissions({ tasks, weekOf }: WeeklyMissionsProps) {
  const [localTasks, setLocalTasks] = useState(tasks)
  const [saving, setSaving] = useState<string | null>(null)

  const completedCount = localTasks.filter(t => t.isCompleted).length
  const totalPoints = localTasks.reduce((sum, t) => sum + t.impact, 0)
  const earnedPoints = localTasks.filter(t => t.isCompleted).reduce((sum, t) => sum + t.impact, 0)

  const handleComplete = async (taskId: string) => {
    const task = localTasks.find(t => t.id === taskId)
    if (!task || saving) return

    const newCompleted = !task.isCompleted
    setSaving(taskId)

    setLocalTasks(prev =>
      prev.map(t => t.id === taskId ? { ...t, isCompleted: newCompleted } : t)
    )

    try {
      await fetch('/api/tasks/complete', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, completed: newCompleted }),
      })
    } catch {
      setLocalTasks(prev =>
        prev.map(t => t.id === taskId ? { ...t, isCompleted: !newCompleted } : t)
      )
    } finally {
      setSaving(null)
    }
  }

  return (
    <Card>
      <CardContent>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold text-lg">Missions de la semaine</h3>
            {weekOf && <p className="text-dark-400 text-sm mt-0.5">{weekOf}</p>}
          </div>
          <div className="text-right">
            <div className="text-accent-400 font-bold text-lg">+{earnedPoints}/{totalPoints} pts</div>
            <div className="text-dark-400 text-xs">{completedCount}/{localTasks.length} complétées</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress
            value={completedCount}
            max={localTasks.length}
            barClassName="from-accent-600 to-accent-400"
          />
        </div>

        {/* Tasks */}
        <div className="space-y-3">
          {localTasks.map((task, i) => {
            const config = categoryConfig[task.category]
            const isSaving = saving === task.id
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer group transition-all duration-200 ${
                  isSaving ? 'opacity-60' : ''
                } ${
                  task.isCompleted
                    ? 'bg-accent-500/5 border-accent-500/20 opacity-60'
                    : 'bg-dark-800/30 border-dark-700 hover:border-dark-600 hover:bg-dark-800/50'
                }`}
                onClick={() => handleComplete(task.id)}
              >
                {/* Checkbox */}
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 mt-0.5 ${
                  task.isCompleted ? 'bg-accent-500 border-accent-500' : 'border-dark-600 group-hover:border-primary-500'
                }`}>
                  <AnimatePresence>
                    {task.isCompleted && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${config.color}`}>
                      {config.icon}
                      {config.label}
                    </span>
                  </div>
                  <p className={`font-medium text-sm ${task.isCompleted ? 'text-dark-400 line-through' : 'text-white'}`}>
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-dark-500 text-xs mt-0.5">{task.description}</p>
                  )}
                </div>

                {/* Impact */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className={`text-sm font-bold ${task.isCompleted ? 'text-accent-500' : 'text-accent-400'}`}>
                    +{task.impact} pts
                  </div>
                  <ChevronRight className="w-4 h-4 text-dark-600 group-hover:text-dark-400 transition-colors" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {completedCount > 0 && completedCount === localTasks.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-accent-500/10 border border-accent-500/20 rounded-xl text-center"
          >
            <p className="text-accent-400 font-semibold">🎉 Toutes les missions complétées !</p>
            <p className="text-dark-400 text-sm mt-1">+{earnedPoints} points gagnés cette semaine</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
