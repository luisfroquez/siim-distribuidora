import { type Metadata } from 'next'

import { ResetPasswordStep2Form } from '@/components/forms/reset-password-form-step2'
import { Shell } from '@/components/shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Enter your email to reset your password',
}

export default function ResetPasswordStep2Page() {
  return (
    <Shell layout="auth">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a verification code
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ResetPasswordStep2Form />
        </CardContent>
      </Card>
    </Shell>
  )
}
