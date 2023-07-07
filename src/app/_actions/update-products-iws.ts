'use server'

import { db } from '@/db'
import { iwsProducts, products } from '@/db/schema'
import { getCatalog } from '@/iws/get-products-list'
import { ProductsList } from '@/iws/types'

import {
  getSubcategories,
  productCategories,
  productTags,
} from '@/config/products'

export async function updateProducts() {
  const data = await getCatalog()

  const hikProductsOnly = data.filter((d) => d.Brand.BrandId === 'hik')

  for (let i = 0; i < hikProductsOnly.length; i++) {
    const item = hikProductsOnly[i] as ProductsList

    await db.insert(iwsProducts).values({
      Sku: item.Sku,
      BrandId: item.Brand.BrandId,
      CategoryId: item.Category.CategoryId,
      Mpn: item.Mpn,
      Description: item.Mpn,
      Images: undefined,
    })
  }
}
