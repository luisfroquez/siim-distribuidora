import { NEXT_PUBLIC_CONTENT_URL } from '@/app/config'
import type { MainNavItem } from '@/types'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  title: 'SIIM Distribuidora',
  description:
    'Distribuidora de materiales y equipos en las áreas de detección y extinción de incendios, seguridad electrónica, ferretería y electricidad.',
  url: `https://distribuidora.siim.cl/`,
  ogImage: `${
    NEXT_PUBLIC_CONTENT_URL as string
  }/uploads/2023/08/opengraph-image.png`,
  links: {
    linkedin: 'https://www.linkedin.com/company/siim-group/',
    instagram: 'https://www.instagram.com/siimdistribuidora/',
  },
  mainNav: [
    {
      title: 'Productos',
      items: [
        {
          title: 'Todos',
          href: '/tienda',
          description: 'Ver todos los productos que ofrecemos.',
          items: [],
        },
        {
          title: 'Sistemas de Protección Contra Incendio',
          description: 'Ver todos los productos contra incendios',
          href: '/tienda/categoria-producto/sistemas-de-proteccion-contra-incendio/',
          items: [],
        },
        {
          title: 'Control de Acceso',
          description: 'Ver todos los productos de Control de Acceso',
          href: '/tienda/categoria-producto/electronica/',
          items: [],
        },
        {
          title: 'Electricidad',
          description: 'Ver todos los productos de electricidad',
          href: '/tienda/categoria-producto/electricidad/',
          items: [],
        },
        {
          title: 'Ferretería',
          description: 'Ver todos los productos de Ferretería',
          href: '/tienda/categoria-producto/ferreteria/',
          items: [],
        },
        {
          title: 'Medicina',
          description: 'Ver todos los productos de Medicina',
          href: '/tienda/categoria-producto/medicina/',
          items: [],
        },
      ],
    },
    // {
    //   title: 'Hikvision',
    //   href: '/hikvision',
    // },
    {
      title: 'Instalaciones y Proyectos',
      href: 'https://ingenieria.siim.cl/',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Contacto',
      href: '/contacto',
    },
  ] satisfies MainNavItem[],
}
