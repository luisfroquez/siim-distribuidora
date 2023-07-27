import Link from 'next/link'
import { WpCategoryWithAncestors } from '@/wp/types'

const ProductCategoryBreadcrumb = ({
  category,
}: {
  category: WpCategoryWithAncestors
}) => {
  console.log('category', category)
  const categories = [
    ...category.ancestors.nodes.map((a) => a),
    { name: category.name, uri: category.uri },
  ]

  return (
    <div className="flex w-full gap-2 text-xs">
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

export default ProductCategoryBreadcrumb
