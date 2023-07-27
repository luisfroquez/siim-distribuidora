interface MyObject {
  slug: string
  children?: { nodes: MyObject[] }
}

function findSlug<T extends MyObject>(slug: string, objects: T[]): T | null {
  for (const item of objects) {
    if (item.slug === slug) {
      return item
    } else if (item?.children?.nodes && item?.children?.nodes?.length > 0) {
      const foundObject = findSlug(slug, item.children.nodes)
      if (foundObject !== null) {
        return foundObject as T
      }
    }
  }

  return null
}

export default findSlug
