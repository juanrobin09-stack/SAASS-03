import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/onboarding(.*)',
])

// Routes that make no sense for an already-authenticated user
const isGuestOnlyRoute = createRouteMatcher([
  '/',
  '/login',
  '/register',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // Authenticated users visiting the landing or auth pages → send to dashboard
  if (userId && isGuestOnlyRoute(req)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Unauthenticated users visiting private routes → send to login
  if (!userId && isProtectedRoute(req)) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(loginUrl)
  }
})

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'],
}
