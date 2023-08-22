'use client'
import { addToQuoteAction, deleteQuoteItemAction } from '@/app/_actions/quote'
import { type QuoteLineItem } from '@/types'
import { getSingleWpImageUrl } from '@/utils/get-wp-image-url'
import Image from 'next/image'
import Link from 'next/link'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Icons } from '../icons'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface RenderQuotLineItemsProps {
  item: QuoteLineItem
}

const RenderQuotLineItems = ({ item }: RenderQuotLineItemsProps) => {
  const [isPending, startTransition] = useTransition()
  const category =
    item.productCategories.nodes[item.productCategories.nodes.length - 1]
  return (
    <div className="flex gap-4 bg-muted/60 rounded-lg p-2">
      {/* image + name + description */}
      <div className="flex gap-2 w-full">
        {item?.featuredImage ? (
          <div className="relative w-[10rem] self-start aspect-square overflow-hidden rounded">
            <Link href={`/tienda/producto/${item.slug}`}>
              <Image
                src={getSingleWpImageUrl(item.featuredImage.node)}
                alt={item.featuredImage.node.altText ?? item.name}
                fill
                className="absolute object-cover"
                loading="lazy"
              />
            </Link>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary">
            <Icons.placeholder
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="flex flex-col w-full">
          {/* NAME */}
          <Link
            href={`/tienda/producto/${item.slug}`}
            aria-label={`Ir a ${item.name}`}
            className="hover:underline font-bold"
          >
            <span className="line-clamp-2 ">{item.name}</span>
          </Link>

          <p className="pt-1 text-xs">
            <strong>SKU:</strong> {item.sku}
          </p>

          <span className="flex content-start gap-1 text-xs">
            <p className="font-bold">Categoría:</p>
            <Link
              href={`/tienda${category?.uri as string}`}
              aria-label={`Ir a ${category?.name as string}`}
              className="hover:underline"
            >
              {category?.name}
            </Link>
          </span>

          {/* attr */}
          {item.attributes && (
            <div className="flex flex-wrap gap-1 pt-2">
              {item.attributes.nodes.map((a) => (
                <Badge variant="mutedForegroundOutline" className="h-auto">
                  {a.value}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* btns */}
      <div className="flex flex-col gap-1 max-w-min">
        <Input
          type="number"
          min="0"
          className="h-8 w-full"
          value={item.quantity}
          onChange={(e) => {
            startTransition(() => {
              addToQuoteAction({
                productId: item.id,
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
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              startTransition(() => {
                addToQuoteAction({
                  productId: item.id,
                  quantity: Number(item.quantity) - 1,
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
            className="h-8 w-8"
            onClick={() => {
              startTransition(() => {
                addToQuoteAction({
                  productId: item.id,
                  quantity: Number(item.quantity) + 1,
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
            className="h-8 w-8"
            onClick={() => {
              startTransition(async () => {
                try {
                  await deleteQuoteItemAction({
                    productId: item.id,
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
    </div>
  )
}

export default RenderQuotLineItems
