'use client'

import Link from 'next/link'
import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Email ou mot de passe incorrect')
      setLoading(false)
    } else {
      router.push(callbackUrl)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-dark-950" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/15 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center p-16">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-2xl">LocalScore<span className="text-primary-400">.ai</span></span>
          </Link>

          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Votre score local<br />vous attend.
          </h2>
          <p className="text-dark-400 text-lg mb-12">
            Connectez-vous pour voir votre progression et battre vos concurrents.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '+23', label: 'points en moyenne\npar mois' },
              { value: '74%', label: 'des commerces\nprogressent dès semaine 1' },
            ].map((stat) => (
              <div key={stat.value} className="bg-dark-900/60 backdrop-blur rounded-xl p-4 border border-dark-700">
                <p className="text-3xl font-bold text-primary-400 mb-1">{stat.value}</p>
                <p className="text-dark-400 text-sm whitespace-pre-line">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Form */}
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

          <h1 className="text-3xl font-bold text-white mb-2">Connexion</h1>
          <p className="text-dark-400 mb-8">Bon retour ! Entrez vos identifiants.</p>

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
              label="Email"
              type="email"
              id="email"
              placeholder="vous@exemple.fr"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
              autoComplete="email"
            />

            <div>
              <Input
                label="Mot de passe"
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                required
                autoComplete="current-password"
              />
              <div className="flex justify-end mt-1.5">
                <Link href="/forgot-password" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Se connecter
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-dark-400 text-sm mt-8">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Créer un compte gratuit
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
