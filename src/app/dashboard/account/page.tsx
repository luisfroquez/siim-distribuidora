import { UserProfile } from '@clerk/nextjs'
import type { Metadata } from 'next'

import { Header } from '@/components/header'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Cuenta',
  description: 'Gestiona la configuración de tu cuenta SIIM',
}

export default function AccountPage() {
  return (
    <Shell layout="dashboard">
      <Header
        title="Cuenta"
        description="Gestiona la configuración de tu cuenta SIIM"
        size="sm"
      />
      <div className="w-full overflow-hidden rounded-lg">
        <UserProfile
          appearance={{
            variables: {
              borderRadius: '0.25rem',
              colorBackground: '#00000000',
            },
            elements: {
              card: 'shadow-none',
              navbar: 'hidden',
              navbarMobileMenuButton: 'hidden',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
            },
          }}
        />
      </div>
    </Shell>
  )
}
