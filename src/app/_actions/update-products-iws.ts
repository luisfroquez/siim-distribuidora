'use server'

import { db } from '@/db'
import { iwsProductImages, iwsProducts } from '@/db/schema'
import { getCatalog } from '@/iws/get-catalog'
import { getExtendedCatalog } from '@/iws/get-extended-catalog'
import type { Product } from '@/iws/types'

export async function updateIwsProducts() {
  await db.delete(iwsProducts)
  await db.delete(iwsProductImages)

  // PRODUCTS

  const data = await getCatalog()
  const hikOnly = data.filter((d) => d.Brand.BrandId === 'hik')

  for (let i = 0; i < hikOnly.length; i++) {
    const item = hikOnly[i] as Product

    await db.insert(iwsProducts).values({
      Sku: item.Sku,
      Mpn: item.Mpn,
      Type: item.Type,
      Description: item.Description,
      Brand: item.Brand,
      Category: item.Category,
    })
  }

  // IMAGES
  const extendedData = await getExtendedCatalog()
  const extendedHikOnly = extendedData.filter(
    (e) => e.DescripcionFabrica === 'Hikvision'
  )

  for (let i = 0; i < extendedHikOnly.length; i++) {
    const item = extendedHikOnly[i]
    if (item) {
      await db.insert(iwsProductImages).values({
        productSku: item.localSku,
        images: item.Imagenes,
      })
    }
  }
}
