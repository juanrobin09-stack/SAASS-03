export const dynamic = 'force-dynamic'
export const maxDuration = 60

import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getUserByClerkId } from '@/lib/user'
import { runWeeklyScan } from '@/lib/scan'

/**
 * Manual on-demand re-scan, triggered from the dashboard "Nouvelle analyse" button.
 * Reserved for paying plans — FREE users keep their single onboarding analysis.
 */
export async function POST() {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const user = await getUserByClerkId(clerkId)
    if (!user) return NextResponse.json({ error: 'Compte introuvable' }, { status: 404 })

    if (user.plan === 'FREE') {
      return NextResponse.json(
        { error: 'Le re-scan à la demande est réservé au plan Pro.', upgrade: true },
        { status: 403 }
      )
    }

    const business = await prisma.business.findFirst({
      where: { userId: user.id, isActive: true },
      orderBy: { createdAt: 'desc' },
    })
    if (!business) return NextResponse.json({ error: 'Aucun établissement à analyser' }, { status: 404 })

    const result = await runWeeklyScan(business)
    if (!result) return NextResponse.json({ error: 'Analyse impossible' }, { status: 500 })

    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    console.error('[rescan]', err)
    return NextResponse.json({ error: 'Erreur lors de l\'analyse' }, { status: 500 })
  }
}
