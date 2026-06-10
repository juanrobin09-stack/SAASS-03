import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { MapPin, Check } from 'lucide-react'

const benefits = [
  'Score Local IA calculé en 60 secondes',
  'Comparaison avec vos concurrents directs',
  '5 missions concrètes dès la première analyse',
  'Coach IA inclus — plan gratuit',
  'Sans carte bancaire requise',
]

export default function RegisterPage() {
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
            <span className="font-bold text-white text-2xl">Locentra</span>
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

      {/* Right panel — Clerk SignUp */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg">Locentra</span>
        </div>
        <SignUp />
      </div>
    </div>
  )
}
