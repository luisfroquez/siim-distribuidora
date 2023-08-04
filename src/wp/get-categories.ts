import { gql, NetworkStatus } from '@apollo/client'

import { client } from '@/lib/apollo/apollo'

import type { WpCategories } from './types'

const GET_CATEGORIES = gql`
  query GetCategories {
    productCategories(where: { parent: null }) {
      nodes {
        name
        parentDatabaseId
        databaseId
        description
        slug
        uri
        children {
          nodes {
            name
            parentDatabaseId
            databaseId
            description
            slug
            uri
            children {
              nodes {
                name
                parentDatabaseId
                databaseId
                description
                slug
                uri
                children {
                  nodes {
                    name
                    parentDatabaseId
                    databaseId
                    description
                    slug
                    uri
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

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
