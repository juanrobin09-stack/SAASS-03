export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) return NextResponse.json({ suggestions: [] })

  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) return NextResponse.json({ suggestions: [] })

  try {
    const res = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
      body: JSON.stringify({
        input: q,
        includedRegionCodes: ['fr'],
        includedPrimaryTypes: ['establishment'],
        languageCode: 'fr',
      }),
    })

    if (!res.ok) return NextResponse.json({ suggestions: [] })

    const data = await res.json()
    const suggestions = (data.suggestions ?? []).map((s: any) => ({
      placeId: s.placePrediction?.placeId,
      mainText: s.placePrediction?.structuredFormat?.mainText?.text ?? '',
      secondaryText: s.placePrediction?.structuredFormat?.secondaryText?.text ?? '',
    })).filter((s: any) => s.placeId && s.mainText)

    return NextResponse.json({ suggestions })
  } catch {
    return NextResponse.json({ suggestions: [] })
  }
}
