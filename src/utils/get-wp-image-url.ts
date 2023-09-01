import { type Image } from '@/wp/types'

export function getSingleWpImageUrl(node: Image | null | undefined): string {
  if (node) {
    return node.guid.replace('//distribuidora', '//wp')
  } else {
    return '/images/product-placeholder.webp'
  }
}
