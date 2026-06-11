export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getUserByClerkId } from '@/lib/user'

/** Returns { done: true } if the user already has at least one analysis. */
export async function GET() {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ done: false })

    const user = await getUserByClerkId(clerkId)
    if (!user) return NextResponse.json({ done: false })

    const count = await prisma.analysis.count({
      where: { business: { userId: user.id } },
    })

    return NextResponse.json({ done: count > 0 })
  } catch {
    return NextResponse.json({ done: false })
  }
}
