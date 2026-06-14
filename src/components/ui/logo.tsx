'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoMarkProps {
  size?: number
  className?: string
}

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-xl shrink-0 overflow-hidden',
        'bg-gradient-to-br from-primary-500 to-accent-400',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        className="w-full h-full object-contain"
        style={{ mixBlendMode: 'multiply' }}
        priority
      />
    </span>
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
    sm: { mark: 28, text: 'text-base' },
    md: { mark: 34, text: 'text-lg' },
    lg: { mark: 42, text: 'text-xl' },
  }

  const content = (
    <span className={cn('flex items-center gap-2.5 group', className)}>
      <LogoMark size={sizes[size].mark} />
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
