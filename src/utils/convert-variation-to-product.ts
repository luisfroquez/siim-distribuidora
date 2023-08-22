import type { WpProduct, WpProductVariation } from '@/wp/types'

export default function convertVariationToProduct(
  variation: WpProductVariation
): WpProduct {
  const {
    id,
    name,
    parent: {
      node: { slug, productCategories, featuredImage: parentFeaturedImage },
    },
    attributes,
    featuredImage: variationFeaturedImage,
  } = variation

  const productCategoriesNodes = productCategories.nodes.map((category) => ({
    name: category.name,
    uri: category.uri,
  }))

  const product: WpProduct = {
    id,
    name,
    sku: variation.sku,
    slug,
    attributes:
      attributes.nodes.length > 0 ? { nodes: attributes.nodes } : null,
    productCategories: { nodes: productCategoriesNodes },
    featuredImage: variationFeaturedImage ?? parentFeaturedImage,
  }

  return product
}
