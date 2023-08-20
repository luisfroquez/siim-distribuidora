import { type Metadata } from 'next'

import { getQuoteAction } from '@/app/_actions/quote'
import { RequestQuoteForm } from '@/components/forms/request-quote-form'
import { Header } from '@/components/header'
import { Icons } from '@/components/icons'
import RenderQuotLineItems from '@/components/quoter/render-quoteline-items'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'Cotizador',
  description: 'Solicita la cotización de los productos seleccionados.',
}

export default async function QuoterPage() {
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
        <div className="flex w-full  gap-8">
          {/* LEFT */}
          <div className="flex flex-col w-full gap-2">
            {quoteLineItems.map((item, i) => (
              <RenderQuotLineItems key={i} item={item} />
            ))}
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
