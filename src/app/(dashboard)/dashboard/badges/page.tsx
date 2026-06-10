export const dynamic = 'force-dynamic'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getUserByClerkId } from '@/lib/user'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { Award, Lock } from 'lucide-react'

export default async function BadgesPage() {
  const { userId: clerkId } = await auth()
  if (!clerkId) redirect('/login')

  const user = await getUserByClerkId(clerkId)
  if (!user) redirect('/onboarding')

  const [userBadges, allBadges] = await Promise.all([
    prisma.userBadge.findMany({ where: { userId: user.id }, include: { badge: true }, orderBy: { earnedAt: 'desc' } }),
    prisma.badge.findMany({ orderBy: { xpReward: 'desc' } }),
  ])

  const earnedIds = new Set(userBadges.map(ub => ub.badge.slug))

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Badges</h1>
        <p className="text-dark-400">{userBadges.length}/{allBadges.length} badges débloqués</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {allBadges.map(badge => {
          const earned = earnedIds.has(badge.slug)
          const userBadge = userBadges.find(ub => ub.badge.slug === badge.slug)
          return (
            <Card key={badge.slug} className={earned ? '' : 'opacity-40'}>
              <CardContent className="text-center py-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 border"
                  style={{ borderColor: earned ? badge.color + '40' : '#334155', backgroundColor: earned ? badge.color + '15' : '#1e293b' }}>
                  {earned ? badge.icon : <Lock className="w-6 h-6 text-dark-600" />}
                </div>
                <p className="text-white font-semibold text-sm mb-1">{badge.name}</p>
                <p className="text-dark-400 text-xs mb-2">{badge.description}</p>
                <div className="flex items-center justify-center gap-1">
                  <Award className="w-3 h-3 text-yellow-400" />
                  <span className="text-yellow-400 text-xs font-medium">+{badge.xpReward} XP</span>
                </div>
                {earned && userBadge && <p className="text-dark-500 text-xs mt-2">Obtenu le {formatDate(userBadge.earnedAt)}</p>}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
