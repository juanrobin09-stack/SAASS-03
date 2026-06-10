import type { User } from '@prisma/client'
import { prisma } from './prisma'

async function downgradeIfExpired(user: User): Promise<User> {
  if (
    user.plan !== 'FREE' &&
    user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd < new Date()
  ) {
    return prisma.user.update({
      where: { id: user.id },
      data: { plan: 'FREE', stripeSubscriptionId: null, stripePriceId: null, stripeCurrentPeriodEnd: null },
    })
  }
  return user
}

export async function getOrCreateUser(clerkId: string, email: string, name?: string | null) {
  const existing = await prisma.user.findUnique({ where: { clerkId } })

  if (!existing) {
    const user = await prisma.user.create({
      data: { clerkId, email, name: name ?? null },
    })
    return downgradeIfExpired(user)
  }

  // Keep user data in sync with Clerk on every authenticated request
  const needsUpdate =
    existing.email !== email ||
    (name != null && existing.name !== name)

  if (needsUpdate) {
    const updated = await prisma.user.update({
      where: { id: existing.id },
      data: {
        email,
        ...(name != null ? { name } : {}),
      },
    })
    return downgradeIfExpired(updated)
  }

  return downgradeIfExpired(existing)
}

export async function getUserByClerkId(clerkId: string) {
  const user = await prisma.user.findUnique({ where: { clerkId } })
  if (!user) return null
  return downgradeIfExpired(user)
}
