import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'

export const metadata = {
  title: 'Mentions légales — Locentra',
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-32">
        <h1 className="text-3xl font-bold text-white mb-2">Mentions légales</h1>
        <p className="text-dark-500 text-sm mb-12">Dernière mise à jour : juin 2025</p>

        <div className="space-y-10 text-dark-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-3">1. Éditeur du site</h2>
            <p>Le site <strong className="text-white">locentra.space</strong> est édité par :</p>
            <div className="mt-3 p-4 bg-dark-900/50 border border-dark-800 rounded-xl space-y-1">
              <p><strong className="text-dark-200">Raison sociale :</strong> Locentra</p>
              <p><strong className="text-dark-200">Email :</strong> contact@locentra.space</p>
              <p><strong className="text-dark-200">Site web :</strong> https://locentra.space</p>
            </div>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">2. Hébergement</h2>
            <div className="p-4 bg-dark-900/50 border border-dark-800 rounded-xl space-y-1">
              <p><strong className="text-dark-200">Hébergeur :</strong> Vercel Inc.</p>
              <p><strong className="text-dark-200">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
              <p><strong className="text-dark-200">Site :</strong> https://vercel.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments constituant le site Locentra (textes, graphismes, logiciels, images, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses) sont la propriété exclusive de Locentra ou de leurs détenteurs respectifs.
            </p>
            <p className="mt-3">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Locentra.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">4. Limitation de responsabilité</h2>
            <p>
              Locentra s'efforce de fournir des informations aussi précises que possible. Toutefois, Locentra ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            </p>
            <p className="mt-3">
              Les scores et recommandations générés par Locentra sont fournis à titre indicatif sur la base des données disponibles. Ils ne constituent pas un conseil professionnel en marketing ou en référencement.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">5. Données personnelles</h2>
            <p>
              Le traitement des données personnelles est détaillé dans notre{' '}
              <a href="/confidentialite" className="text-primary-400 hover:underline">Politique de confidentialité</a>.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">6. Droit applicable</h2>
            <p>
              Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">7. Contact</h2>
            <p>
              Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l'adresse suivante :{' '}
              <a href="mailto:contact@locentra.space" className="text-primary-400 hover:underline">contact@locentra.space</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
