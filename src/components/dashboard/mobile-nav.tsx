'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, TrendingUp, FileText, Settings, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

const mobileNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/historique', label: 'Historique', icon: TrendingUp },
  { href: '/dashboard/rapport', label: 'Rapport', icon: FileText },
  { href: '/dashboard/alertes', label: 'Alertes', icon: Bell },
  { href: '/dashboard/parametres', label: 'Réglages', icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-xl border-t border-dark-800/80"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-5">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] transition-colors',
                isActive ? 'text-primary-400' : 'text-dark-500'
              )}
            >
              <Icon size={20} className="shrink-0" />
              <span className="text-[10px] font-medium leading-none truncate max-w-full px-0.5">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
