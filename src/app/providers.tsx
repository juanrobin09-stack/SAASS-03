'use client'

import { ClerkProvider } from '@clerk/nextjs'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#6366f1',
          colorBackground: '#0f172a',
          colorInputBackground: '#1e293b',
          colorInputText: '#ffffff',
          colorText: '#ffffff',
          colorTextSecondary: '#94a3b8',
          borderRadius: '0.75rem',
        },
        elements: {
          card: 'bg-dark-900 border border-dark-800 shadow-2xl',
          headerTitle: 'text-white font-bold',
          headerSubtitle: 'text-dark-400',
          socialButtonsBlockButton: 'bg-dark-800 border border-dark-700 hover:bg-dark-700 text-white',
          formButtonPrimary: 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600',
          footerActionLink: 'text-primary-400 hover:text-primary-300',
          formFieldInput: 'bg-dark-900 border-dark-700 text-white',
          rootBox: 'w-full',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
