import type { Business } from '@prisma/client'
import { prisma } from './prisma'
import {
  calculateLocalScore,
  generateWeeklyTasks,
  generateAlerts,
  simulateBusinessData,
} from './score'
import { generateCoachMessage } from './ai'
import { getPlaceByIdForScoring, searchBusiness, searchNearbyCompetitors } from './google-places'
import { awardBadges } from './badges'

export interface ScanResult {
  businessId: string
  score: number
  scoreDelta: number
  dataSource: 'google' | 'simulated'
}

/**
 * Re-scans an existing business: refreshes Google data (or simulation),
 * recomputes the score, regenerates competitor / coach / tasks / alerts,
 * and persists a new Analysis. Shared by the manual flow and the weekly cron.
 *
 * Returns null if the business has no usable identity to scan.
 */
export async function runWeeklyScan(business: Business): Promise<ScanResult | null> {
  // — 1. Refresh business data —
  let businessData: Parameters<typeof calculateLocalScore>[0] | undefined
  let realPlace = null
  let dataSource: 'google' | 'simulated' = 'simulated'

  if (process.env.GOOGLE_PLACES_API_KEY) {
    // Prefer direct placeId lookup for accuracy (faster + exact match)
    if (business.placeId) {
      realPlace = await getPlaceByIdForScoring(business.placeId)
    }
    if (!realPlace) {
      realPlace = await searchBusiness(business.name, business.city)
    }
    if (realPlace) {
      dataSource = 'google'
      businessData = {
        googleRating: realPlace.rating,
        googleReviewCount: realPlace.reviewCount,
        googlePhotosCount: Math.max(realPlace.photosCount, 0),
        googlePostsCount: 0,
        hasWebsite: realPlace.hasWebsite || !!business.website,
        hasPhone: realPlace.hasPhone || !!business.phone,
        hasHours: realPlace.hasHours,
        hasDescription: true,
        responseRate: 0.4,
        businessAgeMonths: 24,
      }
      // Keep stored coordinates fresh for competitor lookups
      if (!business.placeId && realPlace.placeId) {
        await prisma.business.update({
          where: { id: business.id },
          data: { placeId: realPlace.placeId, lat: realPlace.lat, lng: realPlace.lng },
        })
        business = { ...business, placeId: realPlace.placeId, lat: realPlace.lat, lng: realPlace.lng }
      }
    }
  }

  if (!businessData) {
    // Simulated fallback with a small weekly drift so the score evolves over time
    const base = simulateBusinessData({
      businessName: business.name,
      city: business.city,
      category: business.category,
      address: business.address,
      website: business.website ?? undefined,
      phone: business.phone ?? undefined,
    })
    const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
    const drift = (weekIndex + business.name.length) % 5 // 0–4 extra reviews/photos
    businessData = {
      ...base,
      googleReviewCount: base.googleReviewCount + drift,
      googlePhotosCount: base.googlePhotosCount + (drift % 3),
    }
  }

  const { score, breakdown } = calculateLocalScore(businessData)

  const lastAnalysis = await prisma.analysis.findFirst({
    where: { businessId: business.id },
    orderBy: { createdAt: 'desc' },
  })
  const scoreDelta = lastAnalysis ? score - lastAnalysis.score : 0

  // — 2. Competitor (real Google data only; keep previous otherwise) —
  let competitor: { name: string; score: number; rating: number; reviewCount: number; scoreDiff: number } | null = null

  const scanLat = realPlace?.lat ?? business.lat
  const scanLng = realPlace?.lng ?? business.lng
  if (process.env.GOOGLE_PLACES_API_KEY && scanLat && scanLng) {
    const lat = scanLat
    const lng = scanLng
    const nearby = await searchNearbyCompetitors(business.category, lat, lng, business.placeId ?? undefined)
    const top = nearby
      .filter(c => c.name !== business.name)
      .sort((a, b) => (b.rating * Math.log(b.reviewCount + 1)) - (a.rating * Math.log(a.reviewCount + 1)))[0]
    if (top) {
      const compData = calculateLocalScore({
        googleRating: top.rating,
        googleReviewCount: top.reviewCount,
        googlePhotosCount: top.photosCount,
        googlePostsCount: 0,
        hasWebsite: top.hasWebsite,
        hasPhone: top.hasPhone,
        hasHours: top.hasHours,
        hasDescription: true,
        responseRate: 0.6,
        businessAgeMonths: 36,
      })
      competitor = { name: top.name, score: compData.score, rating: top.rating, reviewCount: top.reviewCount, scoreDiff: compData.score - score }
    }
  }

  // Fallback: reuse the previously stored main competitor so the dashboard stays populated
  if (!competitor) {
    const existing = await prisma.competitor.findFirst({ where: { businessId: business.id, isMain: true } })
    if (existing) {
      competitor = {
        name: existing.name,
        score: existing.score ?? 0,
        rating: existing.rating ?? 0,
        reviewCount: existing.reviewCount ?? 0,
        scoreDiff: (existing.score ?? 0) - score,
      }
    }
  }

  if (competitor) {
    await prisma.competitor.upsert({
      where: { id: `${business.id}-main` },
      create: { id: `${business.id}-main`, businessId: business.id, name: competitor.name, score: competitor.score, rating: competitor.rating, reviewCount: competitor.reviewCount, isMain: true },
      update: { score: competitor.score, rating: competitor.rating, reviewCount: competitor.reviewCount, name: competitor.name },
    })
  }

  // — 3. Coach message —
  const weaknesses = [
    { key: 'reviews', value: breakdown.reviews, max: 30 },
    { key: 'photos', value: breakdown.photos, max: 20 },
    { key: 'googleProfile', value: breakdown.googleProfile, max: 15 },
    { key: 'posts', value: breakdown.posts, max: 10 },
  ]
  const priorityWeakness = [...weaknesses].sort((a, b) => (a.value / a.max) - (b.value / b.max))[0]
  const weaknessLabels: Record<string, string> = {
    reviews: 'Avis Google', photos: 'Photos', googleProfile: 'Fiche Google', posts: 'Publications Google',
  }

  const coachReport = await generateCoachMessage({
    businessName: business.name,
    category: business.category,
    score,
    previousScore: lastAnalysis?.score,
    competitorName: competitor?.name,
    competitorScore: competitor?.score,
    googleReviewCount: businessData.googleReviewCount,
    googleRating: businessData.googleRating,
    googlePhotosCount: businessData.googlePhotosCount,
    hasWebsite: businessData.hasWebsite,
    responseRate: businessData.responseRate,
    priorityWeakness: weaknessLabels[priorityWeakness.key],
  })
  const coachMessage = coachReport.summary
  const priorityAction = coachReport.priorityAction

  // — 4. Tasks + alerts —
  const tasks = generateWeeklyTasks(score, businessData)
  const alerts = generateAlerts({
    scoreDelta,
    rating: businessData.googleRating,
    reviewCount: businessData.googleReviewCount,
  })

  const xpGain = 50 + (scoreDelta > 0 ? scoreDelta * 5 : 0)
  const totalXp = (lastAnalysis?.xpPoints ?? 0) + xpGain

  // — 5. Persist —
  await prisma.alert.deleteMany({ where: { businessId: business.id } })
  for (const alert of alerts) {
    await prisma.alert.create({
      data: { businessId: business.id, type: alert.type, title: alert.title, message: alert.message, priority: alert.priority, isRead: false },
    })
  }

  await prisma.analysis.create({
    data: {
      businessId: business.id,
      score, previousScore: lastAnalysis?.score, scoreDelta,
      googleRating: businessData.googleRating,
      googleReviewCount: businessData.googleReviewCount,
      googlePhotosCount: businessData.googlePhotosCount,
      googlePostsCount: businessData.googlePostsCount,
      hasWebsite: businessData.hasWebsite, hasPhone: businessData.hasPhone,
      hasHours: businessData.hasHours, hasDescription: businessData.hasDescription,
      responseRate: businessData.responseRate,
      competitorScore: competitor?.score, competitorName: competitor?.name, scoreDiff: competitor?.scoreDiff,
      coachMessage, priorityAction, xpPoints: totalXp,
      weekInsights: { breakdown, dataSource, coachReport } as any,
    },
  })

  // Replace this week's tasks
  const weekOf = new Date()
  weekOf.setHours(0, 0, 0, 0)
  weekOf.setDate(weekOf.getDate() - weekOf.getDay() + 1)
  await prisma.weeklyTask.deleteMany({ where: { businessId: business.id, weekOf } })
  for (const task of tasks) {
    await prisma.weeklyTask.create({
      data: { businessId: business.id, title: task.title, description: task.description || '', category: task.category, impact: task.impact, weekOf },
    })
  }

  // Award any newly earned badges (idempotent)
  await awardBadges(business.userId)

  return { businessId: business.id, score, scoreDelta, dataSource }
}

/** True if an analysis was already created for this business today (idempotency guard). */
export async function hasAnalysisToday(businessId: string): Promise<boolean> {
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)
  const count = await prisma.analysis.count({
    where: { businessId, createdAt: { gte: startOfDay } },
  })
  return count > 0
}
