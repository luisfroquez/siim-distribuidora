import React from 'react'

import { Icons } from '@/components/icons'

const items = [
  {
    title: 'Distribuidores de las mejores marcas y equipos',
    description: '',
    icon: <Icons.check />,
  },
  {
    title: 'Cotizaciones rápidas y despachos a todo Chile',
    description: '',
    icon: <Icons.check />,
  },
  {
    title: 'Envío gratis dentro del anillo de vespucio',
    description: 'Compras mayores a $150.000',
    icon: <Icons.check />,
  },
]

const Features = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 ">
      {items.map((f, i) => (
        <div className="flex items-center gap-8 border-l-2 border-background bg-border p-8 first:rounded-bl-xl first:border-l-0 last:rounded-br-xl ">
          {f.icon}
          <div>
            <h3 className="font-medium">{f.title}</h3>
            <p className="opacity-80">{f.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Features
