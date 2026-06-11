export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Vercel function timeout ceiling (seconds)

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { runWeeklyScan, hasAnalysisToday } from '@/lib/scan'

/**
 * Weekly automatic re-scan for paying users.
 *
 * Triggered by Vercel Cron (see vercel.json) every Monday. Secured by CRON_SECRET:
 * Vercel automatically sends `Authorization: Bearer <CRON_SECRET>` on scheduled calls.
 * Can also be triggered manually with the same header for testing.
 *
 * Each business is scanned sequentially inside its own try/catch so one failure
 * never aborts the batch, and skipped if it was already scanned today (idempotent).
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET
  const authHeader = req.headers.get('authorization')

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const businesses = await prisma.business.findMany({
    where: {
      isActive: true,
      user: { plan: { in: ['PRO', 'BUSINESS'] } },
    },
  })

  const results = { total: businesses.length, scanned: 0, skipped: 0, failed: 0 }
  const errors: Array<{ businessId: string; error: string }> = []

  for (const business of businesses) {
    try {
      if (await hasAnalysisToday(business.id)) {
        results.skipped++
        continue
      }
      const scan = await runWeeklyScan(business)
      if (scan) {
        results.scanned++
      } else {
        results.skipped++
      }
      // Gentle pacing to stay under Google Places / Anthropic rate limits
      await new Promise(r => setTimeout(r, 250))
    } catch (err) {
      results.failed++
      errors.push({ businessId: business.id, error: err instanceof Error ? err.message : 'unknown' })
      console.error(`[weekly-scan] business ${business.id} failed:`, err)
    }
  }

  console.log('[weekly-scan] done', results)
  return NextResponse.json({ ok: true, ...results, errors })
}
