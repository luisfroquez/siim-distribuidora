import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/db'
import { iwsProducts, products, stores } from '@/db/schema'
import { desc, eq, sql } from 'drizzle-orm'

import { productCategories } from '@/config/products'
import { cn } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SubscribeToNewsletterForm } from '@/components/forms/subscribe-to-newsletter-form'
import { GenerateButton } from '@/components/generate-button'
import { Header } from '@/components/header'
import { IwsProductCard } from '@/components/iws-product-card'
import { ProductCard } from '@/components/product-card'
import { Shell } from '@/components/shell'

import { updateProducts } from '../_actions/update-products-iws'

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export default async function IndexPage() {
  // await updateProducts()

  const allProducts = await db.select().from(iwsProducts).limit(8)

  // const allProducts = await db
  //   .select()
  //   .from(products)
  //   .limit(8)
  //   .orderBy(desc(products.createdAt))

  const allStoresWithProductCount = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      productCount: sql<number>`count(${products.id})`,
    })
    .from(stores)
    .limit(4)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(sql<number>`count(${products.id})`))

  // const data = await updateProducts()

  return (
    <div>
      <Shell className="">
        <Header
          className="place-items-left rounded-md bg-border p-24 text-left"
          title="Bienvenido a SIIM Distribuidora®"
          description="Tus socios confiables en materiales y equipos para la detección y extinción de incendios, seguridad electrónica, ferretería y electricidad."
        />
        <div className="space-y-5">
          <h2 className="text-2xl font-medium">Categorías</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {Object.values(products.category.enumValues).map((category) => (
              <Link
                aria-label={`Go to ${category}`}
                key={category}
                href={`/categories/${category}`}
              >
                <div className="group relative overflow-hidden rounded-lg">
                  <AspectRatio ratio={4 / 5}>
                    <div className="absolute inset-0 z-10 bg-blue-900/50 transition-colors group-hover:bg-blue-900/70" />
                    <Image
                      src={`https://source.unsplash.com/featured/?${category}`}
                      alt={category}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  </AspectRatio>
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <h3 className="text-center text-2xl font-medium text-slate-100">
                      {category}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Card className="mt-4 grid place-items-center gap-5 px-6 py-20 text-center">
          <h2 className="text-2xl font-medium">Actualizar productos</h2>

          <GenerateButton />
        </Card>
        <div className="space-y-5">
          <div className="flex items-center">
            <h2 className="flex-1 text-2xl font-medium">
              Productos destacados
            </h2>
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
            {allProducts.map((product) => (
              <IwsProductCard key={product.Sku} product={product} />
            ))}
          </div>
          {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div> */}
        </div>
        {/* <div className="space-y-5">
          <h2 className="text-2xl font-medium">Featured stores</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allStoresWithProductCount.map((store) => (
              <Card key={store.id} className="flex h-full flex-col">
                <CardHeader className="flex-1">
                  <CardTitle className="line-clamp-1">{store.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {store.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/products?store_ids=${store.id}`}>
                    <div
                      className={cn(
                        buttonVariants({
                          size: 'sm',
                          className: 'h-8 w-full',
                        })
                      )}
                    >
                      View products ({store.productCount})
                      <span className="sr-only">{`${store.name} store products`}</span>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}
        <Card className="mt-4 grid place-items-center gap-4 px-6 py-16 text-center">
          {/* <p className="text-sm text-muted-foreground">
            {dailyNewsletterCount[0]?.count ?? 0} newsletters sent out of 100
            daily limit of the Resend free plan
          </p> */}
          <h2 className="text-2xl font-medium">
            Suscríbete a nuestro boletín para obtener las últimas noticias y
            actualizaciones de SIIM
          </h2>
          <SubscribeToNewsletterForm />
        </Card>
        <div className="flex flex-wrap items-center justify-center gap-4">
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
        </div>
      </Shell>
    </div>
  )
}
