import { fetchApiData } from './api'
import type { GetProductsParams, Product } from './types'

export const getProducts = async (
  params?: GetProductsParams
): Promise<Product[]> => {
  const data = await fetchApiData<Product[], GetProductsParams>('getproducts', {
    locale: 'es',
    inventoryFilter: 'Any',
    ...params,
  })

  return data
}
