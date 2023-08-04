import findSlug from '@/utils/find-slug'

import { getCategories } from './get-categories'
import type { WpCategories } from './types'

export async function getCategoryBySlug(
  slug: string
): Promise<WpCategories | null> {
  const { data } = await getCategories()

  if (data) {
    return findSlug(slug, data)
  } else {
    return null
  }
}
