import type { Business } from './businesses'
import type { City } from './cities'
import { SECTORS, getLevers } from './sectors'
import { cap, pickVariant } from './index'

/** Replace trade/city tokens used in sector copy with the concrete business + city. */
export function interpolate(text: string, business: Business, city: City): string {
  return text
    .replace(/\{ville\}/g, city.name)
    .replace(/\{region\}/g, city.region)
    .replace(/\{(?:commerce|service|sport|hotellerie|restaurant|metier|m[ée]tier)\}/g, business.singular)
}

export interface FaqItem {
  q: string
  a: string
}

/** Deterministic, business+city-aware FAQ — also feeds the FAQPage schema. */
export function buildFaq(business: Business, city: City): FaqItem[] {
  const seed = `${business.slug}-${city.slug}`
  const sector = SECTORS[business.sector]
  const intent = sector.intents[0]

  const items: FaqItem[] = [
    {
      q: `Comment apparaître en premier sur Google Maps pour ${business.article} ${business.singular} à ${city.name} ?`,
      a: `Pour remonter dans le pack local de Google à ${city.name}, trois leviers comptent le plus : une fiche Google Business complète à 100 %, un flux régulier d’avis récents avec réponses, et une activité continue (photos, posts). LocalScore.ai analyse votre fiche et vous donne la liste exacte des actions prioritaires, chiffrées en points de score.`,
    },
    {
      q: `Pourquoi mes concurrents ${business.plural} sont-ils mieux référencés que moi à ${city.name} ?`,
      a: pickVariant(
        [
          `Le plus souvent, vos concurrents ${business.plural} à ${city.name} ont simplement une fiche plus complète, plus d’avis récents et une activité régulière. Ce ne sont pas de gros budgets, mais des signaux que l’algorithme local de Google récompense. L’analyse gratuite de LocalScore.ai vous montre précisément l’écart, point par point.`,
          `Google classe les ${business.plural} selon la pertinence, la proximité et la notoriété de la fiche. À ${city.name}, vos concurrents devancent souvent grâce à de petits détails cumulés : catégorie précise, avis fréquents, photos à jour. LocalScore.ai identifie exactement ce qui vous manque.`,
        ],
        seed
      ),
    },
    {
      q: `Combien d’avis faut-il pour ${business.article} ${business.singular} à ${city.name} ?`,
      a: `Il n’y a pas de chiffre magique : ce qui compte, c’est d’en avoir plus que vos concurrents directs, avec une note solide et surtout une régularité (des avis récents chaque mois). LocalScore.ai compare votre volume d’avis à celui des autres ${business.plural} de ${city.name} et vous indique l’objectif réaliste à viser.`,
    },
    {
      q: `L’analyse LocalScore.ai est-elle vraiment gratuite ?`,
      a: `Oui. Vous lancez l’analyse de votre fiche Google Business gratuitement, sans carte bancaire. Vous obtenez votre Score Local IA, la comparaison avec vos concurrents et un plan d’action concret. Vous décidez ensuite, librement, si vous souhaitez aller plus loin avec le suivi hebdomadaire.`,
    },
    {
      q: `Je débute, ma fiche est presque vide — est-ce le bon moment pour ${business.article} ${business.singular} à ${city.name} ?`,
      a: `C’est même le meilleur moment. Quand une fiche part de zéro, chaque action compte double et les premiers gains de visibilité arrivent vite. LocalScore.ai vous donne l’ordre de priorité exact pour ne pas perdre de temps et progresser dès la première semaine sur les recherches « ${intent} ${city.name} ».`,
    },
  ]
  return items
}

export interface PageContent {
  h1: string
  heroSubtitle: string
  section1Title: string
  section1: string[]
  section2Title: string
  mistakes: { title: string; desc: string }[]
  section3Title: string
  levers: { title: string; desc: string }[]
  section4Title: string
  section4Intro: string
  competitors: string[]
  faq: FaqItem[]
  stakes: string
}

export function buildPageContent(business: Business, city: City): PageContent {
  const sector = SECTORS[business.sector]
  const seed = `${business.slug}-${city.slug}`

  const section4Intro = pickVariant(
    [
      `Si un concurrent capte les clients que vous devriez avoir à ${city.name}, ce n’est presque jamais une question de chance ni de prix. C’est une question de visibilité. Voici ce qu’il fait probablement mieux que vous :`,
      `À ${city.name}, l’écart entre ${business.article} ${business.singular} qui croule sous les demandes et un autre qui peine se joue souvent sur la fiche Google. Concrètement, voici pourquoi vos concurrents passent devant :`,
    ],
    seed
  )

  return {
    h1: `Analyse Google Business pour les ${business.plural} à ${city.name}`,
    heroSubtitle: `Découvrez gratuitement pourquoi vos concurrents sont mieux référencés localement à ${city.name}, et obtenez un plan d’action généré par IA pour les dépasser.`,
    section1Title: `Pourquoi la visibilité locale est essentielle pour ${business.article} ${business.singular} à ${city.name}`,
    section1: sector.whyLocal.map((p) => interpolate(p, business, city)),
    section2Title: `Les erreurs qui coûtent le plus cher aux ${business.plural} à ${city.name}`,
    mistakes: sector.mistakes,
    section3Title: `Comment améliorer son référencement local quand on est ${business.article} ${business.singular}`,
    levers: getLevers(business.sector),
    section4Title: `Pourquoi vos concurrents passent devant à ${city.name}`,
    section4Intro,
    competitors: sector.competitors.map((p) => interpolate(p, business, city)),
    faq: buildFaq(business, city),
    stakes: sector.stakes,
  }
}

/** SEO metadata — unique title/description/keywords per page. */
export function buildMetadata(business: Business, city: City) {
  const title = `${cap(business.singular)} à ${city.name} : analyse Google & SEO local | LocalScore.ai`
  const description = `Pourquoi vos concurrents ${business.plural} sont mieux référencés à ${city.name} ? Analysez gratuitement votre fiche Google Business, votre Score Local IA et obtenez un plan d’action.`
  const keywords = [
    `${business.singular} ${city.name}`,
    `référencement ${business.singular} ${city.name}`,
    `SEO local ${city.name}`,
    `fiche Google Business ${business.singular}`,
    `visibilité ${business.plural} ${city.name}`,
    `Google Maps ${business.singular} ${city.name}`,
  ].join(', ')
  return { title, description, keywords }
}
