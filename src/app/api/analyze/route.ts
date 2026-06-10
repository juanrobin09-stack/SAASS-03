export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getOrCreateUser } from '@/lib/user'
import {
  calculateLocalScore,
  generateWeeklyTasks,
  generateAlerts,
  simulateBusinessData,
  simulateCompetitorData,
} from '@/lib/score'
import { generateCoachMessage } from '@/lib/ai'

const schema = z.object({
  businessName: z.string().min(2),
  address: z.string().min(0),
  city: z.string().min(2),
  category: z.string().min(2),
  website: z.string().optional(),
  phone: z.string().optional(),
  competitorName: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const clerkUser = await currentUser()
    const email = clerkUser?.emailAddresses[0]?.emailAddress ?? ''
    const name = [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(' ') || null

    const user = await getOrCreateUser(clerkId, email, name)

    if (user.plan === 'FREE') {
      const existingAnalyses = await prisma.analysis.count({
        where: { business: { userId: user.id } },
      })
      if (existingAnalyses >= 1) {
        return NextResponse.json(
          { error: 'Limite du plan gratuit atteinte. Passez au plan Pro pour continuer.' },
          { status: 403 }
        )
      }
    }

    const body = await req.json()
    const data = schema.parse(body)

    const businessData = simulateBusinessData(data)
    const { score, breakdown } = calculateLocalScore(businessData)

    let business = await prisma.business.findFirst({
      where: { userId: user.id, name: { contains: data.businessName, mode: 'insensitive' } },
    })

    if (!business) {
      business = await prisma.business.create({
        data: {
          userId: user.id,
          name: data.businessName,
          address: data.address,
          city: data.city,
          category: data.category,
          website: data.website,
          phone: data.phone,
        },
      })
    }

    const lastAnalysis = await prisma.analysis.findFirst({
      where: { businessId: business.id },
      orderBy: { createdAt: 'desc' },
    })

    const scoreDelta = lastAnalysis ? score - lastAnalysis.score : 0
    const competitor = simulateCompetitorData(data.competitorName, score)

    if (competitor) {
      await prisma.competitor.upsert({
        where: { id: `${business.id}-main` },
        create: {
          id: `${business.id}-main`,
          businessId: business.id,
          name: competitor.name,
          score: competitor.score,
          rating: competitor.rating,
          reviewCount: competitor.reviewCount,
          isMain: true,
        },
        update: { score: competitor.score, rating: competitor.rating, reviewCount: competitor.reviewCount },
      })
    }

    const weaknesses = [
      { key: 'reviews', value: breakdown.reviews, max: 30 },
      { key: 'photos', value: breakdown.photos, max: 20 },
      { key: 'googleProfile', value: breakdown.googleProfile, max: 15 },
      { key: 'posts', value: breakdown.posts, max: 10 },
    ]
    const priorityWeakness = weaknesses.sort((a, b) => (a.value / a.max) - (b.value / b.max))[0]
    const weaknessLabels: Record<string, string> = {
      reviews: 'Avis Google', photos: 'Photos', googleProfile: 'Fiche Google', posts: 'Publications Google',
    }

    const { message: coachMessage, priorityAction } = await generateCoachMessage({
      businessName: data.businessName,
      category: data.category,
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

    const tasks = generateWeeklyTasks(score, businessData)
    const alerts = generateAlerts({ scoreDelta, rating: businessData.googleRating, reviewCount: businessData.googleReviewCount })

    const xpGain = 50 + (scoreDelta > 0 ? scoreDelta * 5 : 0)
    const totalXp = (lastAnalysis?.xpPoints ?? 0) + xpGain

    const analysis = await prisma.analysis.create({
      data: {
        businessId: business.id,
        score, previousScore: lastAnalysis?.score, scoreDelta,
        googleRating: businessData.googleRating, googleReviewCount: businessData.googleReviewCount,
        googlePhotosCount: businessData.googlePhotosCount, googlePostsCount: businessData.googlePostsCount,
        hasWebsite: businessData.hasWebsite, hasPhone: businessData.hasPhone,
        hasHours: businessData.hasHours, hasDescription: businessData.hasDescription,
        responseRate: businessData.responseRate,
        competitorScore: competitor?.score, competitorName: competitor?.name, scoreDiff: competitor?.scoreDiff,
        coachMessage, priorityAction, xpPoints: totalXp,
        weekInsights: { breakdown, tasks, alerts } as any,
      },
    })

    const weekOf = new Date()
    weekOf.setHours(0, 0, 0, 0)
    weekOf.setDate(weekOf.getDate() - weekOf.getDay() + 1)

    for (const task of tasks) {
      await prisma.weeklyTask.create({
        data: { businessId: business.id, title: task.title, description: task.description || '', category: task.category, impact: task.impact, weekOf },
      })
    }

    return NextResponse.json({
      analysisId: analysis.id, businessId: business.id,
      score, previousScore: lastAnalysis?.score, scoreDelta,
      breakdown, googleRating: businessData.googleRating, googleReviewCount: businessData.googleReviewCount,
      googlePhotosCount: businessData.googlePhotosCount, hasWebsite: businessData.hasWebsite,
      competitor, coachMessage, priorityAction, tasks, alerts, xpPoints: totalXp,
    })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'analyse' }, { status: 500 })
  }
}
