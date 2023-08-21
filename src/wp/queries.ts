import { gql } from '@apollo/client'

export const GET_CATEGORIES = gql`
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
export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      name
      slug
      uri
      databaseId
      parentDatabaseId
      image {
        uri
        altText
        guid
      }
      children {
        nodes {
          name
          slug
          uri
          parentDatabaseId
          image {
            uri
            altText
            guid
          }
        }
      }
    }
  }
`

export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts {
    products(where: { featured: true }, first: 8) {
      nodes {
        id
        name
        sku
        slug
        attributes {
          nodes {
            attributeId
          }
        }
        productCategories {
          nodes {
            name
            uri
          }
        }
        featuredImage {
          node {
            id
            altText
            guid
          }
        }
      }
    }
  }
`
export const GET_ALL_PRODUCTS_NO_FILTERS = gql`
  query GetAllProducts {
    products {
      pageInfo {
        hasNextPage
        hasPreviousPage
        total
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          name
          sku
          slug
          attributes {
            nodes {
              attributeId
            }
          }
          productCategories {
            nodes {
              name
              uri
            }
          }
          featuredImage {
            node {
              id
              altText
              guid
            }
          }
        }
      }
    }
  }
`
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts(
    $size: Int!
    $offset: Int!
    $orderByField: ProductsOrderByEnum!
    $orderByOrder: OrderEnum
    $featured: Boolean
    $categoryId: Int
  ) {
    products(
      where: {
        orderby: { field: $orderByField, order: $orderByOrder }
        featured: $featured
        categoryId: $categoryId
        offsetPagination: { size: $size, offset: $offset }
      }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        total
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          name
          sku
          slug
          attributes {
            nodes {
              attributeId
            }
          }
          productCategories {
            nodes {
              name
              uri
            }
          }
          featuredImage {
            node {
              id
              altText
              guid
            }
          }
        }
      }
    }
  }
`
export const SEARCH_PRODUCTS = gql`
  query searchProducts($search: String!) {
    products(where: { search: $search }) {
      nodes {
        id
        name
        sku
        slug
        attributes {
          nodes {
            attributeId
          }
        }
        productCategories {
          nodes {
            name
            uri
          }
        }
        featuredImage {
          node {
            id
            altText
            guid
          }
        }
      }
    }
  }
`
export const SEARCH_PRODUCTS_CATEGORIES_TAGS = gql`
  query searchProductsAndCategoriesAndTags($search: String!) {
    products(where: { search: $search }, first: 5) {
      nodes {
        name
        slug
        featuredImage {
          node {
            altText
            guid
          }
        }
      }
    }
    productCategories(where: { search: $search }, first: 5) {
      nodes {
        name
        slug
      }
    }
    productTags(where: { search: $search }) {
      nodes {
        name
        slug
      }
    }
  }
`
export const GET_PRODUCT_BY_ID = gql`
  query ProductById($id: ID!) {
    product(id: $id) {
      id
      name
      sku
      slug
      attributes {
        nodes {
          attributeId
        }
      }
      productCategories {
        nodes {
          name
          uri
        }
      }
      featuredImage {
        node {
          id
          altText
          guid
        }
      }
    }
  }
`
export const GET_PRODUCT_VARIATION_BY_ID = gql`
  query ProducVariationtById($id: ID!) {
    productVariation(id: $id) {
      id
      name
      sku
      parent {
        node {
          slug
          productCategories {
            nodes {
              name
              uri
            }
          }
          featuredImage {
            node {
              id
              altText
              guid
            }
          }
        }
      }
      attributes {
        nodes {
          attributeId
          label
          value
        }
      }
      featuredImage {
        node {
          id
          altText
          guid
        }
      }
    }
  }
`
export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: [String]) {
    products(where: { slugIn: $slug }) {
      nodes {
        id
        name
        shortDescription
        content
        description
        featured
        sku
        featuredImage {
          node {
            altText
            guid
          }
        }
        galleryImages {
          nodes {
            altText
            guid
          }
        }
        attributes {
          nodes {
            name
          }
        }
        productCategories {
          nodes {
            ancestors {
              nodes {
                name
                uri
              }
            }
            name
            uri
          }
        }
        productTags {
          nodes {
            name
            slug
          }
        }
        ... on VariableProduct {
          variations {
            nodes {
              id
              name
              sku
              featuredImage {
                node {
                  altText
                  guid
                }
              }
              attributes {
                nodes {
                  attributeId
                  value
                  label
                }
              }
            }
          }
        }
      }
    }
  }
`
