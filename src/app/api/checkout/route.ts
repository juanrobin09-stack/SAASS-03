import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe, createCheckoutSession } from '@/lib/stripe'
import { z } from 'zod'

const schema = z.object({
  plan: z.enum(['PRO', 'BUSINESS']),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()
    const { plan } = schema.parse(body)

    const priceId = plan === 'PRO'
      ? process.env.STRIPE_PRO_PRICE_ID
      : process.env.STRIPE_BUSINESS_PRICE_ID

    if (!priceId) {
      return NextResponse.json({ error: 'Plan non configuré' }, { status: 500 })
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

    const checkoutSession = await createCheckoutSession(userId, priceId, user.stripeCustomerId ?? undefined)

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Erreur lors de la création de la session' }, { status: 500 })
  }
}
