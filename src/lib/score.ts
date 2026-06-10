import type { ScoreBreakdown, WeekTask, AlertItem, OnboardingData } from '@/types'

export function calculateLocalScore(data: {
  googleRating: number
  googleReviewCount: number
  googlePhotosCount: number
  googlePostsCount: number
  hasWebsite: boolean
  hasPhone: boolean
  hasHours: boolean
  hasDescription: boolean
  responseRate: number
  businessAgeMonths: number
}): { score: number; breakdown: ScoreBreakdown } {
  // Reviews + rating: max 30 pts
  const reviewCountScore = (Math.min(data.googleReviewCount, 200) / 200) * 20
  const ratingScore = data.googleRating >= 3 ? ((data.googleRating - 3) / 2) * 10 : 0
  const reviewScore = Math.min(30, Math.round(reviewCountScore + ratingScore))

  // Photos: max 20 pts
  const photosScore = Math.min(20, Math.round((Math.min(data.googlePhotosCount, 100) / 100) * 20))

  // Google profile completeness: max 15 pts
  const profileScore = Math.round(
    (data.hasWebsite ? 5 : 0) +
    (data.hasPhone ? 3 : 0) +
    (data.hasHours ? 4 : 0) +
    (data.hasDescription ? 3 : 0)
  )

  // Posts activity: max 10 pts
  const postsScore = Math.min(10, Math.round((Math.min(data.googlePostsCount, 12) / 12) * 10))

  // Response rate to reviews: max 15 pts
  const engagementScore = Math.min(15, Math.round(data.responseRate * 15))

  // Website presence: max 10 pts
  const websiteScore = data.hasWebsite ? 10 : 0

  const total = Math.min(100, reviewScore + photosScore + profileScore + postsScore + engagementScore + websiteScore)

  return {
    score: total,
    breakdown: {
      reviews: reviewScore,
      photos: photosScore,
      googleProfile: profileScore,
      posts: postsScore,
      engagement: engagementScore,
      website: websiteScore,
    },
  }
}

export function generateWeeklyTasks(
  score: number,
  data: {
    googleReviewCount: number
    googlePhotosCount: number
    googlePostsCount: number
    hasWebsite: boolean
    responseRate: number
  }
): WeekTask[] {
  const tasks: WeekTask[] = []

  let taskIdx = 0
  // Task based on response rate — most impactful first
  const unanswered = Math.max(0, Math.round(data.googleReviewCount * (1 - data.responseRate)))
  if (data.responseRate < 0.8) {
    const toAnswer = Math.min(unanswered, 5)
    tasks.push({
      id: `respond-${taskIdx++}`,
      title: `Répondre à ${toAnswer > 0 ? toAnswer : 3} avis clients`,
      description: unanswered > 0
        ? `Vous avez ${unanswered} avis sans réponse. Répondez à au moins ${toAnswer} cette semaine pour gagner en crédibilité.`
        : 'Maintenez un taux de réponse élevé. Répondez aux nouveaux avis sous 48h.',
      category: 'REVIEWS',
      impact: 5,
      isCompleted: false,
    })
  }

  // Task based on photos count
  if (data.googlePhotosCount < 50) {
    const photosNeeded = Math.max(1, Math.min(5, 50 - data.googlePhotosCount))
    tasks.push({
      id: `photos-${taskIdx++}`,
      title: `Ajouter ${photosNeeded} photo${photosNeeded > 1 ? 's' : ''} à votre fiche`,
      description: `Votre fiche a ${data.googlePhotosCount} photo${data.googlePhotosCount > 1 ? 's' : ''}. Les fiches avec 20+ photos obtiennent 35% plus de clics.`,
      category: 'PHOTOS',
      impact: 4,
      isCompleted: false,
    })
  }

  // Google Posts
  if (data.googlePostsCount < 4) {
    tasks.push({
      id: `post-${taskIdx++}`,
      title: 'Publier une actualité sur Google',
      description: 'Partagez une promotion, un événement ou une nouveauté. Les posts augmentent votre visibilité dans les résultats locaux.',
      category: 'POSTS',
      impact: 3,
      isCompleted: false,
    })
  }

  // Website
  if (!data.hasWebsite) {
    tasks.push({
      id: `website-${taskIdx++}`,
      title: 'Associer votre site web à votre fiche',
      description: 'Les établissements avec un site web ont un score de visibilité supérieur de 10 points en moyenne.',
      category: 'WEBSITE',
      impact: 10,
      isCompleted: false,
    })
  }

  // Gather more reviews
  if (data.googleReviewCount < 100) {
    const target = data.googleReviewCount < 20 ? 20 : data.googleReviewCount < 50 ? 50 : 100
    tasks.push({
      id: `reviews-${taskIdx++}`,
      title: `Obtenir de nouveaux avis (objectif : ${target})`,
      description: `Envoyez un lien Google Avis à vos clients récents. Vous avez ${data.googleReviewCount} avis — votre concurrent en a probablement davantage.`,
      category: 'REVIEWS',
      impact: 8,
      isCompleted: false,
    })
  }

  // Info verification
  tasks.push({
    id: `info-${taskIdx++}`,
    title: 'Vérifier vos horaires et coordonnées',
    description: 'Des informations incorrectes peuvent faire fuir des clients. Vérifiez horaires, adresse et numéro de téléphone.',
    category: 'INFO',
    impact: 2,
    isCompleted: false,
  })

  return tasks.slice(0, 5)
}

