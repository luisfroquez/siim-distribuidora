import { NetworkStatus } from '@apollo/client'

import { client } from '@/lib/apollo/apollo'

import { GET_CATEGORIES } from './queries'
import type { WpCategories } from './types'

interface GetCategoriesResponse {
  productCategories: {
    nodes: WpCategories[]
  }
}

export async function getCategories() {
  try {
    const response = await client.query<GetCategoriesResponse>({
      query: GET_CATEGORIES,
    })

    return {
      isLoading: response.loading,
      isSuccess: response.networkStatus === NetworkStatus.ready,
      data: response.data?.productCategories?.nodes,
      error: response.error ?? undefined, // Safe handling of error
    }
  } catch (e) {
    return {
      isSuccess: false,
      data: undefined,
      error: e,
    }
  }
}
