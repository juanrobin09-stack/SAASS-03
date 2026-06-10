'use client'

import Link from 'next/link'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Mail, Lock, User, ArrowRight, AlertCircle, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn } from 'next-auth/react'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')

  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erreur lors de la création du compte')
        setLoading(false)
        return
      }

      // Auto sign in
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (signInResult?.error) {
        setError('Compte créé mais connexion échouée. Connectez-vous manuellement.')
        setLoading(false)
        return
      }

      router.push('/onboarding')
    } catch {
      setError('Erreur réseau. Réessayez.')
      setLoading(false)
    }
  }

  const benefits = [
    'Score Local calculé en 60 secondes',
    'Analyse concurrentielle automatique',
    '5 missions personnalisées cette semaine',
    'Coach IA inclus dans le plan gratuit',
  ]

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-dark-950" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center p-16">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-2xl">LocalScore<span className="text-primary-400">.ai</span></span>
          </Link>

          <h2 className="text-4xl font-bold text-white mb-4">
            Votre Score Local
            <br />
            <span className="text-primary-400">en 60 secondes.</span>
          </h2>
          <p className="text-dark-400 text-lg mb-10">Gratuit. Sans carte bancaire.</p>

          <ul className="space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-accent-400" />
                </div>
                <span className="text-dark-300 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">LocalScore<span className="text-primary-400">.ai</span></span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Créer un compte</h1>
          <p className="text-dark-400 mb-8">
            {plan ? `Plan ${plan.charAt(0).toUpperCase() + plan.slice(1)} sélectionné` : 'Gratuit, sans engagement'}
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6"
            >
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Votre nom"
              type="text"
              id="name"
              placeholder="Jean Dupont"
              value={formData.name}
              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              icon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Email professionnel"
              type="email"
              id="email"
              placeholder="jean@moncommerce.fr"
              value={formData.email}
              onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
              icon={<Mail className="w-4 h-4" />}
              required
              autoComplete="email"
            />

            <Input
              label="Mot de passe"
              type="password"
              id="password"
              placeholder="Minimum 8 caractères"
              value={formData.password}
              onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
              icon={<Lock className="w-4 h-4" />}
              required
              autoComplete="new-password"
            />

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Créer mon compte gratuit
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-dark-500 text-xs text-center mt-4">
            En créant un compte, vous acceptez nos{' '}
            <a href="#" className="text-dark-400 underline">CGU</a> et notre{' '}
            <a href="#" className="text-dark-400 underline">politique de confidentialité</a>.
          </p>

          <p className="text-center text-dark-400 text-sm mt-6">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Se connecter
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}
