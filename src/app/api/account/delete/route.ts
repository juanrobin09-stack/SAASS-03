export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function DELETE() {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { clerkId } })
    if (!user) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

    if (user.stripeSubscriptionId) {
      try { await stripe.subscriptions.cancel(user.stripeSubscriptionId) } catch {}
    }

    await prisma.user.delete({ where: { clerkId } })

    const { clerkClient } = await import('@clerk/nextjs/server')
    const client = await clerkClient()
    await client.users.deleteUser(clerkId)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
