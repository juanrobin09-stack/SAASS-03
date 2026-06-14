'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Keep LogoMark for any code that imports it
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo-full.jpg"
      alt="LocalScore.ai"
      width={size * 2.7}
      height={size}
      className={cn('object-contain', className)}
      priority
    />
  )
}

export function Logo({ href = '/', size = 'md', className }: LogoProps) {
  const heights: Record<string, number> = { sm: 26, md: 32, lg: 40 }
  const h = heights[size]

  const content = (
    <span className={cn('flex items-center shrink-0', className)}>
      <Image
        src="/logo-full.jpg"
        alt="LocalScore.ai"
        width={Math.round(h * 2.67)}
        height={h}
        className="object-contain"
        priority
      />
    </span>
  )

  if (!href) return content

  return (
    <Link href={href} aria-label="LocalScore.ai — Retour à l'accueil">
      {content}
    </Link>
  )
}
