import Anthropic from '@anthropic-ai/sdk'
import type { CoachReport, CoachSection } from '@/types'

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? 'sk-ant-placeholder-build' })
}

interface CoachMessageData {
  businessName: string
  category: string
  score: number
  previousScore?: number
  competitorName?: string
  competitorScore?: number
  googleReviewCount: number
  googleRating: number
  googlePhotosCount: number
  hasWebsite: boolean
  responseRate: number
  priorityWeakness: string
}

function buildFallback(data: CoachMessageData): CoachReport {
  const delta = data.previousScore ? data.score - data.previousScore : 0
  const gap = data.competitorScore ? data.competitorScore - data.score : null
  const ratePercent = Math.round(data.responseRate * 100)

  return {
    summary: `Votre score local est de ${data.score}/100${delta !== 0 ? ` (${delta > 0 ? '+' : ''}${delta} cette semaine)` : ''}. ${gap && gap > 0 ? `Votre concurrent principal vous devance de ${gap} points — cet écart est récupérable en quelques semaines d'actions ciblées.` : 'Votre position est bonne, continuez sur cette lancée.'} Concentrez-vous sur ${data.priorityWeakness.toLowerCase()} pour progresser rapidement.`,
    priorityAction: `Priorité absolue cette semaine : améliorer votre ${data.priorityWeakness.toLowerCase()} pour gagner jusqu'à 8 points de score.`,
    generatedAt: new Date().toISOString(),
    sections: [
      {
        id: 'diagnostic',
        title: 'Diagnostic Express',
        content: `Votre établissement ${data.businessName} affiche un score de ${data.score}/100${delta > 0 ? `, en progression de ${delta} points` : delta < 0 ? `, en recul de ${Math.abs(delta)} points` : ', stable'}. ${data.googleRating >= 4.5 ? 'Votre note Google est excellente et rassure les prospects.' : data.googleRating >= 4.0 ? 'Votre note Google est correcte mais peut encore progresser.' : 'Votre note Google nécessite une attention urgente.'} Le point critique à traiter est ${data.priorityWeakness.toLowerCase()}.`,
        insight: `Score ${data.score}/100 — ${delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : 'stable'} cette semaine`,
        actions: [
          `Identifier les 2 points faibles qui pèsent le plus sur votre score`,
          `Fixer un objectif de +5 points pour les 4 prochaines semaines`,
        ],
        priority: data.score < 40 ? 'critical' : data.score < 60 ? 'high' : 'medium',
        score: data.score,
      },
      {
        id: 'reviews',
        title: 'Stratégie Avis Google',
        content: `Avec ${data.googleReviewCount} avis et une note de ${data.googleRating}/5, votre réputation en ligne ${data.googleRating >= 4.5 ? 'est un vrai atout compétitif' : 'a du potentiel d\'amélioration'}. Votre taux de réponse aux avis est de ${ratePercent}%${ratePercent < 60 ? " — sous la moyenne des commerces bien référencés (80%+)" : " — c'est une excellente pratique à maintenir"}. Les avis sont le levier #1 du référencement local.`,
        insight: `${data.googleReviewCount} avis · ${data.googleRating}/5 · ${ratePercent}% de réponses`,
        actions: [
          `Répondre à tous les avis sans réponse dans les 24h`,
          `Demander un avis à chaque client satisfait cette semaine (objectif : +3 nouveaux avis)`,
          `Créer un QR code menant directement à la page d'avis Google`,
        ],
        priority: data.googleReviewCount < 10 ? 'critical' : data.googleReviewCount < 30 ? 'high' : ratePercent < 50 ? 'high' : 'medium',
      },
      {
        id: 'photos',
        title: 'Présence Visuelle',
        content: `Votre profil compte ${data.googlePhotosCount} photo${data.googlePhotosCount > 1 ? 's' : ''}${data.googlePhotosCount < 10 ? ' — très insuffisant pour attirer les clients en ligne' : data.googlePhotosCount < 25 ? ' — un bon début, mais vous pouvez aller plus loin' : ' — bonne base visuelle'}. Les établissements avec 30+ photos reçoivent 42% de demandes d'itinéraire en plus. Chaque photo est une vitrine permanente de votre établissement.`,
        insight: `${data.googlePhotosCount} photo${data.googlePhotosCount > 1 ? 's' : ''} · Objectif : 30+ pour maximiser la visibilité`,
        actions: [
          `Publier 5 nouvelles photos cette semaine (intérieur, extérieur, produits/services)`,
          `Photographier chaque nouveau produit ou service dès sa disponibilité`,
          `Ajouter des photos de l'équipe pour humaniser votre profil`,
        ],
        priority: data.googlePhotosCount < 5 ? 'critical' : data.googlePhotosCount < 15 ? 'high' : 'medium',
      },
      {
        id: 'profile',
        title: 'Fiche Google Business',
        content: `${data.hasWebsite ? 'Votre fiche est liée à votre site web' : 'Votre fiche n\'est pas reliée à un site web — manque à gagner important en termes de crédibilité'}. Une fiche Google optimisée à 100% reçoit jusqu'à 7x plus de visites. Les horaires d'ouverture, la description et les catégories secondaires sont des éléments souvent négligés qui font la différence.`,
        insight: data.hasWebsite ? 'Site web renseigné ✓' : 'Site web manquant — -15% de crédibilité',
        actions: [
          `Vérifier et mettre à jour vos horaires, y compris les jours fériés`,
          data.hasWebsite ? `Vérifier que l'URL de votre site est correcte et à jour` : `Créer ou renseigner l'URL de votre site web`,
          `Ajouter une description complète de 750 caractères avec vos mots-clés locaux`,
        ],
        priority: !data.hasWebsite ? 'high' : 'medium',
      },
      {
        id: 'competitor',
        title: 'Analyse Concurrentielle',
        content: data.competitorName && data.competitorScore
          ? `${data.competitorName} affiche un score de ${data.competitorScore}/100${gap && gap > 0 ? `, soit ${gap} points devant vous` : `, vous le dépassez de ${Math.abs(gap ?? 0)} points`}. ${gap && gap > 0 ? `Cet écart peut se combler en 3 à 6 semaines en travaillant les bons leviers.` : `Maintenez votre avance en continuant vos efforts hebdomadaires.`} Surveillez régulièrement ses nouveaux avis pour identifier ses stratégies.`
          : `Aucun concurrent principal défini. Identifiez vos 2-3 concurrents directs sur Google Maps et comparez leurs fiches avec la vôtre pour identifier les axes d'amélioration.`,
        insight: data.competitorScore
          ? `${data.competitorName} : ${data.competitorScore}/100 (écart : ${gap && gap > 0 ? `+${gap} en leur faveur` : `+${Math.abs(gap ?? 0)} en votre faveur`})`
          : 'Aucun concurrent suivi',
        actions: [
          data.competitorName ? `Analyser les 5 derniers avis de ${data.competitorName} pour comprendre ses points forts` : `Identifier vos 3 principaux concurrents sur Google Maps`,
          `Comparer vos horaires et services avec ceux du concurrent le mieux noté`,
          `Répliquer les bonnes pratiques de vos concurrents (photos, descriptions)`,
        ],
        priority: gap && gap > 10 ? 'high' : 'medium',
      },
      {
        id: 'content',
        title: 'Stratégie de Contenu',
        content: `Les publications Google Business (posts, offres, événements) sont sous-utilisées par la majorité des commerces locaux. Pourtant, elles apparaissent directement dans les résultats Google et génèrent des clics qualifiés. Une publication par semaine suffit pour maintenir une activité visible sur votre fiche.`,
        insight: 'Publications Google = trafic gratuit direct depuis Google',
        actions: [
          `Publier 1 post Google Business cette semaine (actualité, offre ou conseil)`,
          `Créer un post "Offre spéciale" si vous avez une promotion en cours`,
          `Répondre aux questions posées dans la section Q&R de votre fiche`,
        ],
        priority: 'medium',
      },
      {
        id: 'weekly',
        title: 'Actions Cette Semaine',
        content: `Basé sur votre analyse, voici les 3 actions à fort impact que vous devriez accomplir cette semaine. Chaque action a été sélectionnée pour maximiser le gain de points sur votre score local dans le minimum de temps.`,
        insight: `Potentiel : +5 à +12 points avec ces 3 actions`,
        actions: [
          `1. ${data.priorityWeakness} — Votre priorité n°1 absolue cette semaine`,
          `2. Répondre à tous vos avis Google sans réponse (moins de 30 minutes)`,
          `3. Ajouter 3 nouvelles photos de qualité sur votre fiche Google`,
        ],
        priority: 'critical',
      },
      {
        id: 'monthly',
        title: 'Plan 30 Jours',
        content: `En suivant ce plan sur 4 semaines, vous pouvez viser un score de ${Math.min(100, data.score + 12)}/100. Semaine 1 : ${data.priorityWeakness.toLowerCase()} + avis. Semaine 2 : photos + fiche complète. Semaine 3 : publication de contenu + réponses. Semaine 4 : consolidation + analyse des résultats.`,
        insight: `Objectif J+30 : ${Math.min(100, data.score + 12)}/100 (+${Math.min(100, data.score + 12) - data.score} pts)`,
        actions: [
          `Sem. 1 : Concentrez-vous sur ${data.priorityWeakness.toLowerCase()} + répondre aux avis`,
          `Sem. 2 : Enrichir votre fiche (photos, description, horaires)`,
          `Sem. 3 : Publier 2 posts Google + demander des avis clients`,
          `Sem. 4 : Analyser vos progrès et ajuster votre stratégie`,
        ],
        priority: 'medium',
      },
      {
        id: 'growth',
        title: 'Potentiel de Croissance',
        content: `${data.businessName} a un potentiel de croissance ${data.score < 50 ? 'fort' : data.score < 70 ? 'significatif' : 'modéré'}. Les établissements similaires dans votre catégorie atteignent en moyenne 75-80/100 après 3 mois d'optimisation active. Chaque point de score supplémentaire se traduit directement en plus de visibilité dans Google Maps et en davantage d'appels et demandes d'itinéraires.`,
        insight: `Potentiel estimé : ${Math.min(100, data.score + 25)}/100 en 3 mois`,
        actions: [
          `Activer le suivi hebdomadaire automatique pour mesurer vos progrès`,
          `Comparer votre score chaque lundi avec celui de la semaine précédente`,
          `Célébrer chaque milestone (+5 pts, +10 pts) pour maintenir la motivation`,
        ],
        priority: 'low',
      },
    ],
  }
}

