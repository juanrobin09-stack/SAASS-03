'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Building2, Tag, Globe, Phone, Target, ArrowRight, Sparkles, Search, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScanAnimation } from '@/components/onboarding/scan-animation'

const CATEGORIES = [
  'Restaurant', 'Boulangerie / Pâtisserie', 'Coiffeur / Salon de beauté',
  'Médecin / Cabinet médical', 'Dentiste', 'Pharmacie', 'Garage / Auto',
  'Plombier / Électricien', 'Boutique de vêtements', 'Hôtel', 'Bar / Café',
  'Supermarché / Épicerie', 'Agence immobilière', 'Avocat / Notaire',
  'Gym / Salle de sport', 'Vétérinaire', 'Fleuriste', 'Autre',
]

interface FormData {
  businessName: string
  address: string
  city: string
  category: string
  website: string
  phone: string
  competitorName: string
}

interface Suggestion {
  placeId: string
  mainText: string
  secondaryText: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [scanning, setScanning] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    businessName: '', address: '', city: '', category: '',
    website: '', phone: '', competitorName: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<{ message: string; isPlanLimit: boolean } | null>(null)

  // Autocomplete state
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [placeSelected, setPlaceSelected] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, businessName: value }))
    setErrors(prev => ({ ...prev, businessName: '' }))
    setPlaceSelected(false)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (value.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setLoadingSuggestions(true)
      try {
        const query = formData.city ? `${value} ${formData.city}` : value
        const res = await fetch(`/api/places/autocomplete?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setSuggestions(data.suggestions ?? [])
        setShowSuggestions((data.suggestions ?? []).length > 0)
      } catch {
        setSuggestions([])
      } finally {
        setLoadingSuggestions(false)
      }
    }, 350)
  }

  const handleSelectPlace = async (suggestion: Suggestion) => {
    setShowSuggestions(false)
    setFormData(prev => ({ ...prev, businessName: suggestion.mainText }))
    setPlaceSelected(true)

    try {
      const res = await fetch(`/api/places/details?placeId=${suggestion.placeId}`)
      const details = await res.json()
      if (!details.error) {
        setFormData(prev => ({
          ...prev,
          businessName: details.name || prev.businessName,
          address: details.address || prev.address,
          city: details.city || prev.city,
          phone: details.phone || prev.phone,
          website: details.website || prev.website,
          category: details.category || prev.category,
        }))
      }
    } catch {
      // keep manually typed values
    }
  }

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validateStep = () => {
    const newErrors: Partial<FormData> = {}
    if (step === 1) {
      if (!formData.businessName.trim()) newErrors.businessName = 'Requis'
      if (!formData.city.trim()) newErrors.city = 'Requis'
      if (!formData.category) newErrors.category = 'Requis'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) setStep(2)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    setScanning(true)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const err = await res.json()
        const isPlanLimit = res.status === 403
        setSubmitError({
          message: err.error || 'Erreur lors de l\'analyse',
          isPlanLimit,
        })
        setScanning(false)
        setIsSubmitting(false)
        return
      }

      // Data is persisted to DB by the API; dashboard will read from DB directly
      await res.json()
    } catch {
      setSubmitError({ message: 'Impossible de contacter le serveur. Vérifiez votre connexion.', isPlanLimit: false })
      setScanning(false)
      setIsSubmitting(false)
    }
  }

  const handleScanComplete = () => {
    router.push('/dashboard')
  }

  if (scanning) {
    return <ScanAnimation businessName={formData.businessName} onComplete={handleScanComplete} />
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-xl">LocalScore.ai</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            {step === 1 ? 'Votre établissement' : 'Détails optionnels'}
          </h1>
          <p className="text-dark-400">
            {step === 1
              ? 'Les informations essentielles pour calculer votre Score Local'
              : 'Améliorez la précision de votre analyse (optionnel)'}
          </p>
        </motion.div>

        <div className="flex gap-2 mb-8">
          {[1, 2].map(s => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-primary-500' : 'bg-dark-800'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              {/* Business name with autocomplete */}
              <div ref={wrapperRef} className="relative">
                <label className="block text-sm font-medium text-dark-300 mb-1.5">
                  Nom de votre établissement *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="ex: La Tourette, Restaurant Le Marché…"
                    value={formData.businessName}
                    onChange={handleBusinessNameChange}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    className={`w-full rounded-lg border ${errors.businessName ? 'border-red-500' : placeSelected ? 'border-accent-500/50' : 'border-dark-700'} bg-dark-900 text-white pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                    autoComplete="off"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {loadingSuggestions
                      ? <Loader2 className="w-4 h-4 text-dark-400 animate-spin" />
                      : <Search className="w-4 h-4 text-dark-600" />
                    }
                  </div>
                </div>
                {errors.businessName && (
                  <p className="mt-1.5 text-sm text-red-400">{errors.businessName}</p>
                )}
                {placeSelected && (
                  <p className="mt-1.5 text-xs text-accent-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Établissement trouvé — infos pré-remplies
                  </p>
                )}

                {/* Suggestions dropdown */}
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-50 w-full mt-1 bg-dark-900 border border-dark-700 rounded-xl shadow-xl overflow-hidden"
                    >
                      {suggestions.map((s) => (
                        <button
                          key={s.placeId}
                          type="button"
                          onMouseDown={() => handleSelectPlace(s)}
                          className="w-full text-left px-4 py-3 hover:bg-dark-800 transition-colors border-b border-dark-800 last:border-0 flex items-start gap-3"
                        >
                          <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-white text-sm font-medium">{s.mainText}</p>
                            <p className="text-dark-400 text-xs mt-0.5">{s.secondaryText}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Input
                label="Ville *"
                type="text"
                id="city"
                placeholder="ex: Paris, Lyon, Bordeaux..."
                value={formData.city}
                onChange={update('city')}
                icon={<MapPin className="w-4 h-4" />}
                error={errors.city}
                required
              />

              <Input
                label="Adresse (optionnel)"
                type="text"
                id="address"
                placeholder="ex: 12 rue de la Paix"
                value={formData.address}
                onChange={update('address')}
                icon={<MapPin className="w-4 h-4" />}
              />

              <div className="w-full">
                <label htmlFor="category" className="block text-sm font-medium text-dark-300 mb-1.5">
                  Catégorie d'activité *
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                  <select
                    id="category"
                    value={formData.category}
                    onChange={update('category')}
                    className={`w-full rounded-lg border ${errors.category ? 'border-red-500' : 'border-dark-700'} bg-dark-900 text-white pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none`}
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                {errors.category && <p className="mt-1.5 text-sm text-red-400">{errors.category}</p>}
              </div>

              <Button onClick={handleNext} className="w-full" size="lg">
                Continuer
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="bg-primary-500/5 border border-primary-500/20 rounded-xl p-4 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <p className="text-dark-300 text-sm">
                  Ces informations sont optionnelles mais améliorent la précision de votre score et de l'analyse concurrentielle.
                </p>
              </div>

              <Input
                label="Site web"
                type="url"
                id="website"
                placeholder="https://moncommerce.fr"
                value={formData.website}
                onChange={update('website')}
                icon={<Globe className="w-4 h-4" />}
              />

              <Input
                label="Téléphone"
                type="tel"
                id="phone"
                placeholder="06 XX XX XX XX"
                value={formData.phone}
                onChange={update('phone')}
                icon={<Phone className="w-4 h-4" />}
              />

              <Input
                label="Concurrent principal (optionnel)"
                type="text"
                id="competitorName"
                placeholder="ex: Restaurant La Belle Époque"
                value={formData.competitorName}
                onChange={update('competitorName')}
                icon={<Target className="w-4 h-4" />}
              />
              <p className="text-dark-500 text-xs -mt-3 px-1">
                Si vide, nous identifions automatiquement vos concurrents les plus menaçants.
              </p>

              {submitError && (
                <div className={`flex items-start gap-3 p-4 rounded-xl border ${
                  submitError.isPlanLimit
                    ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
                    : 'bg-red-500/10 border-red-500/30 text-red-300'
                }`}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{submitError.message}</p>
                    {submitError.isPlanLimit && (
                      <a href="/pricing" className="text-xs underline mt-1 block text-yellow-400 hover:text-yellow-300">
                        Passer au plan Pro pour relancer une analyse →
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(1)} className="flex-1" size="lg">
                  Retour
                </Button>
                <Button
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  className="flex-1"
                  size="lg"
                >
                  <Sparkles className="w-4 h-4" />
                  Analyser maintenant
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
