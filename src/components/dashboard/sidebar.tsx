'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, BarChart3, FileText, Settings, LogOut,
  MapPin, Bell, Award, ChevronLeft, ChevronRight, TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/historique', label: 'Historique', icon: TrendingUp },
  { href: '/dashboard/rapport', label: 'Rapport PDF', icon: FileText },
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

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.2 }}
      className="relative flex flex-col h-screen bg-dark-900/80 backdrop-blur-xl border-r border-dark-800 flex-shrink-0"
    >
      {/* Logo */}
      <div className={cn('flex items-center gap-3 p-4 border-b border-dark-800', collapsed && 'justify-center')}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-glow">
          <MapPin className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-white text-base truncate"
          >
            LocalScore.ai
          </motion.span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                  : 'text-dark-400 hover:text-white hover:bg-dark-800',
              )}>
                <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-primary-400')} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {!collapsed && isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Plan badge & user */}
      <div className={cn('p-3 border-t border-dark-800 space-y-2', collapsed && 'flex flex-col items-center')}>
        {!collapsed && userPlan && userPlan !== 'FREE' && (
          <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-primary-600/20 to-accent-600/20 border border-primary-500/20">
            <p className="text-primary-300 text-xs font-semibold">Plan {userPlan}</p>
          </div>
        )}

        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {userName?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <span className="text-dark-300 text-sm truncate">{userName ?? 'Utilisateur'}</span>
          </div>
        )}

        <SignOutButton redirectUrl="/">
          <button className={cn(
            'flex items-center gap-3 px-3 py-2 text-dark-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors w-full',
            collapsed && 'justify-center px-2'
          )}>
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="text-sm">Déconnexion</span>}
          </button>
        </SignOutButton>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-dark-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  )
}
