export const dynamic = 'force-dynamic'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getUserByClerkId } from '@/lib/user'
import { ParametresClient } from './parametres-client'

export default async function ParametresPage() {
  const { userId: clerkId } = await auth()
  if (!clerkId) redirect('/login')

  const user = await getUserByClerkId(clerkId)
  if (!user) redirect('/onboarding')

  return (
    <ParametresClient
      user={{
        name: user.name ?? '',
        email: user.email,
        plan: user.plan,
        hasStripe: !!user.stripeCustomerId,
        periodEnd: user.stripeCurrentPeriodEnd?.toISOString(),
      }}
    />
  )
}
