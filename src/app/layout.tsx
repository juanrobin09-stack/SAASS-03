import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LocalScore.ai — Dominez votre visibilité locale',
  description: 'Découvrez pourquoi votre concurrent attire plus de clients et suivez votre progression semaine après semaine avec notre Score Local IA.',
  keywords: 'SEO local, visibilité Google, score local, référencement local, Google My Business',
  authors: [{ name: 'LocalScore.ai' }],
  openGraph: {
    title: 'LocalScore.ai — Dominez votre visibilité locale',
    description: 'Score Local IA en temps réel. Analyse concurrentielle. Coach IA personnalisé.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LocalScore.ai',
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
