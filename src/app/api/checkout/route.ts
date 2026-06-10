import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { z } from 'zod'
import { getOrCreateUser } from '@/lib/user'
import { createCheckoutSession } from '@/lib/stripe'

const schema = z.object({ plan: z.enum(['PRO', 'BUSINESS']) })

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const clerkUser = await currentUser()
    const email = clerkUser?.emailAddresses[0]?.emailAddress ?? ''
    const user = await getOrCreateUser(clerkId, email)

    const { plan } = schema.parse(await req.json())
    const priceId = plan === 'PRO' ? process.env.STRIPE_PRO_PRICE_ID : process.env.STRIPE_BUSINESS_PRICE_ID

    if (!priceId) return NextResponse.json({ error: 'Plan non configuré' }, { status: 500 })

    const session = await createCheckoutSession(user.id, priceId, user.stripeCustomerId ?? undefined)
    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
