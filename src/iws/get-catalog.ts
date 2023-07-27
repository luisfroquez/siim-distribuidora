import { fetchApiData } from './api'
import { GetCatalogParams, Product } from './types'

export const getCatalog = async (): Promise<Product[]> => {
  const data = await fetchApiData<Product[], GetCatalogParams>('getcatalog', {
    locale: 'es',
  })

  return data
}
