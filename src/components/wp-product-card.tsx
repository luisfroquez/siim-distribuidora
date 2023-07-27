'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { getWpImageUrl } from '@/utils/get-wp-image-url'
import { WpProduct } from '@/wp/types'
import { toast } from 'sonner'

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

interface WpProductCardProps {
  product: WpProduct
  variant?: 'default' | 'switchable'
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function WpProductCard({
  product,
  variant = 'default',
  isAddedToCart = false,
  onSwitch,
}: WpProductCardProps) {
  const [isPending, startTransition] = useTransition()

  const image = product?.featuredImage.node

  return (
    <Card className="smooth-700 flex h-full flex-col justify-between overflow-hidden rounded-xl hover:bg-border/20">
      <Link
        aria-label={`Ver detalles del producto:  ${product.name}`}
        href={`/shop/producto/${product.slug}`}
      >
        <CardHeader className="border-b bg-white p-0">
          <AspectRatio ratio={4 / 3}>
            <img
              src={getWpImageUrl(image.guid)}
              alt={image.altText ?? product.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </AspectRatio>
        </CardHeader>
      </Link>

      <CardContent className="grid h-full gap-2.5 p-4">
        <CardTitle className="line-clamp-2 leading-6 ">
          {product.name}
        </CardTitle>
      </CardContent>
      <CardFooter className="justify-self-end p-4">
        {variant === 'default' ? (
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <Link
              aria-label="Ver detalles"
              href={`/shop/producto/${product.slug}`}
              className={buttonVariants({
                variant: 'outline',
                size: 'sm',
                className: 'h-8 w-full rounded-sm',
              })}
            >
              Ver detalles
            </Link>
            <Button
              aria-label="Añadir al cotizador"
              size="sm"
              className="h-8 w-full rounded-sm"
              // onClick={() => {
              //   startTransition(async () => {
              //     try {
              //       await addToCartAction({
              //         productId: product.sku,
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
              Añadir al cotizador
            </Button>
          </div>
        ) : (
          <Button
            aria-label={isAddedToCart ? 'Remove from cart' : 'Add to cart'}
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
            {isAddedToCart ? 'Added' : 'Add to cart'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
