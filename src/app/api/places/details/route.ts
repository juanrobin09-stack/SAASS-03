export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

const GOOGLE_TYPE_TO_CATEGORY: Record<string, string> = {
  restaurant: 'Restaurant',
  cafe: 'Bar / Café',
  bar: 'Bar / Café',
  bakery: 'Boulangerie / Pâtisserie',
  hair_care: 'Coiffeur / Salon de beauté',
  beauty_salon: 'Coiffeur / Salon de beauté',
  doctor: 'Médecin / Cabinet médical',
  dentist: 'Dentiste',
  pharmacy: 'Pharmacie',
  car_repair: 'Garage / Auto',
  clothing_store: 'Boutique de vêtements',
  lodging: 'Hôtel',
  supermarket: 'Supermarché / Épicerie',
  grocery_store: 'Supermarché / Épicerie',
  real_estate_agency: 'Agence immobilière',
  lawyer: 'Avocat / Notaire',
  gym: 'Gym / Salle de sport',
  veterinary_care: 'Vétérinaire',
  florist: 'Fleuriste',
  plumber: 'Plombier / Électricien',
  electrician: 'Plombier / Électricien',
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const placeId = searchParams.get('placeId')

  if (!placeId) return NextResponse.json({ error: 'placeId requis' }, { status: 400 })

  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'API non configurée' }, { status: 500 })

  try {
    const fields = 'id,displayName,formattedAddress,addressComponents,nationalPhoneNumber,websiteUri,types'
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fields,
        'Accept-Language': 'fr',
      },
    })

    if (!res.ok) return NextResponse.json({ error: 'Lieu introuvable' }, { status: 404 })

    const place = await res.json()

    const city = place.addressComponents?.find((c: any) =>
      c.types?.includes('locality')
    )?.longText ?? ''

    const guessedCategory = place.types?.map((t: string) => GOOGLE_TYPE_TO_CATEGORY[t]).find(Boolean) ?? ''

    return NextResponse.json({
      name: place.displayName?.text ?? '',
      address: place.formattedAddress ?? '',
      city,
      phone: place.nationalPhoneNumber ?? '',
      website: place.websiteUri ?? '',
      category: guessedCategory,
    })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
