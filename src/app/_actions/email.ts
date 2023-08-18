'use server'

import { db } from '@/db'
import { emailPreferences } from '@/db/schema'
import { env } from '@/env.mjs'
import { currentUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { type z } from 'zod'

import NewsletterWelcomeEmail from '@/components/emails/newsletter-welcome-email'
import QuoteForSIIM from '@/components/emails/quote-for-siim'
import { resend } from '@/lib/resend'
import type {
  subscribeToNewsletterSchema,
  updateEmailPreferencesSchema,
} from '@/lib/validations/email'
import { cookies } from 'next/headers'
import { toast } from 'sonner'
import {
  NEXT_PUBLIC_EMAIL_FROM_ADDRESS,
  NEXT_PUBLIC_EMAIL_RECIPIENT_FOR_QUOTES,
} from '../config'
import { getQuote, getQuoteAction } from './quote'

// This server action doesn't work in production because it is returning an email component maybe?
// So we are using the route handler /api/email/newsletter instead
export async function subscribeToNewsletterAction(
  input: z.infer<typeof subscribeToNewsletterSchema>
) {
  const emailPreference = await db.query.emailPreferences.findFirst({
    where: eq(emailPreferences.email, input.email),
  })

  console.log(emailPreference)

  if (emailPreference) {
    throw new Error('Ya estabas suscrit@ a nuestro boletín.')
  }

  const user = await currentUser()

  const subject = input.subject ?? '¡Bienvenid@ a nuestro Boletín Informativo!'

  await resend.emails.send({
    from: env.EMAIL_FROM_ADDRESS,
    to: input.email,
    subject,
    react: NewsletterWelcomeEmail({
      firstName: user?.firstName ?? undefined,
      fromEmail: env.EMAIL_FROM_ADDRESS,
      token: input.token,
    }),
  })

  await db.insert(emailPreferences).values({
    email: input.email,
    token: input.token,
    userId: user?.id,
    newsletter: true,
  })

  revalidatePath('/')
}

export async function updateEmailPreferencesAction(
  input: z.infer<typeof updateEmailPreferencesSchema>
) {
  const emailPreference = await db.query.emailPreferences.findFirst({
    where: eq(emailPreferences.token, input.token),
  })

  if (!emailPreference) {
    throw new Error('Correo electrónico no encontrado.')
  }

  const user = await currentUser()

  if (input.newsletter && !emailPreference.newsletter) {
    await resend.emails.send({
      from: env.EMAIL_FROM_ADDRESS,
      to: emailPreference.email,
      subject: 'Bienvenid@ a SIIM Distribuidora',
      react: NewsletterWelcomeEmail({
        firstName: user?.firstName ?? undefined,
        fromEmail: env.EMAIL_FROM_ADDRESS,
        token: input.token,
      }),
    })
  }

  await db
    .update(emailPreferences)
    .set({
      ...input,
      userId: user?.id,
    })
    .where(eq(emailPreferences.token, input.token))

  revalidatePath('/')
}

export async function sendQuoteByMail(mailToSendQuote: string) {
  const quote = await getQuote()
  const user = await currentUser()
  const quoteLineItems = await getQuoteAction()

  const subject = `Nueva solicitud de cotización - ${quote?.id}`

  const emailPromises = [
    resend.emails.send({
      from: NEXT_PUBLIC_EMAIL_FROM_ADDRESS as string,
      to: NEXT_PUBLIC_EMAIL_RECIPIENT_FOR_QUOTES as string,
      subject,
      react: QuoteForSIIM({
        fromEmail: NEXT_PUBLIC_EMAIL_FROM_ADDRESS ?? 'no-reply@email.siim.cl',
        quote,
        quoteLineItems,
        user,
      }),
    }),
    // resend.emails.send({
    //   from: NEXT_PUBLIC_EMAIL_FROM_ADDRESS as string,
    //   to: mailToSendQuote,
    //   subject,
    //   react: QuoteForUser({
    //     firstName: user?.firstName ?? undefined,
    //     fromEmail: NEXT_PUBLIC_EMAIL_FROM_ADDRESS,
    //     quote,
    //   }),
    // }),
  ]

  Promise.all(emailPromises)
    .then(() => {
      const cookieStore = cookies()
      cookieStore.delete('quoteId')
      toast.success('¡Cotización solicitada correctamente!')
    })
    .catch(() => toast.error('Ocurrió un error, por favor intente nuevamente.'))

  revalidatePath('/')
}

export async function sendQuotePost(email: string) {
  const response = await fetch('/api/email/quote', {
    method: 'POST',
    body: JSON.stringify({
      email,
    }),
  })

  if (response.status === 422) {
    toast.error('Ingreso inválido.')
  }

  if (response.status === 429) {
    toast.error('The daily email limit has been reached.')
  }

  if (response.status === 500) {
    toast.error('Ocurrió un error. Intenta de nuevo más tarde.')
  }

  if (response.ok) {
    toast.success('¡Cotización solicitada con éxito!')
    const cookieStore = cookies()
    cookieStore.delete('quoteId')
  }
}
