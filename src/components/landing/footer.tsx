import Link from 'next/link'
import { Logo } from '@/components/ui/logo'

export function Footer() {
  return (
    <footer id="site-footer" className="border-t border-dark-800/60 bg-dark-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="mb-5">
              <Logo href="/" size="md" />
            </div>
            <p className="text-dark-500 text-sm max-w-xs leading-relaxed">
              Mesurez votre visibilité locale, identifiez vos concurrents, progressez chaque semaine.
              Construit pour les commerces locaux qui veulent gagner.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Produit</h4>
            <ul className="space-y-3">
              {[
                { href: '/#fonctionnalites', label: 'Fonctionnalités' },
                { href: '/#tarifs', label: 'Tarifs' },
                { href: '/#comment-ca-marche', label: 'Comment ça marche' },
                { href: '/#faq', label: 'FAQ' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-dark-500 hover:text-dark-200 text-sm transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Légal & Contact</h4>
            <ul className="space-y-3">
              {[
                { href: '/confidentialite', label: 'Confidentialité', external: false },
                { href: '/cgu', label: 'CGU', external: false },
                { href: '/mentions-legales', label: 'Mentions légales', external: false },
                { href: 'mailto:juanrobin09@gmail.com', label: 'Nous contacter', external: true },
              ].map(({ href, label, external }) => (
                <li key={href}>
                  {external ? (
                    <a href={href} className="text-dark-500 hover:text-dark-200 text-sm transition-colors">
                      {label}
                    </a>
                  ) : (
                    <Link href={href} className="text-dark-500 hover:text-dark-200 text-sm transition-colors">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-dark-600 text-xs">
            © 2026 LocalScore.ai — Tous droits réservés
          </p>
          <p className="text-dark-600 text-xs">
            Construit pour les commerçants locaux qui veulent progresser
          </p>
        </div>
      </div>
    </footer>
  )
}
