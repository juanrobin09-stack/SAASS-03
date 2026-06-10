'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { LayoutDashboard, BarChart3, FileText, Settings, LogOut, Bell, Award, ChevronLeft, ChevronRight, TrendingUp, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { LogoMark } from '@/components/ui/logo'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/historique', label: 'Historique', icon: TrendingUp },
  { href: '/dashboard/rapport', label: 'Rapport', icon: FileText },
  { href: '/dashboard/alertes', label: 'Alertes', icon: Bell },
  { href: '/dashboard/badges', label: 'Badges', icon: Award },
  { href: '/dashboard/parametres', label: 'Paramètres', icon: Settings },
]

interface SidebarProps {
  userName?: string
  userPlan?: string
}

export function Sidebar({ userName, userPlan }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const isPro = userPlan === 'PRO' || userPlan === 'BUSINESS'

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 236 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-screen bg-dark-900/90 backdrop-blur-xl border-r border-dark-800/80 flex-shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-4 border-b border-dark-800/60',
        collapsed && 'justify-center px-2'
      )}>
        <div className="w-9 h-9 rounded-xl bg-dark-800 border border-dark-700 flex items-center justify-center shrink-0">
          <LogoMark size={22} />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            className="font-extrabold text-white text-sm tracking-tight truncate"
          >
            LocalScore<span className="text-primary-400 font-semibold">.ai</span>
          </motion.span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative',
                collapsed && 'justify-center px-2.5',
                isActive
                  ? 'bg-primary-500/10 text-primary-300 border border-primary-500/15'
                  : 'text-dark-500 hover:text-dark-200 hover:bg-dark-800/60',
              )}>
                <Icon className={cn('w-4.5 h-4.5 flex-shrink-0', isActive ? 'text-primary-400' : 'text-current')} style={{ width: 18, height: 18 }} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {!collapsed && isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400/80" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer — plan + user + signout */}
      <div className={cn('px-2.5 pb-3 border-t border-dark-800/60 space-y-1 pt-2', collapsed && 'flex flex-col items-center')}>
        {/* Pro badge */}
        {!collapsed && isPro && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary-600/15 to-accent-600/10 border border-primary-500/15 mb-1">
            <Crown className="w-3.5 h-3.5 text-yellow-400" />
            <p className="text-primary-300 text-xs font-semibold">Plan Pro</p>
          </div>
        )}

        {/* User */}
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {userName?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <span className="text-dark-400 text-xs truncate">{userName ?? 'Utilisateur'}</span>
          </div>
        )}

        {/* Sign out */}
        <SignOutButton redirectUrl="/">
          <button className={cn(
            'flex items-center gap-2.5 px-3 py-2 text-dark-500 hover:text-red-400 hover:bg-red-500/8 rounded-xl transition-colors w-full',
            collapsed && 'justify-center px-2.5'
          )}>
            <LogOut className="flex-shrink-0" style={{ width: 16, height: 16 }} />
            {!collapsed && <span className="text-xs font-medium">Déconnexion</span>}
          </button>
        </SignOutButton>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[4.5rem] w-6 h-6 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-dark-500 hover:text-white hover:border-dark-600 transition-colors z-10"
        aria-label={collapsed ? 'Agrandir le menu' : 'Réduire le menu'}
      >
        {collapsed ? (
          <ChevronRight style={{ width: 12, height: 12 }} />
        ) : (
          <ChevronLeft style={{ width: 12, height: 12 }} />
        )}
      </button>
    </motion.aside>
  )
}
