import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ParametresClient } from './parametres-client'

export default async function ParametresPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const userId = (session.user as any).id
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, plan: true, password: true, stripeCustomerId: true, stripeCurrentPeriodEnd: true },
  })

  if (!user) redirect('/login')

  return (
    <ParametresClient
      user={{
        name: user.name ?? '',
        email: user.email,
        plan: user.plan,
        hasStripe: !!user.stripeCustomerId,
        hasPassword: !!user.password,
        periodEnd: user.stripeCurrentPeriodEnd?.toISOString(),
      }}
    />
  )
}
