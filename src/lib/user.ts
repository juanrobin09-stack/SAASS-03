import { prisma } from './prisma'

export async function getOrCreateUser(clerkId: string, email: string, name?: string | null) {
  let user = await prisma.user.findUnique({ where: { clerkId } })

  if (!user) {
    user = await prisma.user.create({
      data: { clerkId, email, name: name ?? null },
    })
  }

  return user
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({ where: { clerkId } })
}
