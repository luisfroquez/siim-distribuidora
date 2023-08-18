import { currentUser } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { Header } from '@/components/header'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Cotizaciones',
  description: 'Revisa las cotizaciones que nos has solicitado',
}

export default async function PurchasesPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/signin')
  }

  return (
    <Shell layout="dashboard">
      <Header
        title="Cotizaciones"
        description="Revisa las cotizaciones que nos has solicitado"
        size="sm"
      />
      <div>Tabla de cotizaciones</div>
    </Shell>
  )
}
