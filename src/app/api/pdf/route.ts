import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getUserByClerkId } from '@/lib/user'

export async function GET(req: Request) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const user = await getUserByClerkId(clerkId)
    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

    const { searchParams } = new URL(req.url)
    const businessId = searchParams.get('businessId')

    const business = await prisma.business.findFirst({
      where: { id: businessId ?? undefined, userId: user.id },
      include: {
        analyses: { orderBy: { createdAt: 'desc' }, take: 1 },
        competitors: { where: { isMain: true } },
        weeklyTasks: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
    })

    if (!business || !business.analyses[0]) {
      return NextResponse.json({ error: 'Aucune analyse disponible' }, { status: 404 })
    }

    const analysis = business.analyses[0]

    return NextResponse.json({
      business: { name: business.name, address: business.address, city: business.city, category: business.category, website: business.website, phone: business.phone },
      analysis: {
        score: analysis.score, previousScore: analysis.previousScore, scoreDelta: analysis.scoreDelta,
        googleRating: analysis.googleRating, googleReviewCount: analysis.googleReviewCount,
        googlePhotosCount: analysis.googlePhotosCount, hasWebsite: analysis.hasWebsite,
        coachMessage: analysis.coachMessage, priorityAction: analysis.priorityAction,
        weekInsights: analysis.weekInsights, createdAt: analysis.createdAt,
      },
      competitor: business.competitors[0] ?? null,
      isPremium: user.plan !== 'FREE',
    })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
