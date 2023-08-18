'use client'

import { User } from '@clerk/nextjs/dist/types/server'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const QuoteButtons = ({ user }: { user: User | null }) => {
  const [isPending, startTransition] = useTransition()

  const [email, setEmail] = useState<string>(
    user?.emailAddresses[0]?.emailAddress ?? ''
  )

  const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')

  const isValid = regex.test(email)

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-full flex flex-col gap-1 items-start">
        <p className="text-sm font-bold pr-4">Correo para recibir cotización</p>
        <Input
          placeholder="ventas@siim.cl"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`h-12 placeholder:opacity-60  ${
            !isValid ? 'border-red-500' : ''
          } smooth-500`}
        />
        <p
          className={`text-xs pr-4 text-red-500   ${
            !isValid ? 'opacity-100' : 'opacity-0'
          }  smooth-500`}
        >
          Debe ingresar un correo válido
        </p>
      </div>
      <Button
        aria-label="Solicitar cotización"
        size="lg"
        className="w-full h-12 smooth-500"
        disabled={!isValid || isPending}
        onClick={() => {
          startTransition(async () => {
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
              console.log(response)
            }

            if (response.ok) {
              toast.success('¡Cotización solicitada con éxito!')
              // const cookieStore = cookies()
              // cookieStore.delete('quoteId')
            }
          })

          // startTransition(async () => {
          //   sendQuotePost(email)
          // })
        }}
      >
        {isPending && (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        Solicitar cotización
        <span className="sr-only">Solicitar cotización</span>
      </Button>
    </div>
  )
}

export default QuoteButtons
