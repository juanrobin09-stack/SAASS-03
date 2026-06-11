'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, TrendingUp, AlertTriangle, Zap, ChevronRight, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { AlertItem } from '@/types'

const alertConfig = {
  COMPETITOR_GAIN: { icon: <TrendingUp className="w-4 h-4" />, color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
  RATING_DROP: { icon: <AlertTriangle className="w-4 h-4" />, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  QUICK_WIN: { icon: <Zap className="w-4 h-4" />, color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  PROGRESS: { icon: <TrendingUp className="w-4 h-4" />, color: 'text-accent-400 bg-accent-500/10 border-accent-500/20' },
  WEEKLY_DIGEST: { icon: <Bell className="w-4 h-4" />, color: 'text-primary-400 bg-primary-500/10 border-primary-500/20' },
}

interface AlertsProps {
  alerts: AlertItem[]
  onDismiss?: (id: string) => void
}

export function Alerts({ alerts, onDismiss }: AlertsProps) {
  const [dismissed, setDismissed] = useState<string[]>([])
  const visibleAlerts = alerts.filter(a => !dismissed.includes(a.id))
  const unreadCount = visibleAlerts.filter(a => !a.isRead).length

  const handleDismiss = (id: string) => {
    setDismissed(prev => [...prev, id])
    onDismiss?.(id)
  }

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold">Alertes</h3>
            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {visibleAlerts.length === 0 ? (
          <div className="text-center py-6">
            <Bell className="w-8 h-8 text-dark-600 mx-auto mb-2" />
            <p className="text-dark-400 text-sm">Aucune alerte pour le moment</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {visibleAlerts.map((alert) => {
                const config = alertConfig[alert.type]
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`flex items-start gap-3 p-3 rounded-xl border ${config.color} ${!alert.isRead ? 'border-opacity-50' : 'opacity-60'}`}>
                      <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm">{alert.title}</p>
                        <p className="text-sm opacity-80 mt-0.5 leading-relaxed">{alert.message}</p>
                      </div>
                      <button
                        onClick={() => handleDismiss(alert.id)}
                        className="flex-shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity p-2 -m-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
