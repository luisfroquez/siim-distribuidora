'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IwsProduct, type Product } from '@/db/schema'

import { formatPrice } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { addToCartAction } from '@/app/_actions/cart'

interface IwsProductCardProps {
  product: IwsProduct
  variant?: 'default' | 'switchable'
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function IwsProductCard({
  product,
  variant = 'default',
  isAddedToCart = false,
  onSwitch,
}: IwsProductCardProps) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <Card className="h-full overflow-hidden rounded-sm">
      <Link
        aria-label={`View ${product.Description} details`}
        href={`/product/${product.Sku}`}
      >
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {product?.Images?.length ? (
              <Image
                src={
                  product.Images[0]?.url ?? '/images/product-placeholder.webp'
                }
                alt={product.Images[0]?.name || product.Description || 'alt'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
      </Link>
      <Link
        aria-label={`Ver detalles del producto ${product.Description}`}
        href={`/products/${product.Sku}`}
      >
        <CardContent className="grid gap-2.5 p-4">
          <CardTitle className="line-clamp-1">{product.Description}</CardTitle>
          {/* <CardDescription className="line-clamp-2">
            {formatPrice(product.price)}
          </CardDescription> */}
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        {variant === 'default' ? (
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <Link
              aria-label="Preview"
              href={`/preview/product/${product.Sku}`}
              className={buttonVariants({
                variant: 'outline',
                size: 'sm',
                className: 'h-8 w-full rounded-sm',
              })}
            >
              Previsualizar
            </Link>
            <Button
              aria-label="Add to cart"
              size="sm"
              className="h-8 w-full rounded-sm"
              // onClick={() => {
              //   startTransition(async () => {
              //     try {
              //       await addToCartAction({
              //         productId: product.Sku,
              //         quantity: 1,
              //       })
              //       toast.success("Added to cart.")
              //     } catch (error) {
              //       error instanceof Error
              //         ? toast.error(error.message)
              //         : toast.error("Something went wrong, please try again.")
              //     }
              //   })
              // }}
              disabled={isPending}
            >
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Agregar al carrito
            </Button>
          </div>
        ) : (
          <Button
            aria-label={
              isAddedToCart ? 'Eliminar del carrito' : 'Agregar al carrito'
            }
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={() => {
              startTransition(async () => {
                await onSwitch?.()
              })
            }}
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : isAddedToCart ? (
              <Icons.check className="mr-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <Icons.add className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {isAddedToCart ? '¡Agregado!' : 'Agregar al carrito'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