export function generateAlerts(data: {
  scoreDelta: number
  competitorScoreDelta?: number
  rating: number
  previousRating?: number
  reviewCount: number
  previousReviewCount?: number
}): AlertItem[] {
  const alerts: AlertItem[] = []
  const now = new Date().toISOString()
  let idx = 0

  if (data.competitorScoreDelta && data.competitorScoreDelta > 3) {
    alerts.push({
      id: `comp-${idx++}`,
      type: 'COMPETITOR_GAIN',
      title: 'Votre concurrent progresse',
      message: `Votre concurrent principal a gagné ${data.competitorScoreDelta} points. Consultez vos missions pour reprendre l'avantage.`,
      priority: 'HIGH',
      isRead: false,
      createdAt: now,
    })
  }

  if (data.scoreDelta < -3) {
    alerts.push({
      id: `drop-${idx++}`,
      type: 'RATING_DROP',
      title: 'Score en baisse de ' + Math.abs(data.scoreDelta) + ' pts',
      message: `Votre score a diminué. Cela peut indiquer un manque d'activité récente sur votre fiche ou de nouveaux avis négatifs.`,
      priority: 'URGENT',
      isRead: false,
      createdAt: now,
    })
  }

  if (data.previousRating && data.rating < data.previousRating && data.rating < 4.0) {
    alerts.push({
      id: `rating-${idx++}`,
      type: 'RATING_DROP',
      title: 'Note Google en baisse',
      message: `Votre note est passée à ${data.rating}/5. Répondez aux avis récents pour montrer votre engagement.`,
      priority: 'HIGH',
      isRead: false,
      createdAt: now,
    })
  }

  if (data.scoreDelta > 0) {
    alerts.push({
      id: `progress-${idx++}`,
      type: 'PROGRESS',
      title: `+${data.scoreDelta} point${data.scoreDelta > 1 ? 's' : ''} cette semaine`,
      message: `Vos actions portent leurs fruits. Continuez sur cette lancée pour dépasser vos concurrents.`,
      priority: 'LOW',
      isRead: false,
      createdAt: now,
    })
  }

  if (data.reviewCount < 20) {
    alerts.push({
      id: `quickwin-${idx++}`,
      type: 'QUICK_WIN',
      title: 'Gain rapide : demandez des avis',
      message: `Avec seulement ${data.reviewCount} avis, obtenir 5 nouveaux avis cette semaine peut vous faire gagner jusqu'à 6 points.`,
      priority: 'MEDIUM',
      isRead: false,
      createdAt: now,
    })
  } else {
    alerts.push({
      id: `quickwin-${idx++}`,
      type: 'QUICK_WIN',
      title: 'Gain rapide disponible',
      message: 'Ajouter 3 photos professionnelles cette semaine peut améliorer votre score de 2 à 4 points.',
      priority: 'MEDIUM',
      isRead: false,
      createdAt: now,
    })
  }

  return alerts
}

