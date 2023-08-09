import Image from 'next/image'

import { getQuoteAction } from '@/app/_actions/quote'
import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { UpdateQuote } from './update-quote'

export async function QuoteSheet() {
  const quoteLineItems = await getQuoteAction()

  const itemCount = quoteLineItems.reduce(
    (total, item) => total + (item.quantity ?? 0),
    0
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Quoter"
          variant="outline"
          size="icon"
          className="relative"
        >
          {itemCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-2"
            >
              {itemCount}
            </Badge>
          )}
          <Icons.calculator className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Cotizador {itemCount > 0 && `(${itemCount})`}</SheetTitle>
        </SheetHeader>
        <Separator className="-ml-6 w-[calc(100%+24px)]" />
        {itemCount > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-5 pr-6">
                  {quoteLineItems.map((item) => {
                    const category =
                      item.productCategories.nodes[
                        item.productCategories.nodes.length - 1
                      ]
                    return (
                      <div key={item.id} className="space-y-3">
                        <div className="flex items-center space-x-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded">
                            {item?.featuredImage ? (
                              <Link href={`/tienda/producto/${item.slug}`}>
                                <Image
                                  src={
                                    item.featuredImage.node.guid ??
                                    '/images/product-placeholder.webp'
                                  }
                                  alt={
                                    item.featuredImage.node.altText ?? item.name
                                  }
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
                                href={`/tienda${category?.uri}`}
                                aria-label={`Ir a ${category?.name}`}
                                className="hover:underline"
                              >
                                {category?.name}
                              </Link>
                            </div>
                          </div>
                          <UpdateQuote quoteLineItem={item} />
                        </div>
                        <Separator />
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
            <div className="grid gap-1.5 pr-6 text-sm">
              <SheetFooter className="mt-1.5">
                <Button
                  aria-label="Solicitar cotización"
                  size="lg"
                  className="w-full h-12"
                >
                  Solicitar cotización
                </Button>
              </SheetFooter>
            </div>
          </>
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
      </SheetContent>
    </Sheet>
  )
}
