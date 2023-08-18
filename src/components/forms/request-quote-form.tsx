'use client'

import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { Icons } from '@/components/icons'
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
import {
  requestQuoteSchema,
  type RequestQuoteInputTypes,
} from '@/lib/validations/quote'
import filtrarCaracteres from '@/utils/filtrar-caracteres'
import { Textarea } from '../ui/textarea'

interface ValidateRutResponse {
  data: {
    rut: string
    valid: boolean
  }
  status: string
}

interface RutDataResponse {
  data: {
    activities: [
      {
        name: string
        code: number
        category: string
        subject_to_vat: boolean
        date: string
      }
    ]
    name: string
    rut: string
  }
  status: string
}

const url = 'https://api.libreapi.cl'

export function RequestQuoteForm() {
  const router = useRouter()
  const { isLoaded, user } = useUser()
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<RequestQuoteInputTypes>({
    resolver: zodResolver(requestQuoteSchema),
    defaultValues: {
      name: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.emailAddresses[0]?.emailAddress ?? '',
      phone: user?.phoneNumbers[0]?.phoneNumber ?? '',
    },
  })

  const rutValue = useWatch<RequestQuoteInputTypes>({
    name: 'rut',
    control: form.control,
  })

  React.useEffect(() => {
    if (!rutValue) return

    const filteredValue = filtrarCaracteres(rutValue)

    if (filteredValue.length === 9) {
      fetch(`${url}/rut/validate?rut=${filteredValue}`, {
        method: 'get',
      })
        .then((response) => response.json()) // pass the data as promise to next then block
        .then((data: ValidateRutResponse) => {
          if (data.data.valid) {
            form.clearErrors('rut')
            fetch(`https://api.libreapi.cl/rut/activities?rut=${filteredValue}`)
              .then((response) => response.json())
              .then((e: RutDataResponse) => {
                form.setValue('razonSocial', e.data.name.toUpperCase())
              })
              .catch((e) => console.log(e))
          } else {
            form.setError('rut', { message: 'RUT No válido' })
          }
        })
        .catch((e) => console.log(e))
    } else if (filteredValue.length > 0) {
      form.setError('rut', { message: 'El RUT debe ser de 9 caracteres' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rutValue])

  function onSubmit(data: RequestQuoteInputTypes) {
    if (!isLoaded) return

    startTransition(async () => {
      const response = await fetch('/api/email/quote', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
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
        router.push('/')
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre *</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Apellido *</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu apellido" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input placeholder="info@siim.cl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="+56 2 3301 0928" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RUT (Empresa)</FormLabel>
              <FormControl>
                <Input placeholder="77.192.195-7 " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="razonSocial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razón Social </FormLabel>
              <FormControl>
                <Input
                  disabled
                  placeholder="Se rellena automáticamente cuando ingreses el RUT..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentarios</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ingresa aquí cualquier comentario que necesites agregar a la cotización (opcional)."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className="w-fit">
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Solicitar cotización
          <span className="sr-only">Solicitar cotización</span>
        </Button>
      </form>
    </Form>
  )
}
