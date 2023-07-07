import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCatalog } from '@/iws/get-products-list'

// UPDATES CATALOG EVERY 24HS.

export function GET(request: NextRequest) {
  return getCatalog()
    .then((a) => {
      const primerSku = a[0]?.Sku
      return NextResponse.json(
        {
          body: request.body,
          path: request.nextUrl.pathname,
          query: request.nextUrl.search,
          cookies: request.cookies.getAll(),
          primerSku: primerSku,
        },
        {
          status: 200,
        }
      )
    })
    .catch((e) => {
      return NextResponse.json(
        {
          body: request.body,
          path: request.nextUrl.pathname,
          query: request.nextUrl.search,
          cookies: request.cookies.getAll(),
          error: e,
        },
        {
          status: 400,
        }
      )
    })
}
