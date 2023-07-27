import { gql } from '@apollo/client'

export const NodeByUri = gql`
  query NodeByUri($uri: ID!) {
    nodeByUri(uri: $uri) {
      ... on Product {
        id
        name
        shortDescription
        price
        image {
          sourceUrl
          altText
        }
      }
      contentNodes(first: 100) {
        edges {
          cursor
          node {
            ... on Product {
              id
              name
              shortDescription
              ... on SimpleProduct {
                price
              }
              ... on VariableProduct {
                price
              }
              image {
                sourceUrl
                altText
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`
