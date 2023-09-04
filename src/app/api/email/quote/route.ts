import { type ErrorResponse } from 'resend'
import { z } from 'zod'

import { getQuote, getQuoteAction } from '@/app/_actions/quote'
import QuoteForClient from '@/components/emails/quote-for-client'
import QuoteForSIIM from '@/components/emails/quote-for-siim'
import { resend } from '@/lib/resend'
import { requestQuoteSchema } from '@/lib/validations/quote'

export async function POST(req: Request) {
  const input = requestQuoteSchema.parse(await req.json())

  try {
    const quote = await getQuote()
    const quoteLineItems = await getQuoteAction()

    await resend.emails.send({
      from: 'Cotizaciones SIIM Distribudora <no-reply@email.siim.cl>',
      to: 'ventas@siim.cl',
      subject: `Nueva solicitud de cotización N°${quote?.id ?? '-'}`,
      react: QuoteForSIIM({
        input,
        quote,
        quoteLineItems,
      }),
    })

    await resend.emails.send({
      from: 'Cotizaciones SIIM Distribudora <no-reply@email.siim.cl>',
      to: input.email,
      subject: `Recibimos tu solicitud de cotización N°${quote?.id ?? '-'}`,
      react: QuoteForClient({
        input,
        quote,
        quoteLineItems,
      }),
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    const resendError = error as ErrorResponse

    if (resendError?.error?.message) {
      return new Response(resendError.error.message, { status: 429 })
    }

    if (error instanceof Error) {
      return new Response(error.message, { status: 500 })
    }

    return new Response('Ocurrió un error', { status: 500 })
  }
}
