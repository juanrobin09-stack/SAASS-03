export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const getPlanFromPriceId = (priceId: string): 'PRO' | null => {
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return 'PRO'
  return null
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      // Guard: require both userId and a subscription reference
      if (!userId || !session.subscription) break

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
      const priceId = subscription.items.data[0].price.id
      const plan = getPlanFromPriceId(priceId) ?? 'PRO'

      await prisma.user.update({
        where: { id: userId },
        data: {
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId: priceId,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          plan,
        },
      })
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      const subscriptionId = invoice.subscription as string
      const customerId = invoice.customer as string
      if (!subscriptionId) break

      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const priceId = subscription.items.data[0].price.id
      const plan = getPlanFromPriceId(priceId) ?? 'PRO'
      const data = {
        plan,
        stripePriceId: priceId,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }

      // Try by subscriptionId first (renewals); fall back to customerId (race: first payment
      // may arrive before checkout.session.completed sets stripeSubscriptionId)
      const bySubscription = await prisma.user.updateMany({
        where: { stripeSubscriptionId: subscriptionId },
        data,
      })
      if (bySubscription.count === 0 && customerId) {
        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: { ...data, stripeSubscriptionId: subscriptionId },
        })
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await prisma.user.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: {
          plan: 'FREE',
          stripeSubscriptionId: null,
          stripePriceId: null,
          stripeCurrentPeriodEnd: null,
        },
      })
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const priceId = subscription.items.data[0].price.id
      const plan = getPlanFromPriceId(priceId)

      if (subscription.status === 'active' && plan) {
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            plan,
            stripePriceId: priceId,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        })
      } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
        // Subscription cancelled mid-period or payment failed → downgrade immediately
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            plan: 'FREE',
            stripeSubscriptionId: null,
            stripePriceId: null,
            stripeCurrentPeriodEnd: null,
          },
        })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
