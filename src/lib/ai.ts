import Anthropic from '@anthropic-ai/sdk'

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? 'sk-ant-placeholder-build' })
}

export async function generateCoachMessage(data: {
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
}): Promise<{ message: string; priorityAction: string }> {
  const scoreDelta = data.previousScore ? data.score - data.previousScore : 0
  const competitorGap = data.competitorScore ? data.competitorScore - data.score : null

  const prompt = `Tu es un coach expert en SEO local. Analyse la situation de ce commerce et donne un message de coaching percutant et actionnable.

Données :
- Établissement : ${data.businessName} (${data.category})
- Score Local : ${data.score}/100 ${scoreDelta !== 0 ? `(${scoreDelta > 0 ? '+' : ''}${scoreDelta} cette semaine)` : ''}
${data.competitorName && data.competitorScore ? `- Concurrent principal "${data.competitorName}" : ${data.competitorScore}/100 (écart : ${competitorGap! > 0 ? '+' : ''}${competitorGap} en faveur du concurrent)` : ''}
- Avis Google : ${data.googleReviewCount} avis (note : ${data.googleRating}/5)
- Photos : ${data.googlePhotosCount}
- Site web : ${data.hasWebsite ? 'Oui' : 'Non'}
- Taux de réponse aux avis : ${Math.round(data.responseRate * 100)}%
- Point faible principal : ${data.priorityWeakness}

Génère :
1. Un message de coaching court (3-4 phrases max) : direct, motivant, basé sur les données réelles, qui explique ce qui se passe et pourquoi.
2. Une action prioritaire : une seule phrase courte et précise sur l'action la plus importante à faire cette semaine.

Format JSON strict :
{
  "message": "...",
  "priorityAction": "..."
}`

  try {
    const response = await getClient().messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = response.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')

    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found in response')

    return JSON.parse(jsonMatch[0])
  } catch {
    return {
      message: `Votre score de ${data.score}/100 ${scoreDelta > 0 ? `a progressé de ${scoreDelta} points cette semaine` : 'nécessite des actions ciblées'}. ${data.competitorScore && competitorGap! > 0 ? `Votre concurrent est à ${competitorGap} points devant vous — cet écart est récupérable en quelques semaines.` : ''} Concentrez-vous sur votre point faible principal : ${data.priorityWeakness.toLowerCase()}.`,
      priorityAction: `Cette semaine, priorité absolue : améliorer votre ${data.priorityWeakness.toLowerCase()} pour gagner jusqu'à 8 points.`,
    }
  }
}

