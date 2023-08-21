import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Header } from '@/components/header'
import { Shell } from '@/components/shell'
import { Badge } from '@/components/ui/badge'
import CategoryBreadcrumb from '@/components/ui/category-breadcrumb'
import { client } from '@/lib/apollo/apollo'
import { toTitleCase } from '@/lib/utils'
import { GET_CATEGORY_BY_SLUG } from '@/wp/queries'
import { type WpProductCategory } from '@/wp/types'
import { WpProducts } from '../../(modules)/wp-products'

interface Params {
  params: { slug: string[] }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = params.slug.pop() || ''

  const { data } = await client.query<WpProductCategory>({
    query: GET_CATEGORY_BY_SLUG,
    variables: { slug },
  })

  const { productCategory } = data

  return {
    title: productCategory.name,
    description: `Consigue lo mejor en ${
      productCategory.name ?? '-'
    } con SIIM Distribuidora`,
    openGraph: {
      images: [productCategory.image?.uri ?? ''],
    },
  }
}

export default async function Page({ params }: Params) {
  const slug = params.slug.pop() || ''

  const { data } = await client.query<WpProductCategory>({
    query: GET_CATEGORY_BY_SLUG,
    variables: { slug },
  })

  const { productCategory } = data

  const isSubCategory = productCategory?.parentDatabaseId !== null

  return (
    <Shell>
      {/* CATEGORY HEADER */}

      {isSubCategory ? (
        <>
          <CategoryBreadcrumb uri={productCategory.uri} />
          <Header
            title={productCategory?.name || 'Not found'}
            description={`Consigue lo mejor en ${
              productCategory?.name ?? '-'
            } con SIIM Distribuidora`}
            size="sm"
            className="-mt-10 place-items-start rounded-md bg-border p-12 text-left"
          />
        </>
      ) : (
        <div className="group relative overflow-hidden rounded-lg ">
          <div className="h-40 w-full">
            <div className="absolute inset-0 z-10 bg-blue-900/50 transition-colors group-hover:bg-blue-900/70" />
            <Image
              src={productCategory.image?.guid ?? ''}
              alt={productCategory?.name || 'Categoría'}
              fill
              className="object-cover object-top--2 transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 z-20 flex items-center  p-12">
            <Header
              title={toTitleCase(productCategory?.name || '')}
              description={`Consigue lo mejor en ${
                productCategory?.name ?? '-'
              } con SIIM Distribuidora`}
              size="sm"
              className="text-white"
              descriptionClassName="text-gray-200"
            />
          </div>
        </div>
      )}

      {/* SUBCATEGORIES */}
      {productCategory.children.nodes.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-medium">Sub-categorías</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {productCategory.children.nodes.map((subCategory, i) => {
              return (
                <Link
                  aria-label={`Go to ${subCategory.name}`}
                  key={i}
                  href={`/tienda${subCategory.uri}`}
                >
                  <Badge
                    variant="secondary"
                    className="flex h-full w-full items-center justify-center rounded-lg p-4 text-xl"
                  >
                    {subCategory.name}
                  </Badge>
                  <span className="sr-only">{subCategory.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
      <WpProducts categoryId={productCategory.databaseId} />
    </Shell>
  )
}
