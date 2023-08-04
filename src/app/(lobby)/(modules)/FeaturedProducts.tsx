'use client'

import { WpProductCard } from '@/components/wp-product-card'
import { GET_FEATURED_PRODUCTS } from '@/wp/queries'
import type { WpProducts } from '@/wp/types'
import { useQuery } from '@apollo/client'
import FeaturedProductsSkeleton from './FeaturedProductsSkeleton'

const FeaturedProducts = () => {
  const { loading, error, data } = useQuery<WpProducts>(GET_FEATURED_PRODUCTS)
  const featuredProducts = data?.products.nodes

  if (loading) return <FeaturedProductsSkeleton />
  if (error) return `¡Ocurrió un Error! ${error.message}`

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {featuredProducts?.map((fp, i) => (
        <WpProductCard product={fp} key={i} />
      ))}
    </div>
  )
}

export default FeaturedProducts
