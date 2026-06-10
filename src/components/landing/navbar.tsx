'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#fonctionnalites', label: 'Fonctionnalités' },
  { href: '#comment-ca-marche', label: 'Comment ça marche' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-dark-950/75 backdrop-blur-2xl border-b border-dark-800/60 shadow-xl shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo size="md" />

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-dark-400 hover:text-white transition-colors text-sm font-medium rounded-lg hover:bg-dark-900/50"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-dark-300 hover:text-white">
                Connexion
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="shadow-glow">
                Essai gratuit
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-dark-800 bg-dark-950/95 backdrop-blur-xl"
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-dark-300 hover:text-white py-2.5 px-3 text-sm rounded-lg hover:bg-dark-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">Connexion</Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Essai gratuit — sans carte</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
