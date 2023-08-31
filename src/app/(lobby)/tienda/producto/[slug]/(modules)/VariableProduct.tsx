'use client'

import { convertVariationsToAttributeNode } from '@/utils/convert-variations-to-attribute-node'
import {
  type Attatchment,
  type WpCategoryWithAncestors,
  type WpProductBySlug,
} from '@/wp/types'
import parse from 'html-react-parser'
import Link from 'next/link'
import { useEffect, useState, useTransition } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import Text from '@/components/ui/text/Text'

import { addToQuoteAction } from '@/app/_actions/quote'
import { Icons } from '@/components/icons'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { GET_ATTATCHMENT_BY_URI } from '@/wp/queries'
import { useQuery } from '@apollo/client'
import { FileText } from 'lucide-react'
import { toast } from 'sonner'
import AttributeSelect from './AttributeSelect'
import LeftSideProduct from './LeftSideProduct'
import ProductCategoryBreadcrumb from './ProductCategoryBreadcrumb'

const VariableProduct = ({ product }: { product: WpProductBySlug }) => {
  const [isPending, startTransition] = useTransition()
  const [quantity, setQuantity] = useState(1)

  const mappedProduct = product.products.nodes[0]
  const category = mappedProduct.productCategories
    .nodes[0] as WpCategoryWithAncestors

  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])
  const cleanSelectedAttributes = selectedAttributes.filter((s) => s)

  const variations = mappedProduct.variations

  const attributeLabels = mappedProduct.attributes.nodes

  const selected = mappedProduct.variations.nodes
    .filter((sku) => {
      return cleanSelectedAttributes.every((id) =>
        sku.attributes.nodes.some((node) => node.attributeId.toString() === id)
      )
    })
    .map((e) => ({ sku: e.sku, img: e.featuredImage, id: e.id }))

  const selectedSKUs = selected.map((s) => s.sku)
  const selectedImage = selected.map((s) => s.img)[0]

  const hasSKUs = selectedSKUs.length > 0
  const hasSelectedAttribute = cleanSelectedAttributes.length > 0
  const isOnlyOneSKUSelected = selectedSKUs.length === 1
  const selectedSKU = selectedSKUs[0]

  const attributesNodes = convertVariationsToAttributeNode(variations)

  const { data: attatchment, refetch } = useQuery<Attatchment>(
    GET_ATTATCHMENT_BY_URI,
    {
      variables: { uri: selectedSKU ?? '' },
    }
  )

  useEffect(() => {
    if (isOnlyOneSKUSelected && selected[0]?.sku) {
      refetch()
        .then()
        .catch((e) => alert(e))
    }
  }, [selectedSKU])

  const imageToShow =
    hasSelectedAttribute && hasSKUs && selectedImage?.node?.guid !== undefined
      ? selectedImage?.node
      : mappedProduct.featuredImage?.node

  return (
    <div className="flex flex-1">
      {/* LEFT SIDE */}
      <LeftSideProduct product={product} image={imageToShow} />

      {/* DIVIDER */}
      <div className=" h-full w-[1px] bg-border" />

      {/* RIGHT SIDE */}
      <div className="relative h-full w-[40%] p-8">
        <div className="sticky top-32 flex w-full flex-col gap-4">
          <ProductCategoryBreadcrumb category={category} />
          <Text variant="heading">{mappedProduct.name}</Text>
          <p>{parse(mappedProduct.shortDescription)}</p>

          <div className="flex flex-col gap-2 pb-4">
            {attributesNodes.nodes.map((attr, i) => {
              return (
                <AttributeSelect
                  key={i}
                  label={attributeLabels[i]?.name ?? 'Atributo'}
                  options={attr.options}
                  onValueChange={(value) => {
                    selectedAttributes[i] = value
                    setSelectedAttributes([...selectedAttributes])
                  }}
                />
              )
            })}
          </div>

          <div className="flex w-full flex-col">
            <div className="flex w-full content-start gap-1">
              <p>
                <strong>SKU:</strong>{' '}
                {hasSKUs ? selectedSKUs.join(', ') : 'N/D'}
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

          {!hasSKUs && (
            <p className="opacity-80">
              No tenemos productos disponibles con esa combinación de atributos.
            </p>
          )}
          {selectedSKUs.length > 1 && (
            <p className="opacity-80 text-xs">
              Hay {selectedSKUs.length} variaciones diferentes de este producto
              con la combinación de atributos seleccionada. Si deseas cotizar
              varios o todas las variaciones de este, debes agregar al cotizador
              cada variacion de forma individual.
            </p>
          )}

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
              disabled={!isOnlyOneSKUSelected || isPending}
              onClick={() => {
                startTransition(async () => {
                  try {
                    await addToQuoteAction({
                      productId: selected[0]?.id ?? '',
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
            >
              Agregar al cotizador
            </Button>
          </div>

          {/* ATTATCHMENT */}
          {attatchment?.contentNode && (
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

export default VariableProduct
