import { HelpProps } from './types'

export const sections: HelpProps[] = [
  {
    sectionTitle: 'Cotizaciones',
    items: [
      {
        title: '¿Cómo cotizar?',
        link: '/ayuda/como-cotizar',
        description: 'Paso a paso para realizar una solicitud de cotización.',
        icon: 'calculator',
      },
      {
        title: 'Preguntas frecuentes sobre cotizaciones',
        link: '/ayuda/preguntas-frecuentes-cotizaciones',
        icon: 'helpCircle',
      },
    ],
  },
  {
    sectionTitle: 'Ayuda sobre tu cuenta',
    items: [
      {
        title: 'Configuración de mi cuenta',
        link: '/dashboard/account',
        icon: 'user',
      },
    ],
  },
  {
    sectionTitle: '¿Necesitas contactarnos?',
    items: [
      {
        title: 'Contáctanos',
        link: '/contacto',
        icon: 'phone',
      },
    ],
  },
]