export function getLevel(xp: number): { level: number; name: string; progress: number; nextXp: number } {
  const levels = [
    { level: 1, name: 'Débutant', minXp: 0 },
    { level: 2, name: 'Actif', minXp: 100 },
    { level: 3, name: 'Confirmé', minXp: 300 },
    { level: 4, name: 'Expert', minXp: 600 },
    { level: 5, name: 'Champion', minXp: 1000 },
    { level: 6, name: 'Leader', minXp: 1500 },
    { level: 7, name: 'Elite', minXp: 2500 },
  ]

  let currentLevel = levels[0]
  let nextLevel = levels[1]

  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].minXp) {
      currentLevel = levels[i]
      nextLevel = levels[i + 1] || levels[levels.length - 1]
    }
  }

  const progress = nextLevel.minXp > currentLevel.minXp
    ? Math.round(((xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100)
    : 100

  return {
    level: currentLevel.level,
    name: currentLevel.name,
    progress: Math.min(100, progress),
    nextXp: nextLevel.minXp,
  }
}

// Fallback simulation when Google Places API is not configured
export function simulateBusinessData(data: OnboardingData) {
  const seed = (data.businessName.charCodeAt(0) + data.city.charCodeAt(0)) * 3 +
    data.businessName.length + data.city.length

  const reviewCount = 12 + (seed % 80)
  const rating = 3.9 + ((seed % 11) / 10)
  const photosCount = 6 + (seed % 30)
  const postsCount = seed % 6
  const responseRate = 0.25 + ((seed % 65) / 100)
  const businessAgeMonths = 18 + (seed % 48)

  return {
    googleRating: Math.round(Math.min(5, rating) * 10) / 10,
    googleReviewCount: reviewCount,
    googlePhotosCount: photosCount,
    googlePostsCount: postsCount,
    hasWebsite: !!data.website || seed % 3 !== 0,
    hasPhone: !!data.phone || seed % 4 !== 0,
    hasHours: seed % 6 !== 0,
    hasDescription: seed % 4 !== 0,
    responseRate: Math.round(responseRate * 100) / 100,
    businessAgeMonths,
  }
}

export function simulateCompetitorData(competitorName?: string, businessScore?: number) {
  if (!competitorName) return null

  const seed = competitorName.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 100

  const competitorReviews = 30 + (seed % 120)
  const competitorRating = 4.0 + ((seed % 9) / 10)
  const competitorPhotos = 15 + (seed % 50)
  const competitorPosts = 2 + (seed % 8)
  const competitorResponseRate = 0.5 + ((seed % 40) / 100)

  const { score } = calculateLocalScore({
    googleRating: Math.min(5, competitorRating),
    googleReviewCount: competitorReviews,
    googlePhotosCount: competitorPhotos,
    googlePostsCount: competitorPosts,
    hasWebsite: seed % 5 !== 0,
    hasPhone: true,
    hasHours: true,
    hasDescription: seed % 3 !== 0,
    responseRate: Math.min(1, competitorResponseRate),
    businessAgeMonths: 24 + (seed % 48),
  })

  return {
    name: competitorName,
    score,
    rating: Math.round(Math.min(5, competitorRating) * 10) / 10,
    reviewCount: competitorReviews,
    scoreDiff: score - (businessScore ?? 0),
  }
}
