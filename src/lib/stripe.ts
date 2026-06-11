import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_placeholder_build', {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

export const PLANS = {
  FREE: {
    id: 'FREE' as const,
    name: 'Gratuit',
    price: 0,
    priceId: null,
    features: [
      '1 analyse complète',
      'Score Local IA',
      'Comparaison concurrentielle',
      'Rapport PDF basique',
    ],
    limitations: [
      'Pas de suivi hebdomadaire',
      'Pas d\'historique',
      'Pas de coach IA',
    ],
  },
  PRO: {
    id: 'PRO' as const,
    name: 'Pro',
    price: 19,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      '1 établissement',
      'Score vivant mis à jour',
      'Suivi hebdomadaire',
      'Historique complet',
      'Export PDF premium',
      'Coach IA personnalisé',
      'Alertes intelligentes',
      'Missions de la semaine',
      'Gamification & badges',
    ],
    highlighted: true,
  },
}

export async function createCheckoutSession(userId: string, priceId: string, customerId?: string) {
  const session = await stripe.checkout.sessions.create({
    ...(customerId ? { customer: customerId } : {}),
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgrade=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: { userId },
    subscription_data: {
      metadata: { userId },
    },
  })
  return session
}

export async function createPortalSession(customerId: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/parametres`,
  })
}
