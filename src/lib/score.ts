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
  const reviewScore = Math.min(
    30,
    Math.round(
      (Math.min(data.googleReviewCount, 200) / 200) * 20 +
      ((data.googleRating - 3) / 2) * 10
    )
  )

  const photosScore = Math.min(
    20,
    Math.round((Math.min(data.googlePhotosCount, 100) / 100) * 20)
  )

  const profileScore = Math.round(
    (data.hasWebsite ? 5 : 0) +
    (data.hasPhone ? 3 : 0) +
    (data.hasHours ? 4 : 0) +
    (data.hasDescription ? 3 : 0)
  )

  const postsScore = Math.min(
    10,
    Math.round((Math.min(data.googlePostsCount, 12) / 12) * 10)
  )

  const engagementScore = Math.min(
    15,
    Math.round(data.responseRate * 15)
  )

  const websiteScore = data.hasWebsite ? 10 : 0

  const total = Math.min(
    100,
    reviewScore + photosScore + profileScore + postsScore + engagementScore + websiteScore
  )

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

  if (data.responseRate < 0.8) {
    tasks.push({
      id: 'respond-reviews',
      title: 'Répondre à vos avis clients',
      description: `Répondez à au moins 3 avis cette semaine pour améliorer votre taux de réponse`,
      category: 'REVIEWS',
      impact: 5,
      isCompleted: false,
    })
  }

  if (data.googlePhotosCount < 20) {
    tasks.push({
      id: 'add-photos',
      title: 'Ajouter des photos professionnelles',
      description: 'Publiez 3-5 nouvelles photos de votre établissement, produits ou équipe',
      category: 'PHOTOS',
      impact: 4,
      isCompleted: false,
    })
  }

  if (data.googlePostsCount < 4) {
    tasks.push({
      id: 'publish-post',
      title: 'Publier un post Google',
      description: 'Partagez une actualité, promotion ou événement sur votre fiche Google',
      category: 'POSTS',
      impact: 3,
      isCompleted: false,
    })
  }

  if (!data.hasWebsite) {
    tasks.push({
      id: 'create-website',
      title: 'Créer ou relier votre site web',
      description: 'Un site web augmente significativement votre score de visibilité locale',
      category: 'WEBSITE',
      impact: 10,
      isCompleted: false,
    })
  }

  if (data.googleReviewCount < 50) {
    tasks.push({
      id: 'get-reviews',
      title: 'Demander des avis à vos clients',
      description: 'Envoyez un lien Google Avis à vos 10 derniers clients satisfaits',
      category: 'REVIEWS',
      impact: 8,
      isCompleted: false,
    })
  }

  tasks.push({
    id: 'update-info',
    title: 'Vérifier vos informations',
    description: 'Confirmez que vos horaires et coordonnées sont à jour',
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

  if (data.competitorScoreDelta && data.competitorScoreDelta > 5) {
    alerts.push({
      id: 'comp-gain',
      type: 'COMPETITOR_GAIN',
      title: 'Votre concurrent progresse',
      message: `Votre concurrent principal a gagné ${data.competitorScoreDelta} points cette semaine. Agissez maintenant.`,
      priority: 'HIGH',
      isRead: false,
      createdAt: now,
    })
  }

  if (data.scoreDelta < -3) {
    alerts.push({
      id: 'score-drop',
      type: 'RATING_DROP',
      title: 'Votre score a baissé',
      message: `Votre score a diminué de ${Math.abs(data.scoreDelta)} points. Consultez vos missions pour corriger cela.`,
      priority: 'URGENT',
      isRead: false,
      createdAt: now,
    })
  }

  if (data.scoreDelta > 0) {
    alerts.push({
      id: 'progress',
      type: 'PROGRESS',
      title: 'Vous progressez !',
      message: `Votre score a augmenté de ${data.scoreDelta} point${data.scoreDelta > 1 ? 's' : ''} cette semaine. Continuez comme ça !`,
      priority: 'LOW',
      isRead: false,
      createdAt: now,
    })
  }

  alerts.push({
    id: 'quick-win',
    type: 'QUICK_WIN',
    title: 'Gain rapide disponible',
    message: 'Ajouter 3 photos cette semaine peut vous faire gagner jusqu\'à 4 points.',
    priority: 'MEDIUM',
    isRead: false,
    createdAt: now,
  })

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

export function simulateBusinessData(data: OnboardingData) {
  const seed = data.businessName.length + data.city.length

  const reviewCount = 15 + (seed % 150)
  const rating = 3.8 + ((seed % 12) / 10)
  const photosCount = 5 + (seed % 45)
  const postsCount = seed % 8
  const responseRate = 0.3 + ((seed % 70) / 100)
  const businessAgeMonths = 12 + (seed % 60)

  return {
    googleRating: Math.round(Math.min(5, rating) * 10) / 10,
    googleReviewCount: reviewCount,
    googlePhotosCount: photosCount,
    googlePostsCount: postsCount,
    hasWebsite: !!data.website || seed % 3 !== 0,
    hasPhone: !!data.phone || true,
    hasHours: true,
    hasDescription: seed % 4 !== 0,
    responseRate: Math.round(responseRate * 100) / 100,
    businessAgeMonths,
  }
}

export function simulateCompetitorData(competitorName?: string, businessScore?: number) {
  if (!competitorName) return null

  const seed = competitorName.length * 7

  const competitorReviews = 30 + (seed % 200)
  const competitorRating = 4.0 + ((seed % 10) / 10)
  const competitorPhotos = 20 + (seed % 80)
  const competitorPosts = 2 + (seed % 10)
  const competitorResponseRate = 0.5 + ((seed % 50) / 100)

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
