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
  sku: string | null
  slug: string
  attributes: {
    nodes: {
      attributeId: number
      label: string
      value: string
    }[]
  } | null
  productCategories: {
    nodes: {
      name: string
      uri: string
    }[]
  }
  featuredImage: {
    node: Image
  } | null
}

export interface WpProductVariation {
  id: string
  name: string
  sku: string
  parent: {
    node: {
      slug: string
      productCategories: {
        nodes: {
          name: string
          uri: string
        }[]
      }
      featuredImage: {
        node: Image
      } | null
    }
  }
  attributes: {
    nodes: {
      attributeId: number
      label: string
      value: string
    }[]
  }
  featuredImage: {
    node: Image
  } | null
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
          node: Image
        } | null
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
          node: Image
        } | null
        galleryImages: {
          nodes: Image[]
        } | null
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

export interface AttributeNode {
  name: string
  options: { label: string; value: string }[]
}

export interface Variations {
  nodes: {
    id: string
    name: string
    sku: string
    featuredImage: {
      node: Image
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

// GET CATEGORY BY SLUG
export interface WpProductCategory {
  productCategory: Category
}

interface Category {
  name: string
  slug: string
  uri: string
  databaseId: number
  parentDatabaseId: number | null
  image: Image | null
  children: { nodes: Category[] | [] }
}

export interface Image {
  uri: string
  altText: string
  guid: string
}
