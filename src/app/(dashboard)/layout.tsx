import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/sidebar'
import { getOrCreateUser } from '@/lib/user'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId: clerkId } = await auth()
  if (!clerkId) redirect('/login')

  const clerkUser = await currentUser()
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? ''
  const name = [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(' ') || clerkUser?.username || email

  const user = await getOrCreateUser(clerkId, email, name)

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      <Sidebar userName={user.name ?? email} userPlan={user.plan} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
