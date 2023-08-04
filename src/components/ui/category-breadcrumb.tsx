import { getCategoryBySlug } from '@/wp/get-category-by-slug'
import { type WpCategories } from '@/wp/types'
import Link from 'next/link'

interface CategoryBreadcrumbProps {
  category: WpCategories | null
}

const CategoryBreadcrumb = async ({ category }: CategoryBreadcrumbProps) => {
  const items = category?.uri
    .slice(20)
    .split('/')
    .filter((e) => e !== '/')
    .filter(Boolean)

  const promisesArray: Promise<WpCategories>[] = []

  if (items) {
    items?.forEach((e) => {
      const promise = getCategoryBySlug(e)

      promisesArray.push(promise as Promise<WpCategories>)
    })
  }

  const [...categories]: WpCategories[] = await Promise.all(promisesArray)

  return (
    <div className="mb-4 flex w-full gap-2  py-2 text-xs">
      {categories.map((c, i) => {
        const isLast = i === categories.length - 1

        return (
          <>
            <Link
              href={`/shop${c.uri}`}
              aria-label={`Ir a ${c.name}`}
              key={i}
              className="hover:underline"
            >
              {c.name}
            </Link>
            {!isLast && <p>/</p>}
          </>
        )
      })}
    </div>
  )
}

export default CategoryBreadcrumb
