const PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY
const BASE = 'https://places.googleapis.com/v1'

export interface PlaceData {
  placeId: string
  name: string
  rating: number
  reviewCount: number
  photosCount: number
  hasWebsite: boolean
  hasPhone: boolean
  hasHours: boolean
  website?: string
  phone?: string
  lat: number
  lng: number
  address: string
}

const CATEGORY_TO_TYPE: Record<string, { types: string[]; radius: number }> = {
  'Restaurant':                    { types: ['restaurant'],                          radius: 1500 },
  'Boulangerie / Pâtisserie':      { types: ['bakery'],                              radius: 1500 },
  'Coiffeur / Salon de beauté':    { types: ['hair_care', 'beauty_salon'],           radius: 2000 },
  'Hôtel':                         { types: ['lodging'],                             radius: 5000 },
  'Pharmacie':                     { types: ['pharmacy', 'drugstore'],               radius: 3000 },
  'Médecin / Cabinet médical':     { types: ['doctor'],                              radius: 3000 },
  'Dentiste':                      { types: ['dentist'],                             radius: 3000 },
  'Garage / Auto':                 { types: ['car_repair'],                          radius: 5000 },
  'Supermarché / Épicerie':        { types: ['supermarket', 'grocery_store'],        radius: 3000 },
  'Gym / Salle de sport':          { types: ['gym'],                                 radius: 5000 },
  'Agence immobilière':            { types: ['real_estate_agency'],                  radius: 3000 },
  'Avocat / Notaire':              { types: ['lawyer'],                              radius: 5000 },
  'Vétérinaire':                   { types: ['veterinary_care'],                     radius: 5000 },
  'Bar / Café':                    { types: ['bar', 'cafe'],                         radius: 1500 },
  'Boutique de vêtements':         { types: ['clothing_store'],                      radius: 2000 },
  'Plombier / Électricien':        { types: ['plumber', 'electrician'],              radius: 10000 },
  'Fleuriste':                     { types: ['florist'],                             radius: 5000 },
}

function parsePlaceResult(place: any): PlaceData {
  return {
    placeId: place.id ?? '',
    name: place.displayName?.text ?? '',
    rating: place.rating ?? 0,
    reviewCount: place.userRatingCount ?? 0,
    photosCount: place.photos?.length ?? 0,
    hasWebsite: !!place.websiteUri,
    hasPhone: !!place.nationalPhoneNumber,
    hasHours: !!(place.regularOpeningHours?.periods?.length),
    website: place.websiteUri,
    phone: place.nationalPhoneNumber,
    lat: place.location?.latitude ?? 0,
    lng: place.location?.longitude ?? 0,
    address: place.formattedAddress ?? '',
  }
}

export async function getPlaceByIdForScoring(placeId: string): Promise<PlaceData | null> {
  if (!PLACES_API_KEY || !placeId) return null
  try {
    const res = await fetch(`${BASE}/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': PLACES_API_KEY,
        'X-Goog-FieldMask': [
          'id', 'displayName', 'rating', 'userRatingCount',
          'photos', 'websiteUri', 'nationalPhoneNumber',
          'regularOpeningHours', 'location', 'formattedAddress',
        ].join(','),
      },
    })
    if (!res.ok) return null
    const place = await res.json()
    if (!place.id) return null
    return parsePlaceResult({ ...place, id: placeId })
  } catch {
    return null
  }
}

export async function searchBusiness(name: string, city: string): Promise<PlaceData | null> {
  if (!PLACES_API_KEY) return null

  try {
    const res = await fetch(`${BASE}/places:searchText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': PLACES_API_KEY,
        'X-Goog-FieldMask': [
          'places.id', 'places.displayName', 'places.rating', 'places.userRatingCount',
          'places.photos', 'places.websiteUri', 'places.nationalPhoneNumber',
          'places.regularOpeningHours', 'places.location', 'places.formattedAddress',
        ].join(','),
      },
      body: JSON.stringify({
        textQuery: `${name} ${city}`,
        languageCode: 'fr',
        maxResultCount: 1,
      }),
    })

    if (!res.ok) return null
    const json = await res.json()
    const place = json.places?.[0]
    if (!place) return null
    return parsePlaceResult(place)
  } catch {
    return null
  }
}

export async function searchNearbyCompetitors(
  category: string,
  lat: number,
  lng: number,
  excludePlaceId?: string
): Promise<PlaceData[]> {
  if (!PLACES_API_KEY || !lat || !lng) return []

  const mapping = CATEGORY_TO_TYPE[category]
  // Unknown category → use text search instead of nearby
  if (!mapping) return []

  const { types: placeTypes, radius } = mapping

  try {
    const res = await fetch(`${BASE}/places:searchNearby`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': PLACES_API_KEY,
        'X-Goog-FieldMask': [
          'places.id', 'places.displayName', 'places.rating', 'places.userRatingCount',
          'places.photos', 'places.websiteUri', 'places.nationalPhoneNumber',
          'places.regularOpeningHours',
        ].join(','),
      },
      body: JSON.stringify({
        // primaryType only → strict same-sector matching, avoids false positives
        includedPrimaryTypes: placeTypes,
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: { latitude: lat, longitude: lng },
            radius,
          },
        },
        languageCode: 'fr',
        rankPreference: 'POPULARITY',
      }),
    })

    if (!res.ok) return []
    const json = await res.json()
    return (json.places ?? [])
      .filter((p: any) => p.id !== excludePlaceId && p.userRatingCount > 0)
      .slice(0, 5)
      .map(parsePlaceResult)
  } catch {
    return []
  }
}
