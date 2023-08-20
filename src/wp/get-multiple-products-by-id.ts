import { client } from '@/lib/apollo/apollo'
import convertVariationToProduct from '@/utils/convert-variation-to-product'
import { GET_PRODUCT_BY_ID, GET_PRODUCT_VARIATION_BY_ID } from './queries'
import type { WpProduct, WpProductVariation } from './types'

export async function getMultipleProductsById(ids: string[]) {
  const { endsWithEquals, others } = splitIds(ids)

  const variationPromises = endsWithEquals.map((id) =>
    client.query<{ productVariation: WpProductVariation }>({
      query: GET_PRODUCT_VARIATION_BY_ID,
      variables: { id },
    })
  )
  const productPromises = others.map((id) =>
    client.query<{ product: WpProduct }>({
      query: GET_PRODUCT_BY_ID,
      variables: { id },
    })
  )

  try {
    const resultVariations = await Promise.all(variationPromises)
    const resultProducts = await Promise.all(productPromises)
    const mappedVariations = resultVariations.map((v) =>
      convertVariationToProduct(v.data.productVariation)
    )
    const mappedProducts = resultProducts.map((p) => p.data.product)

    return [...mappedVariations, ...mappedProducts]
  } catch (error) {
    alert('Ocurrió un error')
    return []
  }
}

function splitIds(arr: string[]): {
  endsWithEquals: string[]
  others: string[]
} {
  const endsWithEquals: string[] = []
  const others: string[] = []

  arr.forEach((id) => {
    if (id.endsWith('==')) {
      endsWithEquals.push(id)
    } else {
      others.push(id)
    }
  })

  return { endsWithEquals, others }
}
