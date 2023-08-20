import { getQuoteAction } from '@/app/_actions/quote'
import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { cn } from '@/lib/utils'
import Link from 'next/link'
import RenderQuotLineItems from './render-quoteline-items'

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
      <SheetContent className="flex w-full flex-col sm:max-w-2xl">
        <SheetHeader className="px-1">
          <SheetTitle className="flex gap-2 items-center">
            <h2>Cotizador</h2>
            {itemCount > 0 && (
              <Badge variant="secondary">{itemCount} items</Badge>
            )}
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {itemCount > 0 ? (
          <>
            <div className="flex flex-1 flex-col overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-2">
                  {quoteLineItems.map((item, i) => (
                    <RenderQuotLineItems key={i} item={item} />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* FOOTER */}

            <SheetFooter className="mt-1.5">
              <Link href="/tienda/cotizar" className="w-full">
                <div
                  className={cn(
                    buttonVariants({
                      size: 'lg',
                      className: 'w-fit px-12 h-12 smooth-500',
                    })
                  )}
                  aria-label="Ir a solicitar cotización"
                >
                  Cotizar
                  <span className="sr-only">Ir a cotizar</span>
                </div>
              </Link>
            </SheetFooter>
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
