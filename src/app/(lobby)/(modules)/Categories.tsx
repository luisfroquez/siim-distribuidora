import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from '@/components/ui/aspect-ratio'

const homeCategories = [
  {
    name: 'Sistemas de Protección Contra Incendio',
    slug: 'sistemas-de-proteccion-contra-incendio',
    uri: '/categoria-producto/sistemas-de-proteccion-contra-incendio/',
  },
  {
    name: 'Electricidad',
    slug: 'electricidad',
    uri: '/categoria-producto/electricidad/',
  },
  {
    name: 'Electrónica',
    slug: 'electronica',
    uri: '/categoria-producto/electronica/',
  },
  {
    name: 'Ferretería',
    slug: 'ferreteria',
    uri: '/categoria-producto/ferreteria/',
  },
  {
    name: 'Medicina',
    slug: 'medicina',
    uri: '/categoria-producto/medicina/',
  },
]

const Categories = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 xl:grid-cols-5">
      {homeCategories?.map((category, i) => (
        <Link
          aria-label={`Go to ${category.name}`}
          key={i}
          href={`/tienda${category.uri}`}
          className={`${i === 0 ? 'xl:col-span-2 xl:row-span-2' : ''} ${
            i === 1 ? 'xl:col-span-3' : ''
          }`}
        >
          <div className="group relative h-full overflow-hidden rounded-xl ">
            {i < 2 ? (
              <>
                <div className="smooth-1000 absolute inset-0 z-10 bg-gradient-to-tr from-blue-900 to-blue-900/10 group-hover:bg-blue-900/90 " />
                <Image
                  src={`https://source.unsplash.com/featured/?${category.name}`}
                  alt={category.name}
                  fill
                  className="smooth-1000 object-cover group-hover:scale-105"
                  loading="lazy"
                />
              </>
            ) : (
              <AspectRatio ratio={4 / 5}>
                <div className="smooth-1000 absolute inset-0 z-10 bg-gradient-to-tr from-blue-900 to-blue-900/10 group-hover:bg-blue-900/90 " />
                <Image
                  src={`https://source.unsplash.com/featured/?${category.name}`}
                  alt={category.name}
                  fill
                  className="smooth-1000 object-cover group-hover:scale-105"
                  loading="lazy"
                />
              </AspectRatio>
            )}

            <div className="absolute inset-0 z-20 flex items-end justify-start p-8">
              <h3 className="w-[50%] text-left text-2xl font-medium text-slate-100">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Categories
