export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  taskId: z.string(),
  completed: z.boolean(),
})

export async function PATCH(req: Request) {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { taskId, completed } = schema.parse(await req.json())

    const user = await prisma.user.findUnique({ where: { clerkId } })
    if (!user) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

    const task = await prisma.weeklyTask.findFirst({
      where: { id: taskId },
      include: { business: { select: { userId: true } } },
    })

    if (!task || task.business.userId !== user.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    }

    await prisma.weeklyTask.update({
      where: { id: taskId },
      data: {
        isCompleted: completed,
        completedAt: completed ? new Date() : null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
