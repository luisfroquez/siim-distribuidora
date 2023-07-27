import { type Metadata } from 'next'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { OAuthSignIn } from '@/components/auth/oauth-signin'
import { SignInForm } from '@/components/forms/signin-form'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Ingresa a tu cuenta',
}

export default function SignInPage() {
  return (
    <Shell layout="auth">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
          <CardDescription>
            Elige el método de inicio de sesión que prefieras
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O ingresa con
              </span>
            </div>
          </div>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Link
              aria-label="Registrate"
              href="/signup"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Regístrate
            </Link>
          </div>
          <Link
            aria-label="Recuperar contraseña"
            href="/signin/reset-password"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Recuperar contraseña
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  )
}
