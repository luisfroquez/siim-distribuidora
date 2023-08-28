import { currentUser } from '@clerk/nextjs'

import FloatingContactButton from '@/components/layouts/floating-contact-button'
import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteHeader } from '@/components/layouts/site-header'

interface LobbyLayoutProps {
  children: React.ReactNode
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  const user = await currentUser()

  return (
    <div className="relative min-h-screen max-h-screen w-full overflow-hidden">
      <FloatingContactButton />
      <div className="relative flex min-h-screen max-h-screen  overflow-auto flex-col">
        <SiteHeader user={user} />
        <main className="container flex flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  )
}
