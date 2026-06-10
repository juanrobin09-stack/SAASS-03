'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/account/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center gap-2 mb-10 justify-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg">LocalScore<span className="text-primary-400">.ai</span></span>
        </Link>

        {sent ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-accent-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-accent-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Email envoyé !</h1>
            <p className="text-dark-400 mb-6">
              Si un compte existe pour <span className="text-white">{email}</span>, vous recevrez un lien de réinitialisation dans quelques minutes.
            </p>
            <Link href="/login">
              <Button variant="secondary" className="w-full">
                Retour à la connexion
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white mb-2">Mot de passe oublié</h1>
            <p className="text-dark-400 mb-8">Entrez votre email et nous vous enverrons un lien de réinitialisation.</p>

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
              />
              <Button type="submit" loading={loading} className="w-full" size="lg">
                Envoyer le lien
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <p className="text-center text-dark-400 text-sm mt-6">
              <Link href="/login" className="text-primary-400 hover:text-primary-300 transition-colors">
                Retour à la connexion
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </div>
  )
}
