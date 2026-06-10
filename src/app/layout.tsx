import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Locentra — Dominez votre visibilité locale',
  description: 'Découvrez pourquoi votre concurrent attire plus de clients. Score Local IA, missions hebdomadaires, coach IA personnalisé.',
  keywords: 'SEO local, visibilité Google, score local, référencement local, Google My Business, Locentra',
  authors: [{ name: 'Locentra' }],
  metadataBase: new URL('https://locentra.space'),
  openGraph: {
    title: 'Locentra — Dominez votre visibilité locale',
    description: 'Score Local IA en temps réel. Missions concrètes. Coach IA personnalisé.',
    type: 'website',
    url: 'https://locentra.space',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Locentra',
    description: 'Dominez votre visibilité locale avec l\'IA',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
