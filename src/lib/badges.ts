import { prisma } from './prisma'

/**
 * Evaluates and awards badges for a user based on their current state.
 * Self-contained: queries everything it needs, idempotent (unique constraint on
 * [userId, badgeId] + skipDuplicates). Safe to call after every analysis / scan.
 *
 * Returns the slugs newly awarded (empty if none).
 */
export async function awardBadges(userId: string): Promise<string[]> {
  // Latest analysis across the user's businesses
  const latest = await prisma.analysis.findFirst({
    where: { business: { userId } },
    orderBy: { createdAt: 'desc' },
  })
  if (!latest) return []

  const [analysisCount, completedTasks] = await Promise.all([
    prisma.analysis.count({ where: { business: { userId } } }),
    prisma.weeklyTask.count({ where: { business: { userId }, isCompleted: true } }),
  ])

  const beatCompetitor =
    latest.competitorScore != null && latest.score > latest.competitorScore

  const slugs: string[] = ['first-analysis']
  if (latest.score >= 70) slugs.push('score-70')
  if (latest.score >= 80) slugs.push('score-80')
  if (latest.score >= 90) slugs.push('score-90')
  if (beatCompetitor) slugs.push('beat-competitor')
  if (analysisCount >= 1) slugs.push('week-1')
  if (analysisCount >= 4) slugs.push('week-4')
  if (completedTasks >= 10) slugs.push('task-10')
  if (completedTasks >= 50) slugs.push('task-50')

  const badges = await prisma.badge.findMany({ where: { slug: { in: slugs } } })
  if (badges.length === 0) return []

  // Only create the ones not already earned
  const existing = await prisma.userBadge.findMany({
    where: { userId, badgeId: { in: badges.map(b => b.id) } },
    select: { badgeId: true },
  })
  const existingIds = new Set(existing.map(e => e.badgeId))
  const toCreate = badges.filter(b => !existingIds.has(b.id))
  if (toCreate.length === 0) return []

  await prisma.userBadge.createMany({
    data: toCreate.map(b => ({ userId, badgeId: b.id })),
    skipDuplicates: true,
  })

  return toCreate.map(b => b.slug)
}
