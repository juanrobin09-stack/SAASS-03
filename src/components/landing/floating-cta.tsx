'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Sticky mobile-first conversion CTA.
 * - Appears after the user scrolls past the hero (so it never duplicates the hero CTA).
 * - Hides automatically once the footer enters view.
 * - Respects the iPhone home-indicator safe area.
 * - Hidden on md+ (desktop keeps the navbar CTA).
 */
export function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show after first viewport scrolled
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // Hide when the footer is visible
    const footer = document.getElementById('site-footer')
    let atFooter = false
    const observer = footer
      ? new IntersectionObserver(
          ([entry]) => {
            atFooter = entry.isIntersecting
            if (atFooter) setVisible(false)
            else onScroll()
          },
          { threshold: 0.01 }
        )
      : null
    if (footer && observer) observer.observe(footer)

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer?.disconnect()
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pointer-events-none"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          {/* Fade so content never feels abruptly cut behind the button */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-950 via-dark-950/90 to-transparent pointer-events-none" />
          <Link
            href="/register"
            className="pointer-events-auto relative flex items-center justify-center gap-2 w-full min-h-[54px] rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold text-base shadow-glow active:scale-[0.98] transition-transform"
          >
            <span>🚀 Commencer gratuitement</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
