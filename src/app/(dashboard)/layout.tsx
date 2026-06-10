import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Sidebar } from '@/components/dashboard/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard')
  }

  const user = session.user as any

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      <Sidebar userName={user.name ?? user.email} userPlan={user.plan} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
