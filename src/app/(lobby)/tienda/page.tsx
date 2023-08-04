'use client'

import { Header } from '@/components/header'
import { Products } from '@/components/products'
import { Shell } from '@/components/shell'
import { GET_ALL_PRODUCTS } from '@/wp/queries'
import type { WpGetAllProducts } from '@/wp/types'
import { useQuery } from '@apollo/client'

const ShopPage = () => {
  const { loading, data, refetch, error } = useQuery<WpGetAllProducts>(
    GET_ALL_PRODUCTS,
    {
      variables: { first: 16, after: '' },
    }
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <Shell>
      <Header
        title="Tienda"
        description="Todos los productos que ofrecemos"
        size="sm"
      />

      <Products
        data={data as WpGetAllProducts}
        pageCount={data?.products?.pageInfo?.total ?? 0}
        // categories={Object.values(products.category.enumValues)}
      />
    </Shell>
  )
}

export default ShopPage
