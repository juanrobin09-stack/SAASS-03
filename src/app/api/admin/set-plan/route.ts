export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  email: z.string().email(),
  plan: z.enum(['FREE', 'PRO']),
  secret: z.string(),
})

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json())

    const adminSecret = process.env.ADMIN_SECRET
    if (!adminSecret || body.secret !== adminSecret) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } })
    if (!user) {
      return NextResponse.json({ error: `Utilisateur ${body.email} introuvable` }, { status: 404 })
    }

    await prisma.user.update({
      where: { email: body.email },
      data: {
        plan: body.plan,
        stripeCurrentPeriodEnd: body.plan === 'PRO'
          ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          : null,
      },
    })

    return NextResponse.json({ ok: true, email: body.email, plan: body.plan })
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }
}
