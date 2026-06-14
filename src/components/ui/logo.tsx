'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo-transparent.png"
      alt="LocalScore.ai"
      width={size}
      height={size}
      className={cn('object-contain', className)}
      priority
    />
  )
}

export function Logo({ href = '/', size = 'md', className }: LogoProps) {
  const sizes: Record<string, { icon: number; text: string }> = {
    sm: { icon: 24, text: 'text-sm' },
    md: { icon: 30, text: 'text-base' },
    lg: { icon: 38, text: 'text-xl' },
  }
  const { icon, text } = sizes[size]

  const content = (
    <span className={cn('flex items-center gap-2 shrink-0', className)}>
      <Image
        src="/logo-transparent.png"
        alt=""
        width={icon}
        height={icon}
        className="object-contain"
        priority
      />
      <span className={cn('font-black text-white tracking-tight', text)}>
        LocalScore<span className="text-primary-400">.ai</span>
      </span>
    </span>
  )

  if (!href) return content

  return (
    <Link href={href} aria-label="LocalScore.ai — Retour à l'accueil">
      {content}
    </Link>
  )
}
