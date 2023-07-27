import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getCategoryBySlug } from '@/wp/get-category-by-slug'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'

import { toTitleCase } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import CategoryBreadcrumb from '@/components/ui/category-breadcrumb'
import { Header } from '@/components/header'
import { Shell } from '@/components/shell'

interface Params {
  params: { slug: string[] }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = params.slug.pop() || ''
  const category = await getCategoryBySlug(slug)

  return {
    title: category?.name,
    description: `Consigue lo mejor en ${category?.name} con SIIM Distribuidora`,
    openGraph: {
      images: [`https://source.unsplash.com/featured/?${category?.name}`],
    },
  }
}

export default async function Page({ params }: Params) {
  const slug = params.slug.pop() || ''

  const category = await getCategoryBySlug(slug)

  const isSubCategory = category?.parentDatabaseId !== null

  return (
    <Shell>
      {/* CATEGORY HEADER */}

      {isSubCategory ? (
        <>
          <CategoryBreadcrumb category={category} />
          <Header
            title={category?.name || 'Not found'}
            description={`Consigue lo mejor en ${category?.name} con SIIM Distribuidora`}
            size="sm"
            className="place-items-left -mt-10 rounded-md bg-border p-12 text-left"
          />
        </>
      ) : (
        // </div>
        <div className="group relative overflow-hidden rounded-lg ">
          <div className="h-40 w-full">
            <div className="absolute inset-0 z-10 bg-blue-900/50 transition-colors group-hover:bg-blue-900/70" />
            <Image
              src={`https://source.unsplash.com/featured/?${category?.name}`}
              alt={category?.name || 'Categoría'}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 z-20 flex items-center  p-12">
            <Header
              title={toTitleCase(category?.name || '')}
              description={`Consigue lo mejor en ${category?.name} con SIIM Distribuidora`}
              size="sm"
              className="text-white"
              descriptionClassName="text-gray-200"
            />
          </div>
        </div>
      )}

      {/* SUBCATEGORIES */}
      {category?.children && category.children.nodes.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-medium">Sub-categorías</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {category.children.nodes?.map((subCategory, i) => (
              <Link
                aria-label={`Go to ${subCategory.name}`}
                key={i}
                href={`/shop${subCategory.uri}`}
              >
                <Badge
                  variant="secondary"
                  className="flex h-full w-full items-center justify-center rounded-lg p-4 text-xl"
                >
                  {subCategory.name}
                </Badge>
                <span className="sr-only">{subCategory.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Shell>
  )
}
