'use client'

import { useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Comment est calculé le Score Local IA ?',
    a: 'Le Score est calculé sur 100 points à partir de 6 critères publics de votre fiche Google : nombre et qualité des avis (30 pts), photos (20 pts), taux de réponse aux avis (15 pts), complétude de la fiche (15 pts), activité de posts (10 pts) et présence d\'un site web (10 pts). L\'IA recalcule ce score chaque semaine à partir des données réelles de votre fiche.',
  },
  {
    q: 'Mon Score Local peut-il vraiment améliorer ma position sur Google Maps ?',
    a: 'Oui. Les facteurs que nous mesurons — avis, photos, complétude, réponses — sont exactement les signaux que Google utilise pour classer les établissements dans le Local Pack (les 3 résultats en haut de Maps). Progresser sur votre Score LocalScore.ai, c\'est directement améliorer votre référencement local.',
  },
  {
    q: 'Comment l\'IA identifie-t-elle mes concurrents directs ?',
    a: 'Lors de l\'onboarding, vous renseignez le nom et la ville de votre établissement. Notre système analyse automatiquement les établissements de même catégorie dans votre zone et sélectionne celui avec le score le plus élevé comme référence. Vous voyez précisément l\'écart et ce qu\'il faudrait faire pour le dépasser.',
  },
  {
    q: 'Mon établissement a peu d\'avis — est-ce utile de commencer maintenant ?',
    a: 'C\'est même le meilleur moment. Avec peu d\'avis, chaque nouvel avis fait bondir votre score. LocalScore.ai identifie chaque semaine vos gains les plus rapides selon votre situation réelle. Le coach IA vous dit exactement quoi faire en priorité pour rattraper vos concurrents.',
  },
  {
    q: 'À quelle fréquence mon score est-il mis à jour ?',
    a: 'En plan Pro, votre score est recalculé automatiquement chaque semaine. Vous pouvez aussi déclencher une nouvelle analyse à tout moment depuis votre tableau de bord. En plan Gratuit, une seule analyse est disponible — elle reste accessible indéfiniment.',
  },
  {
    q: 'Puis-je suivre plusieurs établissements ?',
    a: 'Le plan Pro inclut 1 établissement en suivi continu. Pour plusieurs établissements — franchise, réseau de points de vente — contactez-nous à juanrobin89@gmail.com. Nous proposons des offres adaptées dès 2 établissements.',
  },
  {
    q: 'Puis-je annuler mon abonnement à tout moment ?',
    a: 'Oui, sans engagement ni frais de résiliation. L\'annulation se fait en un clic depuis votre tableau de bord (Paramètres → Gérer l\'abonnement). Vous continuez à bénéficier de toutes les fonctionnalités Pro jusqu\'à la fin de la période déjà payée.',
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
