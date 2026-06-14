import { SignUp } from '@clerk/nextjs'
import { Check } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { clerkAppearance } from '@/lib/clerk-appearance'

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
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/25 to-dark-950" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-500/6 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-center p-16">
          <div className="mb-16">
            <Logo href="/" size="lg" />
          </div>

          <h2 className="text-4xl font-black text-white mb-3 tracking-tight leading-tight">
            Votre Score Local
            <br />
            <span className="text-primary-400">en 60 secondes.</span>
          </h2>
          <p className="text-dark-400 text-lg mb-10">Gratuit. Sans carte bancaire.</p>

          <ul className="space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent-500/15 border border-accent-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-accent-400" />
                </div>
                <span className="text-dark-300 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel — Clerk SignUp */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 gap-6 sm:gap-8 overflow-x-hidden">
        <div className="lg:hidden">
          <Logo href="/" size="md" />
        </div>
        <div className="w-full max-w-[400px] flex justify-center">
          <SignUp
            fallbackRedirectUrl="/onboarding"
            signInUrl="/login"
            appearance={clerkAppearance}
          />
        </div>
      </div>
    </div>
  )
}
