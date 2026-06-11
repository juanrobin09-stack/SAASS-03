export const dynamic = 'force-dynamic'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getUserByClerkId } from '@/lib/user'
import { DashboardClient } from './dashboard-client'

export default async function DashboardPage() {
  const { userId: clerkId } = await auth()
  if (!clerkId) redirect('/login')

  const user = await getUserByClerkId(clerkId)
  if (!user) redirect('/onboarding')

  const business = await prisma.business.findFirst({
    where: { userId: user.id, isActive: true },
    include: {
      analyses: { orderBy: { createdAt: 'desc' }, take: 10 },
      competitors: { where: { isMain: true }, take: 1 },
      weeklyTasks: { orderBy: { createdAt: 'desc' }, take: 5 },
      alerts: { orderBy: { createdAt: 'desc' }, take: 5 },
    },
  })

  if (!business || business.analyses.length === 0) redirect('/onboarding')

  const latestAnalysis = business.analyses[0]
  const previousAnalysis = business.analyses[1]
  const competitor = business.competitors[0]
  const weekInsights = latestAnalysis.weekInsights as any

  const scoreHistory = [...business.analyses].reverse().map(a => ({
    date: a.createdAt.toISOString(),
    score: a.score,
    competitorScore: a.competitorScore ?? undefined,
  }))

  const userBadges = await prisma.userBadge.findMany({
    where: { userId: user.id },
    include: { badge: true },
    orderBy: { earnedAt: 'desc' },
  })

  return (
    <DashboardClient
      business={{ id: business.id, name: business.name, city: business.city, category: business.category }}
      analysis={{
        score: latestAnalysis.score,
        previousScore: previousAnalysis?.score,
        scoreDelta: latestAnalysis.scoreDelta ?? 0,
        breakdown: weekInsights?.breakdown ?? { reviews: 0, photos: 0, googleProfile: 0, posts: 0, engagement: 0, website: 0 },
        coachMessage: latestAnalysis.coachMessage ?? '',
        priorityAction: latestAnalysis.priorityAction ?? '',
        coachReport: (weekInsights?.coachReport ?? null) as import('@/types').CoachReport | null,
        xpPoints: latestAnalysis.xpPoints,
      }}
      competitor={competitor ? { name: competitor.name, score: competitor.score ?? 0, scoreDiff: (competitor.score ?? 0) - latestAnalysis.score } : null}
      tasks={business.weeklyTasks.map(t => ({ id: t.id, title: t.title, description: t.description ?? '', category: t.category, impact: t.impact, isCompleted: t.isCompleted }))}
      alerts={business.alerts.map(a => ({ id: a.id, type: a.type, title: a.title, message: a.message, priority: a.priority, isRead: a.isRead, createdAt: a.createdAt.toISOString() }))}
      scoreHistory={scoreHistory}
      badges={userBadges.map(ub => ({ slug: ub.badge.slug, name: ub.badge.name, icon: ub.badge.icon, color: ub.badge.color, earnedAt: ub.earnedAt.toISOString() }))}
    />
  )
}
