import { client } from '@/lib/apollo/apollo'
import { GET_ALL_PRODUCTS_SLUG } from '@/wp/queries'
import { type WpGetAllProductsSlug } from '@/wp/types'
import { type MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await client.query<WpGetAllProductsSlug>({
    query: GET_ALL_PRODUCTS_SLUG,
  })

  return [
    {
      url: 'https://distribuidora.siim.cl',
      lastModified: new Date(),
    },
    {
      url: 'https://distribuidora.siim.cl/blog',
      lastModified: new Date(),
    },
    {
      url: 'https://distribuidora.siim.cl/contacto',
      lastModified: new Date(),
    },
    {
      url: 'https://distribuidora.siim.cl/signin',
      lastModified: new Date(),
    },
    {
      url: 'https://distribuidora.siim.cl/signup',
      lastModified: new Date(),
    },
    ...data.products.nodes.map(({ slug }) => ({
      url: `https://distribuidora.siim.cl/tienda/producto/${slug ?? ''}`,
      lastModified: new Date(),
    })),
  ]
}
