import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Alerts } from '@/components/dashboard/alerts'

export default async function AlertesPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const userId = (session.user as any).id

  const business = await prisma.business.findFirst({
    where: { userId, isActive: true },
    include: {
      alerts: { orderBy: { createdAt: 'desc' } },
    },
  })

  const alerts = business?.alerts.map(a => ({
    id: a.id,
    type: a.type,
    title: a.title,
    message: a.message,
    priority: a.priority,
    isRead: a.isRead,
    createdAt: a.createdAt.toISOString(),
  })) ?? []

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Alertes</h1>
        <p className="text-dark-400">Toutes vos notifications importantes</p>
      </div>
      <Alerts alerts={alerts} />
    </div>
  )
}
