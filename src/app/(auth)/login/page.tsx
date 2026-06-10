import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { MapPin, CheckCircle } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-dark-950" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-600/15 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center p-16">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-2xl">Locentra</span>
          </Link>

          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Votre score local<br />vous attend.
          </h2>
          <p className="text-dark-400 text-lg mb-12">
            Connectez-vous pour voir votre progression et battre vos concurrents.
          </p>

          <div className="space-y-4">
            {[
              'Score IA recalculé chaque semaine',
              'Missions prioritaires personnalisées',
              'Comparaison avec vos concurrents',
              'Coach IA qui vous dit quoi faire',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <span className="text-dark-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — Clerk SignIn */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg">Locentra</span>
        </div>
        <SignIn />
      </div>
    </div>
  )
}
