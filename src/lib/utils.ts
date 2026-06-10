import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatScore(score: number): string {
  return score.toString().padStart(2, '0')
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-accent-400'
  if (score >= 60) return 'text-yellow-400'
  if (score >= 40) return 'text-orange-400'
  return 'text-red-400'
}

export function getScoreGradient(score: number): string {
  if (score >= 80) return 'from-accent-500 to-accent-400'
  if (score >= 60) return 'from-yellow-500 to-yellow-400'
  if (score >= 40) return 'from-orange-500 to-orange-400'
  return 'from-red-500 to-red-400'
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Très bon'
  if (score >= 70) return 'Bon'
  if (score >= 60) return 'Moyen'
  if (score >= 40) return 'Faible'
  return 'Critique'
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatShortDate(date: Date | string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
