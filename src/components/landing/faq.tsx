'use client'

import { useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Comment est calculé le Score Local IA ?',
    a: 'Le Score Local est calculé sur 100 points en analysant : le nombre et la qualité de vos avis Google (30 pts), vos photos (20 pts), la complétude de votre fiche Google (15 pts), votre activité de posts (10 pts), votre taux de réponse aux avis (15 pts) et la présence d\'un site web (10 pts).',
  },
  {
    q: 'Comment l\'IA trouve-t-elle mes concurrents ?',
    a: 'Notre système identifie automatiquement les établissements de même catégorie dans votre zone géographique et sélectionne ceux avec le score le plus élevé. Vous pouvez aussi renseigner un concurrent spécifique pour le suivre directement.',
  },
  {
    q: 'À quelle fréquence mon score est-il mis à jour ?',
    a: 'En plan Pro, votre score est mis à jour automatiquement chaque semaine. Vous recevez une notification avec l\'évolution et les nouvelles missions. En plan Gratuit, une seule analyse est disponible.',
  },
  {
    q: 'Mes données sont-elles sécurisées ?',
    a: 'Oui. Toutes les données sont chiffrées et hébergées en Europe. Nous ne partageons jamais vos données avec des tiers. Vous pouvez demander la suppression de votre compte à tout moment.',
  },
  {
    q: 'Puis-je annuler à tout moment ?',
    a: 'Oui, sans engagement ni frais de résiliation. L\'annulation se fait en un clic depuis votre tableau de bord. Vous continuez à avoir accès jusqu\'à la fin de la période payée.',
  },
  {
    q: 'Y a-t-il une période d\'essai ?',
    a: 'Le plan Gratuit est disponible indéfiniment et inclut une analyse complète. Si vous passez au Pro et n\'êtes pas satisfait dans les 30 premiers jours, nous vous remboursons intégralement.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="faq" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-dark-950" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Questions fréquentes</h2>
          <p className="text-dark-400">Tout ce que vous devez savoir avant de démarrer.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              className="border border-dark-800 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left bg-dark-900/50 hover:bg-dark-900 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-white font-medium pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-dark-400 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-dark-400 text-sm leading-relaxed bg-dark-900/30">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
