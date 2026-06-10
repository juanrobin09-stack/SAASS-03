'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ProgressProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  showLabel?: boolean
  animated?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Progress({
  value,
  max = 100,
  className,
  barClassName,
  showLabel,
  animated = true,
  size = 'md',
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div className="flex items-center gap-3">
      <div className={cn('flex-1 rounded-full bg-dark-800 overflow-hidden', heights[size], className)}>
        {animated ? (
          <motion.div
            className={cn('h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400', barClassName)}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ) : (
          <div
            className={cn('h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400', barClassName)}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
      {showLabel && (
        <span className="text-sm text-dark-400 min-w-[3rem] text-right">{Math.round(percentage)}%</span>
      )}
    </div>
  )
}
