import Link from 'next/link'
import { type WpCategoryWithAncestors, type WpProductBySlug } from '@/wp/types'
import parse from 'html-react-parser'

import { Button } from '@/components/ui/button'
import Text from '@/components/ui/text'

import ProductCategoryBreadcrumb from './ProductCategoryBreadcrumb'

const SimpleProduct = ({ product }: { product: WpProductBySlug }) => {
  const mappedProduct = product.products.nodes[0]
  const category = mappedProduct.productCategories
    .nodes[0] as WpCategoryWithAncestors

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
          <img
            width="100%"
            className="aspect-square"
            alt={
              mappedProduct.featuredImage.node.altText ??
              'Imagen de producto SIIM'
            }
            src={mappedProduct.featuredImage.node.guid}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className=" h-full w-[1px] bg-border" />
      <div className="relative h-full w-[40%] p-8">
        <div className="sticky top-32 flex w-full flex-col gap-4">
          <ProductCategoryBreadcrumb category={category} />
          <Text variant="heading">{mappedProduct.name}</Text>
          <article className="prose">
            {parse(mappedProduct.shortDescription)}
          </article>

          <div className="flex w-full flex-col">
            <div className="flex w-full content-start gap-1">
              <p>
                <strong>SKU:</strong> {mappedProduct.sku ?? 'N/D'}
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

          <Button className="w-fit">Agregar al cotizador</Button>
        </div>
      </div>
    </div>
  )
}

export default SimpleProduct
