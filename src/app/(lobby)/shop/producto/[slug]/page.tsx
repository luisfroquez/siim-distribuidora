import { GET_PRODUCT_BY_SLUG } from '@/wp/queries'
import { type WpProductBySlug } from '@/wp/types'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { client } from '@/lib/apollo/apollo'

import ProductPageSkeleton from './(modules)/ProductPageSkeleton'
import SimpleProduct from './(modules)/SimpleProduct'
import VariableProduct from './(modules)/VariableProduct'

export const metadata: Metadata = {
  title: 'Product',
  description: 'Product description',
}

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params

  const { data } = await client.query<WpProductBySlug>({
    query: GET_PRODUCT_BY_SLUG,
    variables: { slug },
  })

  const productId = data?.products?.nodes[0].id

  const productExist = productId !== undefined && productId.length > 0

  const isVariable =
    productExist && data.products.nodes[0].attributes?.nodes.length > 0

  if (!productExist) {
    notFound()
  }

  return (
    <div className="flex flex-1">
      <Suspense fallback={<ProductPageSkeleton />}>
        {isVariable ? (
          <VariableProduct product={data} />
        ) : (
          <SimpleProduct product={data} />
        )}
      </Suspense>
    </div>
  )
}
