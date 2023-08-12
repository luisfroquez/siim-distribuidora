'use client'

import * as React from 'react'
import { toast } from 'sonner'

import { Icons } from '@/components/icons'

import { addToQuoteAction, deleteQuoteItemAction } from '@/app/_actions/quote'
import type { QuoteLineItem } from '@/types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface UpdateQuoteProps {
  quoteLineItem: QuoteLineItem
}

export function UpdateQuote({ quoteLineItem }: UpdateQuoteProps) {
  const [isPending, startTransition] = React.useTransition()

  // function addToQuoteAction(arg: { productId: any; quantity: number }) {
  //   console.log(arg)
  //   throw new Error('Function not implemented.')
  // }

  return (
    // plus and minus buttons, input field, delete button
    <div className="flex items-center space-x-1">
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            startTransition(() => {
              addToQuoteAction({
                productId: quoteLineItem.id,
                quantity: Number(quoteLineItem.quantity) - 1,
              })
                .then(() => {
                  toast.success('Producto eliminado correctamente')
                })
                .catch((error) => {
                  if (error instanceof Error) {
                    toast.error(error.message)
                  } else {
                    toast.error('Ocurrió un error, intenta nuevamente.')
                  }
                })
            })
          }}
          disabled={isPending}
        >
          <Icons.remove className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">Eliminar un producto</span>
        </Button>
        <Input
          type="number"
          min="0"
          className="h-8 w-14"
          value={quoteLineItem.quantity}
          onChange={(e) => {
            startTransition(() => {
              addToQuoteAction({
                productId: quoteLineItem.id,
                quantity: Number(e.target.value),
              })
                .then(() => {
                  toast.success('Producto agregado correctamente')
                })
                .catch((error) => {
                  if (error instanceof Error) {
                    toast.error(error.message)
                  } else {
                    toast.error('Ocurrió un error, intenta nuevamente.')
                  }
                })
            })
          }}
          disabled={isPending}
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            startTransition(() => {
              addToQuoteAction({
                productId: quoteLineItem.id,
                quantity: Number(quoteLineItem.quantity) + 1,
              })
                .then(() => {
                  toast.success('Producto agregado correctamente')
                })
                .catch((error) => {
                  if (error instanceof Error) {
                    toast.error(error.message)
                  } else {
                    toast.error('Ocurrió un error, intenta nuevamente.')
                  }
                })
            })
          }}
          disabled={isPending}
        >
          <Icons.add className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">Agregar un producto</span>
        </Button>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          startTransition(async () => {
            try {
              await deleteQuoteItemAction({
                productId: quoteLineItem.id,
              })
            } catch (error) {
              error instanceof Error
                ? toast.error(error.message)
                : toast.error('Ocurrió un error, intenta nuevamente.')
            }
          })
        }}
        disabled={isPending}
      >
        <Icons.trash className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Delete item</span>
      </Button>
    </div>
  )
}
