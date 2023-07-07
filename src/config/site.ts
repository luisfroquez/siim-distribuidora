import type { MainNavItem } from '@/types'

import { productCategories } from '@/config/products'
import { slugify } from '@/lib/utils'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'SIIM Distribuidora',
  description:
    'Distribuidora de materiales y equipos en las áreas de detección y extinción de incendios, seguridad electrónica, ferretería y electricidad.',
  url: 'https://distribuidora.siim.cl/',
  ogImage: 'https://skateshop.sadmn.com/opengraph-image.png',
  mainNav: [
    {
      title: 'Productos',
      items: [
        {
          title: 'Todos',
          href: '/products',
          description: 'Ver todos los productos que ofrecemos.',
          items: [],
        },
        ...productCategories.map((category) => ({
          title: category.title,
          description: category.description,
          items: [
            {
              title: 'All',
              href: `/categories/${slugify(category.title)}`,
              description: `All ${category.title}.`,
              items: [],
            },
            ...category.subcategories.map((subcategory) => ({
              title: subcategory.title,
              href: `/categories/${slugify(category.title)}/${
                subcategory.slug
              }`,
              description: subcategory.description,
              items: [],
            })),
          ],
        })),
      ],
    },
    {
      title: 'Instalaciones y Proyectos',
      href: 'https://siim-ingenieria.vercel.app/',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Cotizaciones',
      href: '/cotizaciones',
    },
    {
      title: 'Contacto',
      href: '/contacto',
    },
  ] satisfies MainNavItem[],
  links: {
    linkedin: 'https://www.linkedin.com/company/siim-group/',
    instagram: 'https://www.instagram.com/siim_spa/',
  },
}
