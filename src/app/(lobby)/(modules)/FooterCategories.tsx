import { GET_CATEGORIES } from '@/wp/queries'
import type { WpCategories } from '@/wp/types'
import Link from 'next/link'

import { client } from '@/lib/apollo/apollo'

export default async function FooterCategories() {
  const { data } = await client.query<{
    productCategories: { nodes: WpCategories[] }
  }>({
    query: GET_CATEGORIES,
  })

  const categories = data.productCategories.nodes

  return (
    <div className="grid w-full grid-cols-2 gap-y-4 py-8 md:grid-cols-3 xl:grid-cols-5">
      {categories.map((c, i) => (
        <div key={i} className=" flex flex-col text-sm">
          <Link href={`/tienda${c.uri}`} className="w-fit py-1">
            <h3 className="smooth-700 w-fit rounded-md px-2 py-1 font-bold leading-[14px] text-primary hover:bg-border">
              {c.name}
            </h3>
          </Link>

          <div className="flex flex-col pl-2">
            {c.children?.nodes.map((sc, i) => (
              <Link href={`/tienda${sc.uri}`} key={i}>
                <p className="hover:underline">{sc.name}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
