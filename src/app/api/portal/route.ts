import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/lib/user'
import { createPortalSession } from '@/lib/stripe'

export async function POST() {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const user = await getUserByClerkId(clerkId)
    if (!user?.stripeCustomerId) return NextResponse.json({ error: 'Aucun abonnement actif' }, { status: 400 })

    const session = await createPortalSession(user.stripeCustomerId)
    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
