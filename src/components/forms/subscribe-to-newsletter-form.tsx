'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { emailSchema } from '@/lib/validations/email'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'

type Inputs = z.infer<typeof emailSchema>

export function SubscribeToNewsletterForm() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(data: Inputs) {
    console.log(data)

    startTransition(async () => {
      const response = await fetch('/api/email/newsletter', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          // This token is used as a search param in the email preferences page to identify the subscriber.
          token: crypto.randomUUID(),
          subject: 'Bienvenid@ al boletín de SIIM Distribuidora',
        }),
      })

      if (response.status === 409) {
        toast.error('Ya estás inscrit@ en nuestro boletín.')
      }

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
        toast.success('¡Te suscribiste con éxito!')
        form.reset()
        router.refresh()
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xs gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="ventas@siim.cl"
                  className="pr-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Button
                className="absolute right-[5.2px] top-[5.5px] z-20 h-7 w-7"
                size="icon"
                disabled={isPending}
              >
                {isPending ? (
                  <Icons.spinner
                    className="h-3 w-3 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Icons.send className="h-3 w-3" aria-hidden="true" />
                )}
                <span className="sr-only">
                  Botón para unirte al boletín de noticias
                </span>
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
