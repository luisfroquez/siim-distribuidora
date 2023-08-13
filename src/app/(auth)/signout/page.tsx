import { LogOutButtons } from '@/components/auth/logout-buttons'
import { Header } from '@/components/header'
import { Shell } from '@/components/shell'

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export default function SignOutPage() {
  return (
    <Shell layout="auth" className="max-w-xs">
      <Header
        title="Cerrar sesión"
        description="¿Estás seguro que quieres cerrar tu sesión?"
        size="sm"
        className="text-center"
      />
      <LogOutButtons />
    </Shell>
  )
}
