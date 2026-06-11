'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MapPin, Star, Users, Camera, Globe, TrendingUp, Check } from 'lucide-react'

interface ScanStep {
  id: string
  label: string
  icon: React.ReactNode
  duration: number
}

const scanSteps: ScanStep[] = [
  { id: 'locate', label: 'Localisation de votre établissement…', icon: <MapPin className="w-4 h-4" />, duration: 1200 },
  { id: 'google', label: 'Analyse de votre fiche Google…', icon: <Star className="w-4 h-4" />, duration: 1500 },
  { id: 'reviews', label: 'Collecte de vos avis clients…', icon: <Users className="w-4 h-4" />, duration: 1000 },
  { id: 'photos', label: 'Vérification de vos photos…', icon: <Camera className="w-4 h-4" />, duration: 800 },
  { id: 'website', label: 'Analyse de votre présence web…', icon: <Globe className="w-4 h-4" />, duration: 1000 },
  { id: 'competitors', label: 'Recherche de vos concurrents…', icon: <TrendingUp className="w-4 h-4" />, duration: 1500 },
  { id: 'calculate', label: 'Calcul de votre Score Local IA…', icon: <TrendingUp className="w-4 h-4" />, duration: 2000 },
]

interface ScanAnimationProps {
  businessName: string
  onComplete: () => void
}

export function ScanAnimation({ businessName, onComplete }: ScanAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let totalDuration = 0
    const timers: NodeJS.Timeout[] = []

    scanSteps.forEach((step, index) => {
      const timer = setTimeout(() => {
        setCurrentStep(index)
        setProgress(Math.round(((index + 1) / scanSteps.length) * 100))
        if (index > 0) {
          setCompletedSteps(prev => [...prev, scanSteps[index - 1].id])
        }
      }, totalDuration)

      timers.push(timer)
      totalDuration += step.duration
    })

    const finalTimer = setTimeout(() => {
      setCompletedSteps(scanSteps.map(s => s.id))
      setProgress(100)
      setTimeout(onComplete, 500)
    }, totalDuration)

    timers.push(finalTimer)

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="relative mb-6">
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-600/30 to-accent-500/30 border border-primary-500/30 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <MapPin className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
            {/* Orbit rings */}
            {[90, 118].map((size, i) => (
              <motion.div
                key={size}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-500/10"
                style={{ width: size, height: size }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Analyse en cours…
          </h2>
          <p className="text-dark-400 text-center break-words max-w-full px-2">
            Nous analysons <span className="text-primary-400 font-medium">&laquo;&nbsp;{businessName}&nbsp;&raquo;</span>
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-dark-400">Progression</span>
            <span className="text-primary-400 font-medium">{progress}%</span>
          </div>
          <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-600 to-accent-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {scanSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id)
            const isCurrent = currentStep === index
            const isPending = index > currentStep

            return (
              <AnimatePresence key={step.id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                    isCurrent ? 'bg-primary-500/10 border border-primary-500/20' : 'bg-dark-900/30'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-accent-500 text-white'
                      : isCurrent
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'bg-dark-800 text-dark-500'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : isCurrent ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                        {step.icon}
                      </motion.div>
                    ) : (
                      step.icon
                    )}
                  </div>

                  <span className={`text-sm font-medium transition-colors min-w-0 flex-1 truncate ${
                    isCompleted ? 'text-dark-400 line-through' : isCurrent ? 'text-white' : 'text-dark-600'
                  }`}>
                    {step.label}
                  </span>

                  {isCurrent && (
                    <motion.div
                      className="ml-auto flex gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            )
          })}
        </div>
      </div>
    </div>
  )
}
