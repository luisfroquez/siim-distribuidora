export interface WpCategories {
  name: string
  parentDatabaseId: number | null
  databaseId: number
  description?: string
  slug: string
  uri: string
  children?: { nodes: WpCategories[] | [] }
}

export interface WpAncestorCategoryNode {
  name: string
  uri: string
}

export interface WpCategoryWithAncestors {
  ancestors: {
    nodes: WpAncestorCategoryNode[]
  }
  name: string
  uri: string
}

export interface WpProduct {
  id: string
  name: string
  sku: string
  slug: string
  attributes: {
    nodes: {
      attributeId: number
    }[]
  }
  productCategories: {
    nodes: {
      name
      uri
    }[]
  }
  featuredImage: {
    node: {
      id: string
      altText: string
      guid: string
    }
  }
}

export interface WpProducts {
  products: {
    nodes: WpFeaturedProduct[]
  }
}

export interface WpGetAllProducts {
  products: {
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      total: number
      startCursor: string
      endCursor: string
    }
    edges: { cursor: string; node: WpProduct }[]
  }
}

export interface WpGetAllProductsVariables {
  size: number
  offset: number
  orderByField: ProductsOrderByEnum
  orderByOrder: OrderEnum
  featured?: boolean
  categoryId?: number
}

export interface WpSearchResult {
  products: {
    nodes: [
      {
        name: string
        slug: string
        featuredImage: {
          node: {
            altText: string
            guid: string
          }
        }
      }
    ]
  }
  productCategories: {
    nodes: [
      {
        name: string
        slug: string
      }
    ]
  }
  productTags: {
    nodes: [
      {
        name: string
        slug: string
      }
    ]
  }
}

export interface WpImageNode {
  altText: string
  guid: string
}

export interface WpAttributeNode {
  name: string
}

export interface WpProductBySlug {
  products: {
    nodes: [
      {
        id: string
        name: string
        shortDescription: string
        content: string | null
        description: string | null
        featured: boolean
        sku: string | null
        featuredImage: {
          node: WpImageNode
        }
        galleryImages: {
          nodes: WpImageNode[]
        }
        attributes: {
          nodes: WpAttributeNode[]
        }
        productCategories: {
          nodes: WpCategoryWithAncestors[]
        }
        productTags: {
          nodes: WpTagNode[]
        }
        variations: Variations
      }
    ]
  }
}

export interface WpImageNode {
  altText: string
  guid: string
}

export interface AttributeNode {
  name: string
  options: { label: string; value: string }[]
}

export interface Variations {
  nodes: {
    sku: string
    featuredImage: {
      node: WpImageNode
    }
    attributes: {
      nodes: {
        attributeId: number
        value: string
        label: string
      }[]
    }
  }[]
}

export interface Attributes {
  nodes: AttributeNode[]
}
