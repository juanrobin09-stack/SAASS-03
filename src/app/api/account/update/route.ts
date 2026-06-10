export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  name: z.string().min(2).max(50).optional(),
})

export async function PATCH(req: Request) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { name } = schema.parse(await req.json())
    if (!name) return NextResponse.json({ error: 'Aucune modification' }, { status: 400 })

    await prisma.user.update({
      where: { clerkId },
      data: { name },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
