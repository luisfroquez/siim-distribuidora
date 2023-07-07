import { fetchApiData } from './api'
import { GetCatalogParams, ProductsList } from './types'

export const getCatalog = async (): Promise<ProductsList[]> => {
  const data = await fetchApiData<ProductsList[], GetCatalogParams>(
    'getcatalog',
    { locale: 'es' }
  )

  return data
}
