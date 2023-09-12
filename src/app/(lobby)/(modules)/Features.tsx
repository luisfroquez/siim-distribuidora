import { Box, Calculator, Truck } from 'lucide-react'

const items = [
  {
    title: 'Distribuidores de las mejores marcas y equipos',
    description: '',
    icon: <Box />,
  },
  {
    title: 'Cotizaciones rápidas y despachos a todo Chile',
    description: '',
    icon: <Calculator />,
  },
  {
    title: 'Envío gratis dentro del anillo de vespucio',
    description: 'Compras mayores a $150.000',
    icon: <Truck />,
  },
]

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 ">
      {items.map((f, i) => (
        <div
          key={i}
          className=" flex items-center gap-8 first:border-t-0 border-t-2 md:border-l-2 border-background bg-border p-8 md:first:rounded-bl-xl first:border-l-0 md:last:rounded-br-xl last:rounded-b-xl md:last:rounded-bl-none md:border-t-0 "
        >
          <span className="flex items-center justify-center">{f.icon}</span>
          <div className="text-sm md:text-base">
            <h3 className="font-medium ">{f.title}</h3>
            <p className="opacity-80">{f.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Features
