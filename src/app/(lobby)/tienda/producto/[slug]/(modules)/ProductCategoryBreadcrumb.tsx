import { type WpCategoryWithAncestors } from '@/wp/types'
import Link from 'next/link'

const ProductCategoryBreadcrumb = ({
  category,
}: {
  category: WpCategoryWithAncestors
}) => {
  const ancestors = category.ancestors?.nodes.map((a) => a) ?? []
  const categories = [...ancestors, { name: category.name, uri: category.uri }]

  return (
    <div className="flex flex-wrap w-full gap-2 text-xs">
      {categories.map((c, i) => {
        const isLast = i === categories.length - 1

        return (
          <>
            <Link
              href={`/tienda${c.uri}`}
              aria-label={`Ir a ${c.name}`}
              key={i}
              className="hover:underline min-w-max"
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

export default ProductCategoryBreadcrumb
