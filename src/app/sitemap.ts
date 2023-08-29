import { client } from '@/lib/apollo/apollo'
import { GET_ALL_PRODUCTS_SLUG } from '@/wp/queries'
import { WpGetAllProductsSlug } from '@/wp/types'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await client.query<WpGetAllProductsSlug>({
    query: GET_ALL_PRODUCTS_SLUG,
  })

  return [
    ...data.products.nodes.map((slug) => ({
      url: `https://distribuidora.siim.cl/tienda/producto/${slug}`,
      lastModified: new Date(),
    })),
  ]
}
