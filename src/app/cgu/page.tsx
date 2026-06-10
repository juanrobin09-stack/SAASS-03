import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'

export const metadata = {
  title: 'Conditions Générales d\'Utilisation — LocalScore.ai',
}

export default function CguPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-32">
        <h1 className="text-3xl font-bold text-white mb-2">Conditions Générales d'Utilisation</h1>
        <p className="text-dark-500 text-sm mb-12">Dernière mise à jour : juin 2026</p>

        <div className="space-y-10 text-dark-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-3">1. Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du service LocalScore.ai accessible à l'adresse <strong className="text-white">locentra.space</strong>.
            </p>
            <p className="mt-3">
              LocalScore.ai est un service d'analyse de visibilité locale pour les commerces et établissements, proposant un Score IA, des recommandations personnalisées et un suivi de progression.
            </p>
            <p className="mt-3">
              En vous inscrivant, vous acceptez sans réserve les présentes CGU.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">2. Accès au service</h2>
            <p>
              L'accès au service LocalScore.ai nécessite la création d'un compte utilisateur via notre système d'authentification (Clerk). Vous vous engagez à fournir des informations exactes et à maintenir la confidentialité de vos identifiants de connexion.
            </p>
            <p className="mt-3">
              LocalScore.ai se réserve le droit de suspendre ou supprimer tout compte ne respectant pas les présentes CGU.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">3. Plans et abonnements</h2>
            <div className="space-y-3">
              <div className="p-4 bg-dark-900/50 border border-dark-800 rounded-xl">
                <p className="text-white font-medium mb-1">Plan Gratuit</p>
                <p>Permet de réaliser 1 analyse complète. Aucun suivi dans le temps. Sans carte bancaire requise.</p>
              </div>
              <div className="p-4 bg-dark-900/50 border border-dark-800 rounded-xl">
                <p className="text-white font-medium mb-1">Plan Pro — 19€/mois</p>
                <p>Suivi hebdomadaire d'1 établissement, historique complet, coach IA, missions, alertes, gamification et export PDF.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">4. Paiement et facturation</h2>
            <p>
              Les paiements sont traités par <strong className="text-white">Stripe</strong>, prestataire de services de paiement sécurisé. LocalScore.ai n'a jamais accès à vos informations de carte bancaire.
            </p>
            <p className="mt-3">
              Les abonnements sont prélevés mensuellement à la date anniversaire de souscription. En cas d'échec de paiement, l'accès aux fonctionnalités payantes sera suspendu après une période de grâce de 7 jours.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">5. Résiliation et remboursement</h2>
            <p>
              Vous pouvez résilier votre abonnement à tout moment depuis votre espace client (Paramètres → Gérer l'abonnement). La résiliation prend effet à la fin de la période en cours.
            </p>
            <p className="mt-3">
              LocalScore.ai offre une <strong className="text-white">garantie de remboursement de 30 jours</strong> pour les nouveaux abonnés. Contactez-nous à juanrobin09@gmail.com pour en bénéficier.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">6. Obligations de l'utilisateur</h2>
            <p>Vous vous engagez à :</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Utiliser le service uniquement pour votre établissement ou pour des établissements que vous êtes autorisé à gérer</li>
              <li>Ne pas tenter d'accéder aux données d'autres utilisateurs</li>
              <li>Ne pas utiliser le service à des fins illicites ou frauduleuses</li>
              <li>Ne pas soumettre de données fausses ou trompeuses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">7. Limitation de responsabilité</h2>
            <p>
              Les scores, recommandations et analyses fournis par LocalScore.ai sont à titre indicatif. Ils reposent sur des données publiques et des algorithmes d'estimation. LocalScore.ai ne garantit pas de résultats spécifiques en termes de référencement, de visibilité ou de chiffre d'affaires.
            </p>
            <p className="mt-3">
              La responsabilité de LocalScore.ai est limitée au montant des sommes versées par l'utilisateur au cours des 12 derniers mois.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">8. Propriété intellectuelle</h2>
            <p>
              Le service LocalScore.ai, incluant ses algorithmes, son interface, ses textes et ses visuels, est la propriété exclusive de LocalScore.ai. Toute reproduction ou exploitation sans autorisation est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">9. Modification des CGU</h2>
            <p>
              LocalScore.ai se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés par email de toute modification substantielle. La poursuite de l'utilisation du service après notification vaut acceptation des nouvelles CGU.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">10. Droit applicable</h2>
            <p>
              Les présentes CGU sont soumises au droit français. Tout litige sera soumis à la compétence exclusive des tribunaux français.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">11. Contact</h2>
            <p>
              Pour toute question : <a href="mailto:juanrobin09@gmail.com" className="text-primary-400 hover:underline">juanrobin09@gmail.com</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
