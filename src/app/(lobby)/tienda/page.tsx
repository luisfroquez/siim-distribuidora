'use client'

import { WpProducts } from '@/app/(lobby)/tienda/(modules)/wp-products'
import { Header } from '@/components/header'
import { Shell } from '@/components/shell'

const ShopPage = () => {
  return (
    <Shell>
      <Header
        title="Tienda"
        description="Todos los productos que ofrecemos"
        size="sm"
      />

      <WpProducts />
    </Shell>
  )
}

export default ShopPage
