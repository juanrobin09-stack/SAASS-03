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
    <Image
      src="/logo.png"
      alt="LocalScore.ai"
      width={size}
      height={size}
      className={cn('rounded-full shrink-0', className)}
      priority
    />
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
    lg: { mark: 44, text: 'text-xl' },
  }

  const content = (
    <span className={cn('flex items-center gap-2.5 group', className)}>
      <Image
        src="/logo.png"
        alt="LocalScore.ai"
        width={sizes[size].mark}
        height={sizes[size].mark}
        className="rounded-full shrink-0"
        priority
      />
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
