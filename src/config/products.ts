import { type Product } from '@/db/schema'
import type { Option } from '@/types'

export const sortOptions = [
  { label: 'Fecha: Más recientes', value: 'createdAt.asc' },
  {
    label: 'Fecha: Menos recientes',
    value: 'createdAt.desc',
  },
  { label: 'Precio: Más baratos primero', value: 'price.asc' },
  { label: 'Precio: Más caros primero', value: 'price.desc' },
  {
    label: 'Nombre: A - Z',
    value: 'name.asc',
  },
  {
    label: 'Nombre: Z to A',
    value: 'name.desc',
  },
]

export const productCategories: {
  title: Product['category']
  description?: string
  subcategories: {
    title: string
    description?: string
    image?: string
    slug: string
  }[]
}[] = [
  {
    title: 'Detección de Incendio',
    description: 'Equipos',
    subcategories: [
      {
        title: 'Aspiración',
        description:
          'Sistemas de detección y aspiración de humo altamente sensibles.',
        image: '/images/deck-one.webp',
        slug: 'aspiracion',
      },
      {
        title: 'Accesorios',
        description:
          'Variedad de elementos complementarios y útiles para los sistemas de detección de incendios.',
        image: '/images/wheel-one.webp',
        slug: 'accesorios-de-deteccion',
      },
      {
        title: 'Convencional',
        description: 'Equipos de detección para sistemas convencionales.',
        image: '/images/truck-one.webp',
        slug: 'sistema-convencional',
      },
      {
        title: 'Direccionable',
        description: 'Equipos de detección para sistemas direccionables.',
        image: '/images/bearing-one.webp',
        slug: 'sistema-direccionable',
      },
      {
        title: 'Palancas',
        description:
          'Dispositivos utilizados para accionar y activar diferentes funciones relacionadas con la detección de incendios.',
        image: '/images/griptape-one.webp',
        slug: 'palancas',
      },
      {
        title: 'Sirenas y Balizas',
        description:
          'Dispositivos de señalización audiovisual utilizados para alertar y notificar sobre la detección de incendios.',
        image: '/images/hardware-one.webp',
        slug: 'sirenas-y-balizas',
      },
    ],
  },
  {
    title: 'Extinción de Incendio',
    subcategories: [
      {
        title: 'Cañerías',
        description: 'Cool and comfy tees for effortless style.',
        slug: 'cañerias',
      },
      {
        title: 'Canastillos',
        description: 'Cozy up in trendy hoodies.',
        slug: 'canastillos',
      },
      {
        title: 'Detectores de Flujo',
        description: 'Relaxed and stylish pants for everyday wear.',
        slug: 'detectoes-de-flujo',
      },
      {
        title: 'Extintores',
        description: 'Stay cool with casual and comfortable shorts.',
        slug: 'extintores',
      },
      {
        title: 'Juntas de Dilatación',
        description: 'Top off your look with stylish and laid-back hats.',
        slug: 'juntas',
      },
      {
        title: 'Manómetros',
        description: 'Top off your look with stylish and laid-back hats.',
        slug: 'manometros',
      },
      {
        title: 'Mangueras',
        description: 'Top off your look with stylish and laid-back hats.',
        slug: 'mangueras',
      },
      {
        title: 'Rosetas',
        description: 'Top off your look with stylish and laid-back hats.',
        slug: 'rosetas',
      },
      {
        title: 'Storz',
        description: 'Top off your look with stylish and laid-back hats.',
        slug: 'storz',
      },
      {
        title: 'Sprinklers',
        description: 'Top off your look with stylish and laid-back hats.',
        slug: 'sprinklers',
      },
      {
        title: 'Válvulas',
        description: 'Top off your look with stylish and laid-back hats.',
        slug: 'valvulas',
      },
    ],
  },
  {
    title: 'Electrónica',
    subcategories: [
      {
        title: 'CCTV',
        description: 'Rad low tops shoes for a stylish low-profile look.',
        slug: 'cctv',
      },
      {
        title: 'Citofonía',
        description: 'Elevate your style with rad high top shoes.',
        slug: 'citofonia',
      },
      {
        title: 'Control de Acceso',
        description: 'Effortless style with rad slip-on shoes.',
        slug: 'control-de-acceso',
      },
      {
        title: 'Adaptadores',
        description: 'Rad low tops shoes for a stylish low-profile look.',
        slug: 'adaptadores',
      },
      {
        title: 'Cables',
        description: 'Elevate your style with rad high top shoes.',
        slug: 'cables',
      },
      {
        title: 'Herramientas',
        description: 'Effortless style with rad slip-on shoes.',
        slug: 'herramientas',
      },
      {
        title: 'Redes',
        description: 'Effortless style with rad slip-on shoes.',
        slug: 'redes',
      },
    ],
  },
  {
    title: 'Ferretería',
    subcategories: [
      {
        title: 'Ángulos',
        description:
          'Essential tools for maintaining your skateboard, all rad.',
        slug: 'angulos',
      },
      {
        title: 'Amarras Plásticas',
        description: 'Upgrade your ride with our rad selection of bushings.',
        slug: 'amarras-plasticas',
      },
      {
        title: 'Cintas',
        description:
          "Enhance your skateboard's performance with rad shock and riser pads.",
        slug: 'cintas',
      },
      {
        title: 'candados',
        description:
          'Add creativity and style to your tricks with our rad skate rails.',
        slug: 'candados',
      },
      {
        title: 'EPP',
        description: 'Keep your board gliding smoothly with our rad skate wax.',
        slug: 'epp',
      },
      {
        title: 'Espárragos',
        description: 'Keep your feet comfy and stylish with our rad socks.',
        slug: 'socks',
      },
      {
        title: 'Herramientas',
        description: 'Carry your gear in style with our rad backpacks.',
        slug: 'herramientas',
      },
      {
        title: 'Líquidos / Químicos',
        description: 'Carry your gear in style with our rad backpacks.',
        slug: 'liquidos-quimicos',
      },
      {
        title: 'Mangueras',
        description: 'Carry your gear in style with our rad backpacks.',
        slug: 'mangueras',
      },
      {
        title: 'Pintura',
        description: 'Carry your gear in style with our rad backpacks.',
        slug: 'pintura',
      },
      {
        title: 'Repuestos',
        description: 'Carry your gear in style with our rad backpacks.',
        slug: 'repuestos',
      },
      {
        title: 'Riel',
        description: 'Carry your gear in style with our rad backpacks.',
        slug: 'riel',
      },
      {
        title: 'Soldadura',
        description: 'Carry your gear in style with our rad backpacks.',
        slug: 'soldadura',
      },
      {
        title: 'Teflón',
        description: 'Carry your gear in style with our rad backpacks.',
        slug: 'teflon',
      },
    ],
  },
  {
    title: 'Canalización',
    subcategories: [
      {
        title: 'Abrazaderas',
        description:
          'Essential tools for maintaining your skateboard, all rad.',
        slug: 'abrazaderas',
      },
      {
        title: 'Cajas',
        description: 'Upgrade your ride with our rad selection of bushings.',
        slug: 'cajas',
      },
      {
        title: 'Canaletas',
        description:
          "Enhance your skateboard's performance with rad shock and riser pads.",
        slug: 'canaletas',
      },
      {
        title: 'Tuberías',
        description:
          'Add creativity and style to your tricks with our rad skate rails.',
        slug: 'tuberias',
      },
      {
        title: 'Tarugos / Tacos',
        description: 'Keep your board gliding smoothly with our rad skate wax.',
        slug: 'tarugos-tacos',
      },
      {
        title: 'Tornillos / Pernos',
        description: 'Keep your feet comfy and stylish with our rad socks.',
        slug: 'tornillos-pernos',
      },
    ],
  },
  {
    title: 'Electricidad',
    subcategories: [
      {
        title: 'Automáticos / Breakers',
        slug: 'automaticos-breakers',
      },
      {
        title: 'Baterías',
        slug: 'baterias',
      },
      {
        title: 'Cableado',
        slug: 'cableado',
      },
      {
        title: 'Enchufes',
        slug: 'enchufes',
      },
      {
        title: 'Iluminación',
        slug: 'iluminacion',
      },
      {
        title: 'Relés',
        slug: 'reles',
      },
      {
        title: 'Resistencias',
        slug: 'resistencias',
      },
      {
        title: 'Tableros',
        slug: 'tableros',
      },
      {
        title: 'Termo Contraíble',
        slug: 'termo-contraible',
      },
      {
        title: 'Terminales / Conectores',
        slug: 'terminales-conectores',
      },
    ],
  },
]

export const productTags = [
  'new',
  'sale',
  'bestseller',
  'featured',
  'popular',
  'trending',
  'limited',
  'exclusive',
]

export function getSubcategories(category?: string): Option[] {
  if (!category) return []

  const subcategories =
    productCategories
      .find((c) => c.title === category)
      ?.subcategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? []

  return subcategories
}
