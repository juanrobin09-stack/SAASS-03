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
              <span className="font-bold text-white text-lg">Locentra</span>
            </Link>
            <p className="text-dark-400 text-sm max-w-xs leading-relaxed">
              Mesurez, améliorez et dominez votre visibilité locale.
              Un Score IA, des missions concrètes, une progression visible.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Produit</h4>
            <ul className="space-y-2">
              <li><a href="/#fonctionnalites" className="text-dark-400 hover:text-white text-sm transition-colors">Fonctionnalités</a></li>
              <li><a href="/#tarifs" className="text-dark-400 hover:text-white text-sm transition-colors">Tarifs</a></li>
              <li><a href="/#comment-ca-marche" className="text-dark-400 hover:text-white text-sm transition-colors">Comment ça marche</a></li>
              <li><a href="/#faq" className="text-dark-400 hover:text-white text-sm transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><Link href="/confidentialite" className="text-dark-400 hover:text-white text-sm transition-colors">Confidentialité</Link></li>
              <li><Link href="/cgu" className="text-dark-400 hover:text-white text-sm transition-colors">CGU</Link></li>
              <li><Link href="/mentions-legales" className="text-dark-400 hover:text-white text-sm transition-colors">Mentions légales</Link></li>
              <li><a href="mailto:contact@locentra.space" className="text-dark-400 hover:text-white text-sm transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-500 text-sm">
            © 2025 Locentra — Tous droits réservés
          </p>
          <p className="text-dark-500 text-sm">
            Fait pour les commerces locaux qui veulent progresser
          </p>
        </div>
      </div>
    </footer>
  )
}
