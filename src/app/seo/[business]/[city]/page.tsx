import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SeoLanding } from '@/components/seo/seo-landing'
import {
  getBusiness,
  getCity,
  buildStaticPairs,
  cap,
} from '@/lib/seo'
import { buildMetadata, buildPageContent } from '@/lib/seo/content'

const SITE_URL = 'https://locentra.space'

interface Params {
  params: { business: string; city: string }
}

// Pre-render a curated subset at build; the rest are generated on-demand (ISR).
export const dynamicParams = true
export const revalidate = 86400 // 24h

export function generateStaticParams() {
  return buildStaticPairs()
}

export function generateMetadata({ params }: Params): Metadata {
  const business = getBusiness(params.business)
  const city = getCity(params.city)
  if (!business || !city) return {}

  const { title, description, keywords } = buildMetadata(business, city)
  const canonical = `${SITE_URL}/seo/${business.slug}/${city.slug}`

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      locale: 'fr_FR',
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'LocalScore.ai' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.png'],
    },
    robots: { index: true, follow: true },
  }
}

export default function SeoPage({ params }: Params) {
  const business = getBusiness(params.business)
  const city = getCity(params.city)
  if (!business || !city) notFound()

  const content = buildPageContent(business, city)
  const canonical = `${SITE_URL}/seo/${business.slug}/${city.slug}`
  const { title, description } = buildMetadata(business, city)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'SEO local', item: `${SITE_URL}/seo` },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${cap(business.singular)} à ${city.name}`,
            item: canonical,
          },
        ],
      },
      {
        '@type': 'Service',
        name: title,
        description,
        serviceType: `Analyse de visibilité locale pour ${business.plural}`,
        areaServed: {
          '@type': 'City',
          name: city.name,
          containedInPlace: { '@type': 'AdministrativeArea', name: city.region },
        },
        provider: {
          '@type': 'Organization',
          name: 'LocalScore.ai',
          url: SITE_URL,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          description: 'Analyse gratuite de la fiche Google Business et Score Local IA',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: content.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoLanding business={business} city={city} />
    </>
  )
}