export async function generateCoachMessage(data: CoachMessageData): Promise<CoachReport> {
  const delta = data.previousScore ? data.score - data.previousScore : 0
  const gap = data.competitorScore ? data.competitorScore - data.score : null
  const ratePercent = Math.round(data.responseRate * 100)

  const prompt = `Tu es un consultant marketing digital expert en référencement local avec 15 ans d'expérience. Tu génères des rapports premium pour des commerces et PME qui veulent dominer leur zone de chalandise sur Google.

DONNÉES CLIENT :
- Établissement : ${data.businessName} (${data.category})
- Score Local : ${data.score}/100${delta !== 0 ? ` (${delta > 0 ? '+' : ''}${delta} cette semaine)` : ''}
- Concurrent principal : ${data.competitorName && data.competitorScore ? `"${data.competitorName}" à ${data.competitorScore}/100 (écart : ${gap && gap > 0 ? `+${gap} en leur faveur` : `+${Math.abs(gap ?? 0)} en votre faveur`})` : 'Non défini'}
- Avis Google : ${data.googleReviewCount} avis · Note : ${data.googleRating}/5 · Taux de réponse : ${ratePercent}%
- Photos : ${data.googlePhotosCount}
- Site web : ${data.hasWebsite ? 'Oui' : 'Non'}
- Point faible prioritaire : ${data.priorityWeakness}

Génère EXACTEMENT le JSON suivant — 9 sections obligatoires, toutes en français, AUCUNE section manquante :

{
  "summary": "Message d'accroche 2-3 phrases max : personnalisé, basé sur les chiffres réels, motivant sans être creux",
  "priorityAction": "L'action #1 la plus impactante à faire CETTE SEMAINE — une seule phrase concrète",
  "generatedAt": "${new Date().toISOString()}",
  "sections": [
    {
      "id": "diagnostic",
      "title": "Diagnostic Express",
      "content": "Analyse de la situation globale du client : score, évolution, position vs concurrent (2-3 phrases personnalisées avec les vrais chiffres)",
      "insight": "Chiffre clé ou stat synthétique (ex: 'Score 71/100 · +3 pts · #2 local')",
      "actions": ["Action concrète 1", "Action concrète 2"],
      "priority": "high",
      "score": ${data.score}
    },
    {
      "id": "reviews",
      "title": "Stratégie Avis Google",
      "content": "Analyse des ${data.googleReviewCount} avis et note ${data.googleRating}/5. Taux de réponse ${ratePercent}%. Recommandations personnalisées (2-3 phrases)",
      "insight": "Stat clé sur les avis",
      "actions": ["Action avis 1", "Action avis 2", "Action avis 3"],
      "priority": "${data.googleReviewCount < 15 ? 'critical' : data.googleReviewCount < 30 ? 'high' : 'medium'}"
    },
    {
      "id": "photos",
      "title": "Présence Visuelle",
      "content": "Analyse des ${data.googlePhotosCount} photos. Impact sur la visibilité. Recommandations (2-3 phrases)",
      "insight": "Stat clé sur les photos",
      "actions": ["Action photo 1", "Action photo 2", "Action photo 3"],
      "priority": "${data.googlePhotosCount < 5 ? 'critical' : data.googlePhotosCount < 15 ? 'high' : 'medium'}"
    },
    {
      "id": "profile",
      "title": "Fiche Google Business",
      "content": "Analyse de la complétude de la fiche : site web (${data.hasWebsite ? 'présent' : 'absent'}), horaires, description. Recommandations (2-3 phrases)",
      "insight": "État de complétude estimé",
      "actions": ["Action profil 1", "Action profil 2"],
      "priority": "${!data.hasWebsite ? 'high' : 'medium'}"
    },
    {
      "id": "competitor",
      "title": "Analyse Concurrentielle",
      "content": "Analyse vs ${data.competitorName || 'le marché local'}. ${data.competitorScore ? `Écart de ${Math.abs(gap ?? 0)} points à combler.` : 'Positionnement sur le marché local.'} (2-3 phrases personnalisées)",
      "insight": "${data.competitorScore ? `vs ${data.competitorName} : ${data.competitorScore}/100` : 'Concurrence locale à analyser'}",
      "actions": ["Action concurrence 1", "Action concurrence 2", "Action concurrence 3"],
      "priority": "${gap && gap > 10 ? 'high' : 'medium'}"
    },
    {
      "id": "content",
      "title": "Stratégie de Contenu",
      "content": "Stratégie de publications Google Business pour ${data.businessName}. Fréquence, sujets, formats recommandés (2-3 phrases)",
      "insight": "Publications = trafic Google direct",
      "actions": ["Action contenu 1", "Action contenu 2", "Action contenu 3"],
      "priority": "medium"
    },
    {
      "id": "weekly",
      "title": "Actions Cette Semaine",
      "content": "Les 3 actions à fort ROI à accomplir cette semaine pour ${data.businessName} basées sur le diagnostic (2-3 phrases d'intro)",
      "insight": "Potentiel estimé de gain cette semaine",
      "actions": ["Action prioritaire 1", "Action prioritaire 2", "Action prioritaire 3"],
      "priority": "critical"
    },
    {
      "id": "monthly",
      "title": "Plan 30 Jours",
      "content": "Roadmap 4 semaines personnalisée pour atteindre le score cible. Semaine par semaine (2-3 phrases)",
      "insight": "Score cible J+30 estimé",
      "actions": ["Sem. 1 : ...", "Sem. 2 : ...", "Sem. 3 : ...", "Sem. 4 : ..."],
      "priority": "medium"
    },
    {
      "id": "growth",
      "title": "Potentiel de Croissance",
      "content": "Estimation du potentiel de croissance à 3 mois pour ${data.businessName} avec un plan d'action suivi (2-3 phrases)",
      "insight": "Score potentiel à 3 mois",
      "actions": ["Action croissance 1", "Action croissance 2", "Action croissance 3"],
      "priority": "low"
    }
  ]
}`

  try {
    const response = await getClient().messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = response.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')

    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')

    const parsed = JSON.parse(jsonMatch[0]) as CoachReport

    // Validate structure — must have 9 sections
    if (!parsed.summary || !parsed.priorityAction || !Array.isArray(parsed.sections) || parsed.sections.length < 9) {
      throw new Error('Invalid report structure')
    }

    return parsed
  } catch {
    return buildFallback(data)
  }
}
