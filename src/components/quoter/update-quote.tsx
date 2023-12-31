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

  return (
    // plus and minus buttons, input field, delete button
    <div className="flex flex-col gap-1 max-w-min h-full">
      <Input
        type="number"
        min="0"
        className="h-full w-full"
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
      <div className="flex items-center gap-1 h-full">
        <Button
          variant="outline"
          size="icon"
          className="h-full min-h-[2rem] w-8"
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

        <Button
          variant="outline"
          size="icon"
          className="h-full min-h-[2rem] w-8"
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

        <Button
          variant="outline"
          size="icon"
          className="h-full min-h-[2rem] w-8"
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
    </div>
  )
}
