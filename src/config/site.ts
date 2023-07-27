import type { MainNavItem } from '@/types'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  title: 'SIIM Distribuidora',
  description:
    'Distribuidora de materiales y equipos en las áreas de detección y extinción de incendios, seguridad electrónica, ferretería y electricidad.',
  url: 'https://distribuidora.siim.cl/',
  ogImage: 'https://skateshop.sadmn.com/opengraph-image.png',
  links: {
    linkedin: 'https://www.linkedin.com/company/siim-group/',
    instagram: 'https://www.instagram.com/siim_spa/',
  },
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
        {
          title: 'Electricidad',
          description: 'Ver todos los productos de electricidad',
          href: '/shop/categoria-producto/electricidad/',
          items: [],
        },
        {
          title: 'Electrónica',
          description: 'Ver todos los productos de electrónica',
          href: '/shop/categoria-producto/electronica/',
          items: [],
        },
        {
          title: 'Ferretería',
          description: 'Ver todos los productos de Ferretería',
          href: '/shop/categoria-producto/ferreteria/',
          items: [],
        },
        {
          title: 'Medicina',
          description: 'Ver todos los productos de Medicina',
          href: '/shop/categoria-producto/medicina/',
          items: [],
        },
        {
          title: 'Sistemas de Protección Contra Incendio',
          description: 'Ver todos los productos contra incendios',
          href: '/shop/categoria-producto/sistemas-de-proteccion-contra-incendio/',
          items: [],
        },
      ],
    },
    {
      title: 'Hikvision',
      href: '/hikvision',
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
      title: 'Contacto',
      href: '/contacto',
    },
  ] satisfies MainNavItem[],
}
