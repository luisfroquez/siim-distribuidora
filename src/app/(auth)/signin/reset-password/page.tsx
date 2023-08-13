import { type Metadata } from 'next'

import { ResetPasswordForm } from '@/components/forms/reset-password-form'
import { Shell } from '@/components/shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Recupera tu contraseña',
  description: 'Ingresa tu mail para recuperar tu contraseña',
}

export default function ResetPasswordPage() {
  return (
    <Shell layout="auth">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Recupera tu contraseña</CardTitle>
          <CardDescription>
            Ingresa tu correo y te enviaremos un código de recuperación.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
