import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const plan = (session.user as any).plan ?? 'FREE'

    const { searchParams } = new URL(req.url)
    const businessId = searchParams.get('businessId')

    const business = await prisma.business.findFirst({
      where: { id: businessId ?? undefined, userId },
      include: {
        analyses: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        competitors: { where: { isMain: true } },
        weeklyTasks: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    })

    if (!business) {
      return NextResponse.json({ error: 'Établissement introuvable' }, { status: 404 })
    }

    const analysis = business.analyses[0]
    if (!analysis) {
      return NextResponse.json({ error: 'Aucune analyse disponible' }, { status: 404 })
    }

    // Generate HTML report (PDF generation handled client-side)
    const reportData = {
      business: {
        name: business.name,
        address: business.address,
        city: business.city,
        category: business.category,
        website: business.website,
        phone: business.phone,
      },
      analysis: {
        score: analysis.score,
        previousScore: analysis.previousScore,
        scoreDelta: analysis.scoreDelta,
        googleRating: analysis.googleRating,
        googleReviewCount: analysis.googleReviewCount,
        googlePhotosCount: analysis.googlePhotosCount,
        hasWebsite: analysis.hasWebsite,
        coachMessage: analysis.coachMessage,
        priorityAction: analysis.priorityAction,
        weekInsights: analysis.weekInsights,
        createdAt: analysis.createdAt,
      },
      competitor: business.competitors[0] ?? null,
      isPremium: plan !== 'FREE',
    }

    return NextResponse.json(reportData)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
