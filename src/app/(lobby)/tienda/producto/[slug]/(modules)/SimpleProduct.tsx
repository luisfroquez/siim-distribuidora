'use client'

import {
  type Attatchment,
  type WpCategoryWithAncestors,
  type WpProductBySlug,
} from '@/wp/types'
import parse from 'html-react-parser'
import Link from 'next/link'

import { Button, buttonVariants } from '@/components/ui/button'
import Text from '@/components/ui/text'

import { addToQuoteAction } from '@/app/_actions/quote'
import { Icons } from '@/components/icons'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { FileText } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import LeftSideProduct from './LeftSideProduct'
import ProductCategoryBreadcrumb from './ProductCategoryBreadcrumb'

const SimpleProduct = ({
  product,
  attatchment,
}: {
  product: WpProductBySlug
  attatchment: Attatchment
}) => {
  const [isPending, startTransition] = useTransition()
  const [quantity, setQuantity] = useState(1)
  const mappedProduct = product.products.nodes[0]
  const category = mappedProduct.productCategories
    .nodes[0] as WpCategoryWithAncestors

  return (
    <div className="flex flex-1">
      {/* LEFT SIDE */}
      <LeftSideProduct
        product={product}
        image={mappedProduct.featuredImage?.node}
      />

      {/* RIGHT SIDE */}
      <div className=" h-full w-[1px] bg-border" />
      <div className="relative h-full w-[40%] p-8">
        <div className="sticky top-32 flex w-full flex-col gap-4">
          <ProductCategoryBreadcrumb category={category} />
          <Text variant="heading">{mappedProduct.name}</Text>
          <p>{parse(mappedProduct.shortDescription)}</p>

          <div className="flex w-full flex-col">
            <div className="flex w-full content-start gap-1">
              <p>
                <strong>SKU:</strong> {mappedProduct.sku ?? 'N/D'}
              </p>
            </div>
            <div className="flex w-full content-start gap-1">
              <p className="font-bold">Categoría:</p>
              <Link
                href={`/tienda${category.uri}`}
                aria-label={`Ir a ${category.name}`}
                className="hover:underline"
              >
                {category.name}
              </Link>
            </div>
          </div>

          <div className="flex gap-2 items-stretch h-9">
            <Button
              variant="outline"
              size="icon"
              className="h-full w-9"
              onClick={() => setQuantity((prev) => prev - 1)}
              disabled={isPending || quantity === 1}
            >
              <Icons.remove className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Restar uno a la cantidad</span>
            </Button>

            <Input
              type="number"
              min="1"
              className="h-full w-[6rem]"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={isPending}
            />

            <Button
              variant="outline"
              size="icon"
              className="h-full w-9"
              onClick={() => setQuantity((prev) => prev + 1)}
              disabled={isPending}
            >
              <Icons.add className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Sumar uno a la cantidad</span>
            </Button>

            <Button
              className="h-full w-fit ml-2"
              onClick={() => {
                startTransition(async () => {
                  try {
                    await addToQuoteAction({
                      productId: mappedProduct.id,
                      quantity,
                    })
                    toast.success('¡Agregado al Cotizador!')
                  } catch (error) {
                    error instanceof Error
                      ? toast.error(error.message)
                      : toast.error(
                          'Ocurrió un error, por favor intente nuevamente.'
                        )
                  }
                })
              }}
              disabled={isPending}
            >
              Agregar al cotizador
            </Button>
          </div>
          {attatchment.contentNode && (
            <Link href={attatchment.contentNode?.guid} target="_blank">
              <div
                className={cn(
                  buttonVariants({
                    size: 'lg',
                    variant: 'secondary',
                  })
                )}
              >
                <FileText className="pr-2" /> Ver ficha técnica
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default SimpleProduct
