import { GET_ATTATCHMENT_BY_URI, GET_PRODUCT_BY_SLUG } from '@/wp/queries'
import { type Attatchment, type WpProductBySlug } from '@/wp/types'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { client } from '@/lib/apollo/apollo'

import ProductPageSkeleton from './(modules)/ProductPageSkeleton'
import SimpleProduct from './(modules)/SimpleProduct'
import VariableProduct from './(modules)/VariableProduct'

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = params

  // fetch data
  const { data } = await client.query<WpProductBySlug>({
    query: GET_PRODUCT_BY_SLUG,
    variables: { slug },
  })

  const product = data.products.nodes[0]

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      images: [product.featuredImage?.node.guid ?? '', ...previousImages],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params

  const { data } = await client.query<WpProductBySlug>({
    query: GET_PRODUCT_BY_SLUG,
    variables: { slug },
  })

  const uri = data.products.nodes[0].sku
  const { data: attatchment } = await client.query<Attatchment>({
    query: GET_ATTATCHMENT_BY_URI,
    variables: { uri },
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
          <SimpleProduct product={data} attatchment={attatchment} />
        )}
      </Suspense>
    </div>
  )
}
