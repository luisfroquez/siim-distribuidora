import { fetchApiData } from './api'
import type { ExtendedProduct, GetCatalogParams } from './types'

export const getExtendedCatalog = async (): Promise<ExtendedProduct[]> => {
  const data = await fetchApiData<ExtendedProduct[], GetCatalogParams>(
    'downloadextendedcatalog',
    { locale: 'es' }
  )

  return data
}
