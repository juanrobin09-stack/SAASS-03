import { BUSINESSES, type Business } from './businesses'
import { CITIES, type City } from './cities'
import { SECTORS, getLevers } from './sectors'

export { BUSINESSES, CITIES, SECTORS, getLevers }
export type { Business, City }

const businessBySlug = new Map(BUSINESSES.map((b) => [b.slug, b]))
const cityBySlug = new Map(CITIES.map((c) => [c.slug, c]))

export function getBusiness(slug: string): Business | undefined {
  return businessBySlug.get(slug)
}

export function getCity(slug: string): City | undefined {
  return cityBySlug.get(slug)
}

/** Stable, dependency-free hash for deterministic content variation per page. */
export function hashString(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

/** Pick one deterministic variant from a list based on the business+city pair. */
export function pickVariant<T>(items: T[], seed: string): T {
  return items[hashString(seed) % items.length]
}

/** Other cities in the same region (fallback: nearest by list order) for internal linking. */
export function nearbyCities(city: City, limit = 6): City[] {
  const sameRegion = CITIES.filter((c) => c.slug !== city.slug && c.region === city.region)
  const others = CITIES.filter((c) => c.slug !== city.slug && c.region !== city.region)
  const ordered = [...sameRegion, ...others]
  return ordered.slice(0, limit)
}

/** Other businesses in the same sector for internal linking ("métiers similaires"). */
export function similarBusinesses(business: Business, limit = 6): Business[] {
  const sameSector = BUSINESSES.filter(
    (b) => b.slug !== business.slug && b.sector === business.sector
  )
  if (sameSector.length >= limit) return sameSector.slice(0, limit)
  const others = BUSINESSES.filter(
    (b) => b.slug !== business.slug && b.sector !== business.sector
  )
  return [...sameSector, ...others].slice(0, limit)
}

/** "Guides associés": same business in nearby cities — strong topical internal mesh. */
export function relatedGuides(business: Business, city: City, limit = 6): { business: Business; city: City }[] {
  return nearbyCities(city, limit).map((c) => ({ business, city: c }))
}

/** Capitalize first letter (for sentence-start business names). */
export function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export interface SeoPair {
  business: string
  city: string
}

/**
 * Curated subset pre-rendered at build time. The remaining combinations
 * (BUSINESSES × CITIES) are generated on-demand via ISR (dynamicParams).
 * This keeps build times fast while the architecture scales to thousands of pages.
 */
export function buildStaticPairs(topBusinesses = 12, topCities = 18): SeoPair[] {
  const pairs: SeoPair[] = []
  for (const b of BUSINESSES.slice(0, topBusinesses)) {
    for (const c of CITIES.slice(0, topCities)) {
      pairs.push({ business: b.slug, city: c.slug })
    }
  }
  return pairs
}

/** Every possible pair — used by the sitemap so Google discovers the full surface. */
export function allPairs(): SeoPair[] {
  const pairs: SeoPair[] = []
  for (const b of BUSINESSES) {
    for (const c of CITIES) {
      pairs.push({ business: b.slug, city: c.slug })
    }
  }
  return pairs
}
