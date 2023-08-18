import Link from 'next/link'

import { SubscribeToNewsletterForm } from '@/components/forms/subscribe-to-newsletter-form'

import { Shell } from '@/components/shell'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import Categories from './(modules)/Categories'
import FeaturedProducts from './(modules)/FeaturedProducts'
import Features from './(modules)/Features'
import FooterCategories from './(modules)/FooterCategories'
import Hero from './(modules)/Hero'

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export default function IndexPage() {
  // const extendedData = await getExtendedCatalog()
  // const allIwsProductsWithImages = extendedData
  //   .filter((e) => e.DescripcionFabrica === 'Hikvision')
  //   .filter((e) => e.Imagenes.length > 0)

  // const lenght = allIwsProductsWithImages.length ?? 0

  // const [min, max] = createTwoAleatoryNumbers(lenght, 8)

  // const slicedIwsProductsWithImages = allIwsProductsWithImages.slice(min, max)
  return (
    <div>
      <Shell>
        <div className="flex flex-col">
          <Hero />
          {/* FEATURES */}
          <Features />
        </div>

        {/* CATEGORIES */}
        <div className="space-y-5 pt-8">
          <h2 className="text-2xl font-medium">Categorías</h2>
          <Categories />
        </div>

        {/* FEATURED */}
        <div className="space-y-5 pt-8">
          <div className="flex items-center">
            <h2 className="flex-1 text-2xl font-medium">Selección SIIM</h2>
            <Link href="/tienda">
              <div
                className={cn(
                  buttonVariants({
                    size: 'sm',
                  })
                )}
              >
                Ver todos los productos
                <span className="sr-only">Ver todos los productos</span>
              </div>
            </Link>
          </div>
          <FeaturedProducts />
        </div>

        {/* HIKVISION */}
        <div className="space-y-5 pt-8">
          <div className="flex items-center">
            <h2 className="flex-1 text-2xl font-medium">Hikvision</h2>
            <Link href="/tienda/hikvision">
              <div
                className={cn(
                  buttonVariants({
                    size: 'sm',
                  })
                )}
              >
                Ver todos
                <span className="sr-only">Ver todos los productos</span>
              </div>
            </Link>
          </div>
          {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {slicedIwsProductsWithImages.map((iwsProduct, i) => (
              <IwsProductCard key={i} product={iwsProduct} />
            ))}
          </div> */}
        </div>

        <Card className="mt-4 grid place-items-center gap-4 px-6 py-16 text-center">
          <h2 className="text-2xl font-medium">
            Suscríbete a nuestro boletín para obtener las últimas noticias y
            actualizaciones de SIIM
          </h2>
          <SubscribeToNewsletterForm />
        </Card>

        <FooterCategories />
      </Shell>
    </div>
  )
}
