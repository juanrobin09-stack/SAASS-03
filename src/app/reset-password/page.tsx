'use client'

import Link from 'next/link'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const email = searchParams.get('email') ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas'); return }
    if (password.length < 8) { setError('Minimum 8 caractères'); return }

    setLoading(true)
    const res = await fetch('/api/account/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token, password }),
    })
    const data = await res.json()

    if (!res.ok) { setError(data.error); setLoading(false); return }

    setDone(true)
    setTimeout(() => router.push('/login'), 3000)
  }

  if (!token || !email) {
    return (
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-white font-semibold">Lien invalide</p>
        <Link href="/forgot-password" className="text-primary-400 text-sm mt-2 block">Faire une nouvelle demande</Link>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <Link href="/" className="flex items-center gap-2 mb-10 justify-center">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-white text-lg">LocalScore<span className="text-primary-400">.ai</span></span>
      </Link>

      {done ? (
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-accent-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Mot de passe mis à jour !</h1>
          <p className="text-dark-400">Redirection vers la connexion…</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-white mb-2">Nouveau mot de passe</h1>
          <p className="text-dark-400 mb-8">Choisissez un mot de passe sécurisé pour votre compte.</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nouveau mot de passe"
              type="password"
              id="password"
              placeholder="Minimum 8 caractères"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />
            <Input
              label="Confirmer le mot de passe"
              type="password"
              id="confirm"
              placeholder="Répétez le mot de passe"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Enregistrer le nouveau mot de passe
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </>
      )}
    </motion.div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}
