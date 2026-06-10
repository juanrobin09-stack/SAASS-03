'use client'

import { useState } from 'react'
import { Settings, Crown, CreditCard, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface ParametresClientProps {
  user: {
    name: string
    email: string
    plan: string
    hasStripe: boolean
    periodEnd?: string
  }
}

export function ParametresClient({ user }: ParametresClientProps) {
  const [portalLoading, setPortalLoading] = useState(false)

  const handleManageBilling = async () => {
    setPortalLoading(true)
    try {
      const res = await fetch('/api/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      alert('Erreur lors de l\'accès au portail de facturation')
    } finally {
      setPortalLoading(false)
    }
  }

  const planLabels: Record<string, string> = {
    FREE: 'Gratuit',
    PRO: 'Pro',
    BUSINESS: 'Business',
  }

  const planVariants: Record<string, 'default' | 'info' | 'premium'> = {
    FREE: 'default',
    PRO: 'info',
    BUSINESS: 'premium',
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Paramètres</h1>
        <p className="text-dark-400">Gérez votre compte et votre abonnement</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-5">
              <Settings className="w-5 h-5 text-primary-400" />
              <h3 className="text-white font-semibold">Profil</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-dark-800">
                <span className="text-dark-400 text-sm">Nom</span>
                <span className="text-white text-sm font-medium">{user.name || '—'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-dark-400 text-sm">Email</span>
                <span className="text-white text-sm font-medium">{user.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-5">
              <Crown className="w-5 h-5 text-yellow-400" />
              <h3 className="text-white font-semibold">Abonnement</h3>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">Plan {planLabels[user.plan]}</span>
                  <Badge variant={planVariants[user.plan]}>{planLabels[user.plan]}</Badge>
                </div>
                {user.periodEnd && (
                  <p className="text-dark-400 text-sm">
                    Renouvellement le {formatDate(user.periodEnd)}
                  </p>
                )}
              </div>
              {user.plan === 'FREE' ? (
                <Link href="/pricing">
                  <Button size="sm">Passer au Pro</Button>
                </Link>
              ) : user.hasStripe ? (
                <Button
                  variant="secondary"
                  size="sm"
                  loading={portalLoading}
                  onClick={handleManageBilling}
                >
                  <CreditCard className="w-4 h-4" />
                  Gérer la facturation
                  <ExternalLink className="w-3 h-3" />
                </Button>
              ) : null}
            </div>

            {user.plan === 'FREE' && (
              <div className="bg-primary-500/5 border border-primary-500/20 rounded-xl p-4">
                <p className="text-primary-300 text-sm font-medium mb-1">Passez au Pro pour débloquer :</p>
                <ul className="text-dark-400 text-sm space-y-1">
                  <li>• Suivi hebdomadaire automatique</li>
                  <li>• Coach IA personnalisé</li>
                  <li>• Historique complet & alertes</li>
                  <li>• Export PDF premium</li>
                </ul>
                <div className="mt-3">
                  <Link href="/pricing">
                    <Button className="w-full" size="sm">
                      Passer au Pro — 19€/mois
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card>
          <CardContent>
            <h3 className="text-white font-semibold mb-5">Zone de danger</h3>
            <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
              <div>
                <p className="text-white font-medium text-sm">Supprimer mon compte</p>
                <p className="text-dark-400 text-xs mt-0.5">Cette action est irréversible</p>
              </div>
              <Button variant="danger" size="sm">
                Supprimer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
