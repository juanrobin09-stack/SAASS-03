'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoMarkProps {
  size?: number
  className?: string
}

export function LogoMark({ size = 28, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="17" width="7" height="10" rx="2" fill="#6366f1" />
      <rect x="10.5" y="10" width="7" height="17" rx="2" fill="#818cf8" />
      <rect x="20" y="3" width="7" height="24" rx="2" fill="#34d399" />
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
    sm: { mark: 22, text: 'text-base' },
    md: { mark: 26, text: 'text-lg' },
    lg: { mark: 32, text: 'text-xl' },
  }

  const content = (
    <span className={cn('flex items-center gap-2.5 group', className)}>
      <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-dark-900 border border-dark-700 group-hover:border-primary-500/40 transition-colors shrink-0">
        <LogoMark size={sizes[size].mark} />
      </span>
      {showText && (
        <span className={cn('font-extrabold text-white tracking-tight', sizes[size].text)}>
          LocalScore<span className="text-primary-400 font-semibold">.ai</span>
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
