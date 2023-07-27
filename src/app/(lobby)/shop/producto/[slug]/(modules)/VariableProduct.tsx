'use client'

import { useState } from 'react'
import Link from 'next/link'
import { convertVariationsToAttributeNode } from '@/utils/convert-variations-to-attribute-node'
import { WpCategoryWithAncestors, WpProductBySlug } from '@/wp/types'
import parse from 'html-react-parser'

import { Button } from '@/components/ui/button'
import Text from '@/components/ui/text/Text'

import AttributeSelect from './AttributeSelect'
import ProductCategoryBreadcrumb from './ProductCategoryBreadcrumb'

const VariableProduct = ({ product }: { product: WpProductBySlug }) => {
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
    .map((e) => ({ sku: e.sku, img: e.featuredImage }))

  const selectedSKUs = selected.map((s) => s.sku)
  const selectedImage = selected.map((s) => s.img)[0]

  const hasSKUs = selectedSKUs.length > 0
  const hasSelectedAttribute = cleanSelectedAttributes.length > 0

  const attributesNodes = convertVariationsToAttributeNode(variations)

  console.log(product)

  return (
    <div className="flex flex-1">
      {/* LEFT SIDE */}
      <div className="flex h-full w-[60%] gap-4 p-8">
        {mappedProduct.galleryImages.nodes.length > 0 && (
          <div className="flex w-32 flex-col gap-4 ">
            {mappedProduct.galleryImages.nodes.map((img, i) => (
              <div key={i} className="aspect-square w-full rounded-xl bg-white">
                <img
                  src={img.guid}
                  alt={img.altText ?? 'Imagen de producto SIIM'}
                />
              </div>
            ))}
          </div>
        )}

        {/* FEATURED IMAGE */}
        <div className="flex  aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-white p-16">
          {hasSelectedAttribute &&
          hasSKUs &&
          selectedImage?.node?.guid !== undefined ? (
            <img
              width="100%"
              className="aspect-square object-contain"
              alt={selectedImage?.node.altText ?? 'Imagen de producto SIIM'}
              src={selectedImage?.node.guid}
            />
          ) : (
            <img
              width="100%"
              className="aspect-square"
              alt={
                mappedProduct.featuredImage.node.altText ??
                'Imagen de producto SIIM'
              }
              src={mappedProduct.featuredImage.node.guid}
            />
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className=" h-full w-[1px] bg-border" />
      <div className="relative h-full w-[40%] p-8">
        <div className="sticky top-32 flex w-full flex-col gap-4">
          <ProductCategoryBreadcrumb category={category} />
          <Text variant="heading">{mappedProduct.name}</Text>
          <article className="text-gray-900 dark:text-white">
            {parse(mappedProduct.shortDescription)}
          </article>

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
                href={`/shop${category.uri}`}
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
            <p className="opacity-80">
              Hay {selectedSKUs.length} productos diferentes con esta
              combinación de atributos. ¿Quieres cotizarlos todos?
            </p>
          )}

          <Button className="w-fit" disabled={!hasSKUs}>
            Agregar al cotizador
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VariableProduct
