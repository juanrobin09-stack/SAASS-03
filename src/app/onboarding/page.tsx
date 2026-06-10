'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Building2, Tag, Globe, Phone, Target, ArrowRight, Sparkles } from 'lucide-react'
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
    setScanning(true)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const err = await res.json()
        alert(err.error || 'Erreur lors de l\'analyse')
        setScanning(false)
        setIsSubmitting(false)
        return
      }

      const data = await res.json()
      sessionStorage.setItem('analysisResult', JSON.stringify(data))
    } catch {
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
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-xl">Locentra</span>
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

        {/* Progress */}
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
              <Input
                label="Nom de votre établissement *"
                type="text"
                id="businessName"
                placeholder="ex: Restaurant Le Marché"
                value={formData.businessName}
                onChange={update('businessName')}
                icon={<Building2 className="w-4 h-4" />}
                error={errors.businessName}
                required
              />

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
                    className="w-full rounded-lg border border-dark-700 bg-dark-900 text-white pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
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
