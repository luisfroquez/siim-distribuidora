import { client } from '@/lib/apollo/apollo'
import { GET_CATEGORY_BY_SLUG } from '@/wp/queries'
import { WpProductCategory } from '@/wp/types'
import { ApolloQueryResult } from '@apollo/client'
import Link from 'next/link'

interface CategoryBreadcrumbProps {
  uri: string
}

const CategoryBreadcrumb = async ({ uri }: CategoryBreadcrumbProps) => {
  const items = uri
    .slice(20)
    .split('/')
    .filter((e) => e !== '/')
    .filter(Boolean)

  const promisesArray: Promise<ApolloQueryResult<WpProductCategory>>[] = []

  if (items) {
    items?.forEach((slug) => {
      const promise = client.query<WpProductCategory>({
        query: GET_CATEGORY_BY_SLUG,
        variables: { slug },
      })

      promisesArray.push(
        promise as Promise<ApolloQueryResult<WpProductCategory>>
      )
    })
  }

  const [...categories] = await Promise.all(promisesArray)

  return (
    <div className="mb-4 flex w-full gap-2  py-2 text-xs">
      {categories.map((data, i) => {
        const isLast = i === categories.length - 1
        const c = data.data.productCategory

        return (
          <>
            <Link
              href={`/tienda${c.uri}`}
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
