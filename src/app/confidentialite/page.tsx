import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'

export const metadata = {
  title: 'Politique de confidentialité — LocalScore.ai',
}

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-32">
        <h1 className="text-3xl font-bold text-white mb-2">Politique de confidentialité</h1>
        <p className="text-dark-500 text-sm mb-12">Dernière mise à jour : juin 2026 — Conforme RGPD</p>

        <div className="space-y-10 text-dark-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-3">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles est <strong className="text-white">LocalScore.ai</strong>, accessible à l'adresse <strong className="text-white">juanrobin09@gmail.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">2. Données collectées</h2>
            <p>Nous collectons les données suivantes :</p>
            <div className="mt-3 space-y-2">
              {[
                { cat: 'Données de compte', detail: 'Nom, adresse email, identifiant Clerk' },
                { cat: 'Données d\'établissement', detail: 'Nom, adresse, ville, catégorie, site web, téléphone' },
                { cat: 'Données d\'analyse', detail: 'Scores calculés, historique de progression, missions, alertes' },
                { cat: 'Données de paiement', detail: 'Identifiant client Stripe (jamais les numéros de carte)' },
                { cat: 'Données techniques', detail: 'Logs de connexion, adresse IP, navigateur (via Clerk)' },
              ].map(item => (
                <div key={item.cat} className="flex gap-3 p-3 bg-dark-900/50 border border-dark-800 rounded-lg">
                  <span className="text-primary-400 font-medium shrink-0 w-48">{item.cat}</span>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">3. Finalités et bases légales</h2>
            <div className="space-y-2">
              {[
                { purpose: 'Fourniture du service', basis: 'Exécution du contrat' },
                { purpose: 'Gestion des abonnements', basis: 'Exécution du contrat' },
                { purpose: 'Envoi d\'emails transactionnels', basis: 'Exécution du contrat' },
                { purpose: 'Amélioration du produit', basis: 'Intérêt légitime' },
                { purpose: 'Sécurité et prévention des fraudes', basis: 'Intérêt légitime' },
                { purpose: 'Obligations comptables', basis: 'Obligation légale' },
              ].map(item => (
                <div key={item.purpose} className="flex gap-3 p-3 bg-dark-900/50 border border-dark-800 rounded-lg">
                  <span className="text-dark-200 shrink-0 w-64">{item.purpose}</span>
                  <span className="text-primary-400">{item.basis}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">4. Durée de conservation</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Données de compte : durée de la relation contractuelle + 3 ans</li>
              <li>Données d'analyse : durée de la relation contractuelle</li>
              <li>Données de facturation : 10 ans (obligation légale)</li>
              <li>Logs techniques : 12 mois</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">5. Destinataires des données</h2>
            <p>Vos données sont transmises aux sous-traitants suivants :</p>
            <div className="mt-3 space-y-2">
              {[
                { name: 'Clerk', role: 'Authentification', location: 'USA — Standard Contractuel' },
                { name: 'Neon / Vercel', role: 'Hébergement base de données', location: 'USA — Standard Contractuel' },
                { name: 'Stripe', role: 'Paiement', location: 'USA — Standard Contractuel' },
                { name: 'Anthropic', role: 'Génération IA (données anonymisées)', location: 'USA — Standard Contractuel' },
                { name: 'Google Places API', role: 'Données publiques d\'établissements', location: 'USA — Standard Contractuel' },
              ].map(item => (
                <div key={item.name} className="flex gap-3 p-3 bg-dark-900/50 border border-dark-800 rounded-lg text-xs">
                  <span className="text-white font-medium w-28 shrink-0">{item.name}</span>
                  <span className="flex-1">{item.role}</span>
                  <span className="text-dark-400">{item.location}</span>
                </div>
              ))}
            </div>
            <p className="mt-3">
              Aucune donnée n'est vendue à des tiers à des fins publicitaires.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">6. Vos droits (RGPD)</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li><strong className="text-dark-200">Droit d'accès</strong> : obtenir une copie de vos données</li>
              <li><strong className="text-dark-200">Droit de rectification</strong> : corriger vos données inexactes</li>
              <li><strong className="text-dark-200">Droit à l'effacement</strong> : supprimer votre compte et vos données</li>
              <li><strong className="text-dark-200">Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
              <li><strong className="text-dark-200">Droit d'opposition</strong> : vous opposer à certains traitements</li>
              <li><strong className="text-dark-200">Droit à la limitation</strong> : limiter le traitement de vos données</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à{' '}
              <a href="mailto:juanrobin09@gmail.com" className="text-primary-400 hover:underline">juanrobin09@gmail.com</a>.
              Nous répondrons dans un délai de 30 jours.
            </p>
            <p className="mt-3">
              Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">7. Cookies</h2>
            <p>
              LocalScore.ai utilise des cookies techniques strictement nécessaires au fonctionnement du service (sessions d'authentification). Aucun cookie publicitaire ou de tracking tiers n'est utilisé.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">8. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement TLS, authentification sécurisée, accès restreint aux données, hébergement sécurisé.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">9. Modifications</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique. Toute modification substantielle sera notifiée par email. La version en vigueur est toujours accessible sur cette page.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">10. Contact</h2>
            <p>
              <a href="mailto:juanrobin09@gmail.com" className="text-primary-400 hover:underline">juanrobin09@gmail.com</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
