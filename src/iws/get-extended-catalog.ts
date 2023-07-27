import { fetchApiData } from './api'
import { GetCatalogParams, ProductsList } from './types'

export const getExtendedCatalog = async (): Promise<any[]> => {
  const data = await fetchApiData<any[], GetCatalogParams>(
    'downloadextendedcatalog',
    { locale: 'es' }
  )

  return data
}
