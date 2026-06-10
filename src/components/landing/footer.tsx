import Link from 'next/link'
import { MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-dark-800 bg-dark-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">LocalScore<span className="text-primary-400">.ai</span></span>
            </Link>
            <p className="text-dark-400 text-sm max-w-xs leading-relaxed">
              Le micro-SaaS premium pour mesurer, améliorer et dominer votre visibilité locale.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Produit</h4>
            <ul className="space-y-2">
              {['Fonctionnalités', 'Tarifs', 'Comment ça marche', 'FAQ'].map(item => (
                <li key={item}>
                  <a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              {['Confidentialité', 'CGU', 'Mentions légales', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-500 text-sm">
            © 2025 LocalScore.ai — Tous droits réservés
          </p>
          <p className="text-dark-500 text-sm">
            Fait avec ❤️ pour les commerces locaux
          </p>
        </div>
      </div>
    </footer>
  )
}
