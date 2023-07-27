import Link from 'next/link'
import { db } from '@/db'
import { iwsProductImages, iwsProducts, products, stores } from '@/db/schema'
import { eq } from 'drizzle-orm'

import { productCategories } from '@/config/products'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SubscribeToNewsletterForm } from '@/components/forms/subscribe-to-newsletter-form'
import { IwsProductCard } from '@/components/iws-product-card'
import { Shell } from '@/components/shell'

import Categories from './(modules)/Categories'
import FeaturedProducts from './(modules)/FeaturedProducts'
import Features from './(modules)/Features'
import FooterCategories from './(modules)/FooterCategories'
import Hero from './(modules)/Hero'

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export default async function IndexPage() {
  const allIwsProductsWithImages = await db
    .select()
    .from(iwsProducts)
    .leftJoin(
      iwsProductImages,
      eq(iwsProducts.Sku, iwsProductImages.productSku)
    )
    .limit(8)

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
            <Link href="/products">
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
            <Link href="/products">
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allIwsProductsWithImages.map((iwsProduct, i) => (
              <IwsProductCard key={i} productWithImage={iwsProduct} />
            ))}
          </div>
          {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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

        {/* <div className="flex flex-wrap items-center justify-center gap-4">
          {productCategories[
            Math.floor(Math.random() * productCategories.length)
          ]?.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/categories/${String(productCategories[0]?.title)}/${
                subcategory.slug
              }`}
            >
              <Badge variant="secondary" className="rounded-md px-3 py-1">
                {subcategory.title}
              </Badge>
              <span className="sr-only">{subcategory.title}</span>
            </Link>
          ))}
        </div> */}

        <FooterCategories />
      </Shell>
    </div>
  )
}
