'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Settings, Crown, CreditCard, ExternalLink, User, Lock, Trash2, Check, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface ParametresClientProps {
  user: {
    name: string
    email: string
    plan: string
    hasStripe: boolean
    hasPassword: boolean
    periodEnd?: string
  }
}

const planLabels: Record<string, string> = { FREE: 'Gratuit', PRO: 'Pro', BUSINESS: 'Business' }
const planVariants: Record<string, 'default' | 'info' | 'premium'> = { FREE: 'default', PRO: 'info', BUSINESS: 'premium' }

function SuccessMessage({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 rounded-lg px-3 py-2 mt-3">
      <Check className="w-4 h-4 text-accent-400 flex-shrink-0" />
      <p className="text-accent-400 text-sm">{text}</p>
    </div>
  )
}

function ErrorMessage({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mt-3">
      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
      <p className="text-red-400 text-sm">{text}</p>
    </div>
  )
}

export function ParametresClient({ user }: ParametresClientProps) {
  const router = useRouter()

  // Profile form
  const [name, setName] = useState(user.name)
  const [nameLoading, setNameLoading] = useState(false)
  const [nameStatus, setNameStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  // Password form
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [pwdLoading, setPwdLoading] = useState(false)
  const [pwdStatus, setPwdStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  // Delete account
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Billing
  const [portalLoading, setPortalLoading] = useState(false)

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault()
    setNameLoading(true)
    setNameStatus(null)
    const res = await fetch('/api/account/update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    const data = await res.json()
    setNameStatus(res.ok
      ? { type: 'success', msg: 'Nom mis à jour avec succès' }
      : { type: 'error', msg: data.error })
    setNameLoading(false)
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwdStatus(null)
    if (newPwd !== confirmPwd) { setPwdStatus({ type: 'error', msg: 'Les mots de passe ne correspondent pas' }); return }
    if (newPwd.length < 8) { setPwdStatus({ type: 'error', msg: 'Minimum 8 caractères' }); return }

    setPwdLoading(true)
    const res = await fetch('/api/account/update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: currentPwd, newPassword: newPwd }),
    })
    const data = await res.json()
    if (res.ok) {
      setPwdStatus({ type: 'success', msg: 'Mot de passe mis à jour' })
      setCurrentPwd(''); setNewPwd(''); setConfirmPwd('')
    } else {
      setPwdStatus({ type: 'error', msg: data.error })
    }
    setPwdLoading(false)
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== user.email) return
    setDeleteLoading(true)
    const res = await fetch('/api/account/delete', { method: 'DELETE' })
    if (res.ok) {
      await signOut({ callbackUrl: '/' })
    } else {
      setDeleteLoading(false)
      alert('Erreur lors de la suppression')
    }
  }

  const handleManageBilling = async () => {
    setPortalLoading(true)
    const res = await fetch('/api/portal', { method: 'POST' })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setPortalLoading(false)
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
              <User className="w-5 h-5 text-primary-400" />
              <h3 className="text-white font-semibold">Profil</h3>
            </div>

            <form onSubmit={handleUpdateName} className="space-y-4">
              <Input
                label="Nom complet"
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                icon={<User className="w-4 h-4" />}
                required
              />
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full rounded-lg border border-dark-700 bg-dark-800/50 text-dark-400 px-4 py-3 cursor-not-allowed"
                />
                <p className="text-dark-500 text-xs mt-1">L'email ne peut pas être modifié</p>
              </div>
              <Button type="submit" loading={nameLoading} size="sm">
                Enregistrer le nom
              </Button>
              {nameStatus?.type === 'success' && <SuccessMessage text={nameStatus.msg} />}
              {nameStatus?.type === 'error' && <ErrorMessage text={nameStatus.msg} />}
            </form>
          </CardContent>
        </Card>

        {/* Password */}
        {user.hasPassword && (
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-5">
                <Lock className="w-5 h-5 text-primary-400" />
                <h3 className="text-white font-semibold">Mot de passe</h3>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <Input
                  label="Mot de passe actuel"
                  type="password"
                  id="currentPwd"
                  placeholder="••••••••"
                  value={currentPwd}
                  onChange={e => setCurrentPwd(e.target.value)}
                  icon={<Lock className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Nouveau mot de passe"
                  type="password"
                  id="newPwd"
                  placeholder="Minimum 8 caractères"
                  value={newPwd}
                  onChange={e => setNewPwd(e.target.value)}
                  icon={<Lock className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Confirmer le nouveau mot de passe"
                  type="password"
                  id="confirmPwd"
                  placeholder="Répétez le nouveau mot de passe"
                  value={confirmPwd}
                  onChange={e => setConfirmPwd(e.target.value)}
                  icon={<Lock className="w-4 h-4" />}
                  required
                />
                <Button type="submit" loading={pwdLoading} size="sm">
                  Changer le mot de passe
                </Button>
                {pwdStatus?.type === 'success' && <SuccessMessage text={pwdStatus.msg} />}
                {pwdStatus?.type === 'error' && <ErrorMessage text={pwdStatus.msg} />}
              </form>
            </CardContent>
          </Card>
        )}

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
                  <p className="text-dark-400 text-sm">Renouvellement le {formatDate(user.periodEnd)}</p>
                )}
              </div>
              {user.plan === 'FREE' ? (
                <Link href="/pricing">
                  <Button size="sm">Passer au Pro</Button>
                </Link>
              ) : user.hasStripe ? (
                <Button variant="secondary" size="sm" loading={portalLoading} onClick={handleManageBilling}>
                  <CreditCard className="w-4 h-4" />
                  Gérer la facturation
                  <ExternalLink className="w-3 h-3" />
                </Button>
              ) : null}
            </div>

            {user.plan === 'FREE' && (
              <div className="bg-primary-500/5 border border-primary-500/20 rounded-xl p-4">
                <p className="text-primary-300 text-sm font-medium mb-2">Passez au Pro pour débloquer :</p>
                <ul className="text-dark-400 text-sm space-y-1 mb-3">
                  <li>• Suivi hebdomadaire automatique</li>
                  <li>• Coach IA personnalisé</li>
                  <li>• Historique complet & alertes</li>
                  <li>• Export PDF premium</li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full" size="sm">Passer au Pro — 19€/mois</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete account */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-5">
              <Trash2 className="w-5 h-5 text-red-400" />
              <h3 className="text-white font-semibold">Zone de danger</h3>
            </div>

            {!showDeleteConfirm ? (
              <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                <div>
                  <p className="text-white font-medium text-sm">Supprimer mon compte</p>
                  <p className="text-dark-400 text-xs mt-0.5">Supprime toutes vos données définitivement</p>
                </div>
                <Button variant="danger" size="sm" onClick={() => setShowDeleteConfirm(true)}>
                  Supprimer
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl space-y-4">
                <p className="text-red-300 text-sm font-medium">
                  ⚠️ Cette action est irréversible. Votre abonnement Stripe sera annulé et toutes vos données supprimées.
                </p>
                <div>
                  <label className="block text-sm text-dark-300 mb-1.5">
                    Tapez <span className="text-white font-mono">{user.email}</span> pour confirmer
                  </label>
                  <input
                    type="email"
                    placeholder={user.email}
                    value={deleteConfirm}
                    onChange={e => setDeleteConfirm(e.target.value)}
                    className="w-full rounded-lg border border-red-500/30 bg-dark-900 text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => { setShowDeleteConfirm(false); setDeleteConfirm('') }}>
                    Annuler
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="flex-1"
                    loading={deleteLoading}
                    disabled={deleteConfirm !== user.email}
                    onClick={handleDeleteAccount}
                  >
                    Confirmer la suppression
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
