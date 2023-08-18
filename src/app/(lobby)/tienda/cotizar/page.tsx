import { type Metadata } from 'next'

import { getQuoteAction } from '@/app/_actions/quote'
import { RequestQuoteForm } from '@/components/forms/request-quote-form'
import { Header } from '@/components/header'
import { Icons } from '@/components/icons'
import { UpdateQuote } from '@/components/quoter/update-quote'
import { Shell } from '@/components/shell'
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cotizador',
  description: 'Solicita la cotización de los productos seleccionados.',
}

export default async function BlogPage() {
  const user = await currentUser()
  const quoteLineItems = await getQuoteAction()

  const itemCount = quoteLineItems.reduce(
    (total, item) => total + (item.quantity ?? 0),
    0
  )

  return (
    <Shell>
      <Header
        title="Cotizador"
        description="Solicitar la cotización de los siguientes items"
        size="sm"
        // className="place-items-start rounded-xl bg-border p-12 text-left"
      />
      {itemCount > 0 ? (
        <div className="flex w-full h-full gap-8">
          {/* LEFT */}
          <div className="flex flex-col w-full gap-2">
            {quoteLineItems.map((item) => {
              const category =
                item.productCategories.nodes[
                  item.productCategories.nodes.length - 1
                ]
              return (
                <div className="flex items-center gap-4 bg-border/50 rounded-lg p-2">
                  <div className="relative h-20 w-20 overflow-hidden rounded">
                    {item?.featuredImage ? (
                      <Link href={`/tienda/producto/${item.slug}`}>
                        <Image
                          src={
                            item.featuredImage.node.guid ??
                            '/images/product-placeholder.webp'
                          }
                          alt={item.featuredImage.node.altText ?? item.name}
                          fill
                          className="absolute object-cover"
                          loading="lazy"
                        />
                      </Link>
                    ) : (
                      <div className="flex h-full items-center justify-center bg-secondary">
                        <Icons.placeholder
                          className="h-4 w-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 self-start text-sm">
                    <Link
                      href={`/tienda/producto/${item.slug}`}
                      aria-label={`Ir a ${item.name}`}
                      className="hover:underline font-bold"
                    >
                      <span className="line-clamp-2 ">{item.name}</span>
                    </Link>

                    <div className="flex w-full content-start gap-1 text-muted-foreground">
                      <p>
                        <strong>SKU:</strong> {item.sku}
                      </p>
                    </div>

                    <div className="flex w-full content-start gap-1 text-muted-foreground">
                      <p className="font-bold">Categoría:</p>
                      <Link
                        href={`/tienda${category?.uri as string}`}
                        aria-label={`Ir a ${category?.name as string}`}
                        className="hover:underline"
                      >
                        {category?.name}
                      </Link>
                    </div>
                  </div>
                  <UpdateQuote quoteLineItem={item} />
                </div>
              )
            })}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-2 w-full">
            <RequestQuoteForm />
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-2">
          <Icons.calculator
            className="h-12 w-12 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="text-lg font-medium text-muted-foreground">
            Tu cotizador está vacío.
          </span>
        </div>
      )}
    </Shell>
  )
}
