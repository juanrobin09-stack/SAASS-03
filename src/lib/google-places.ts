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

const CATEGORY_TO_TYPE: Record<string, string> = {
  'Restaurant': 'restaurant',
  'Boulangerie / Pâtisserie': 'bakery',
  'Coiffeur / Salon de beauté': 'hair_care',
  'Hôtel': 'lodging',
  'Pharmacie': 'pharmacy',
  'Médecin / Cabinet médical': 'doctor',
  'Garage / Auto': 'car_repair',
  'Supermarché / Épicerie': 'grocery_store',
  'Salle de sport / Fitness': 'gym',
  'Immobilier': 'real_estate_agency',
  'Avocat / Notaire': 'lawyer',
  'Dentiste': 'dentist',
  'Vétérinaire': 'veterinary_care',
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

  const placeType = CATEGORY_TO_TYPE[category] ?? 'establishment'

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
        includedTypes: [placeType],
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: { latitude: lat, longitude: lng },
            radius: 2000,
          },
        },
        languageCode: 'fr',
      }),
    })

    if (!res.ok) return []
    const json = await res.json()
    return (json.places ?? [])
      .filter((p: any) => p.id !== excludePlaceId)
      .slice(0, 5)
      .map(parsePlaceResult)
  } catch {
    return []
  }
}
