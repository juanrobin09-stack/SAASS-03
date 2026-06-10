export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret manquant' }, { status: 500 })
  }

  const headerPayload = headers()
  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id') ?? '',
    'svix-timestamp': headerPayload.get('svix-timestamp') ?? '',
    'svix-signature': headerPayload.get('svix-signature') ?? '',
  }

  const payload = await req.text()

  let event: any
  try {
    const wh = new Webhook(webhookSecret)
    event = wh.verify(payload, svixHeaders)
  } catch {
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
  }

  const { type, data } = event

  if (type === 'user.created') {
    const email = data.email_addresses?.[0]?.email_address
    const name = [data.first_name, data.last_name].filter(Boolean).join(' ') || null

    await prisma.user.upsert({
      where: { clerkId: data.id },
      create: { clerkId: data.id, email, name },
      update: { email, name },
    })
  }

  if (type === 'user.updated') {
    const email = data.email_addresses?.[0]?.email_address
    const name = [data.first_name, data.last_name].filter(Boolean).join(' ') || null

    await prisma.user.updateMany({
      where: { clerkId: data.id },
      data: { email, name },
    })
  }

  if (type === 'user.deleted') {
    await prisma.user.deleteMany({ where: { clerkId: data.id } })
  }

  return NextResponse.json({ received: true })
}
