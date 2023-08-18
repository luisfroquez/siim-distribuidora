import { type Metadata } from 'next'

import { Icons } from '@/components/icons'
import { Shell } from '@/components/shell'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cotización solicitada exitosamente',
  description: '',
}

export default async function SuccessQuotePage() {
  const user = await currentUser()
  return (
    <Shell>
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <Icons.check className="h-12 w-12 text-green-600" aria-hidden="true" />
        <span className="text-2xl font-medium">
          ¡Cotización solicitada con éxito!
        </span>
        <div className="flex mx-auto gap-2 pt-2">
          <Link href="/tienda">
            <div
              className={cn(
                buttonVariants({
                  size: 'sm',
                })
              )}
            >
              Ver otros productos
              <span className="sr-only">Ver otros productos</span>
            </div>
          </Link>
          {user && (
            <Link href="/dashboard/quotes">
              <div
                className={cn(
                  buttonVariants({
                    size: 'sm',
                    variant: 'secondary',
                  })
                )}
              >
                Revisar cotizaciones
                <span className="sr-only"></span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </Shell>
  )
}
