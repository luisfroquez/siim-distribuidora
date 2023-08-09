import { client } from '@/lib/apollo/apollo'
import { GET_PRODUCT_BY_ID } from './queries'
import type { WpProduct } from './types'

export async function getMultipleProductsById(ids: String[]) {
  const promises = ids.map((id) =>
    client.query<{ product: WpProduct }>({
      query: GET_PRODUCT_BY_ID,
      variables: { id },
    })
  )
  const results = await Promise.all(promises)

  return results
}
