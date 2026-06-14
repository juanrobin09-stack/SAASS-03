'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoMarkProps {
  size?: number
  className?: string
}

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ls-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="ls-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="ls-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <linearGradient id="ls-pin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="ls-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
      </defs>

      {/* Shield background */}
      <path
        d="M18 2L3 8v13c0 9.5 6.5 17 15 19.5C27.5 38 34 30.5 34 21V8L18 2z"
        fill="url(#ls-shield)"
        opacity="0.3"
      />

      {/* Left swoosh */}
      <path d="M5 22C3 17 5 10 10 7" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Right swoosh */}
      <path d="M31 22C33 17 31 10 26 7" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Bar left — green, short */}
      <rect x="4" y="18" width="8" height="14" rx="2.5" fill="url(#ls-green)" />
      {/* Bar middle — blue, medium */}
      <rect x="14" y="12" width="8" height="20" rx="2.5" fill="url(#ls-blue)" />
      {/* Bar right — purple, tall */}
      <rect x="24" y="6" width="8" height="26" rx="2.5" fill="url(#ls-purple)" />

      {/* Location pin */}
      <path d="M18 17C14.7 17 12 19.7 12 23C12 27.5 18 34 18 34C18 34 24 27.5 24 23C24 19.7 21.3 17 18 17Z" fill="url(#ls-pin)" />
      <circle cx="18" cy="23" r="3" fill="white" />
    </svg>
  )
}

interface LogoProps {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showText?: boolean
}

export function Logo({ href = '/', size = 'md', className, showText = true }: LogoProps) {
  const sizes = {
    sm: { mark: 26, text: 'text-base' },
    md: { mark: 32, text: 'text-lg' },
    lg: { mark: 40, text: 'text-xl' },
  }

  const content = (
    <span className={cn('flex items-center gap-2.5 group', className)}>
      <LogoMark size={sizes[size].mark} className="shrink-0" />
      {showText && (
        <span className={cn('font-extrabold text-white tracking-tight', sizes[size].text)}>
          LocalScore<span className="text-blue-400 font-semibold">.ai</span>
        </span>
      )}
    </span>
  )

  if (!href) return content

  return (
    <Link href={href} aria-label="LocalScore.ai — Retour à l'accueil">
      {content}
    </Link>
  )
}
