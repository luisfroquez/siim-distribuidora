import { gql, NetworkStatus } from '@apollo/client'

import { client } from '@/lib/apollo/apollo'

import { WpCategories } from './types'

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

export async function getCategories() {
  return client
    .query({
      query: GET_CATEGORIES,
    })
    .then((d) => ({
      isLoading: d.loading,
      isSuccess: d.networkStatus === NetworkStatus.ready,
      data: d.data?.productCategories?.nodes as WpCategories[],
      error: d.error,
    }))
    .catch((e) => ({
      isSuccess: false,
      data: undefined,
      error: e,
    }))
}
