'use server'

import { db } from '@/db'
import { quotes } from '@/db/schema'
import type { QuoteItem, QuoteLineItem } from '@/types'
import { getMultipleProductsById } from '@/wp/get-multiple-products-by-id'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function getQuoteAction(): Promise<QuoteLineItem[]> {
  const quoteId = cookies().get('quoteId')?.value

  if (!quoteId || isNaN(Number(quoteId))) return []

  const quote = await db.query.quotes.findFirst({
    where: eq(quotes.id, Number(quoteId)),
  })

  const productIds = quote?.items?.map((item) => item.productId) ?? []

  if (productIds.length === 0) return []

  const uniqueProductIds = [...new Set(productIds)]

  const quoteLineItems = await getMultipleProductsById(uniqueProductIds)

  const allQuoteLineItems = quoteLineItems.map((item) => {
    const quantity = quote?.items?.find(
      (quoteItem) => quoteItem.productId == item.data.product.id
    )?.quantity

    return {
      ...item.data.product,
      quantity,
    }
  })

  return allQuoteLineItems
}

export async function getQuoteItemsAction(input: { quoteId?: number }) {
  if (!input.quoteId || isNaN(input.quoteId)) return []

  const quote = await db.query.quotes.findFirst({
    where: eq(quotes.id, input.quoteId),
  })

  return quote?.items
}

export async function addToQuoteAction(input: QuoteItem) {
  const cookieStore = cookies()
  const quoteId = cookieStore.get('quoteId')?.value

  if (!quoteId) {
    const quote = await db.insert(quotes).values({
      items: [input],
    })

    // Note: .set() is only available in a Server Action or Route Handler
    cookieStore.set('quoteId', String(quote.insertId))

    revalidatePath('/')
    return
  }

  const quote = await db.query.quotes.findFirst({
    where: eq(quotes.id, Number(quoteId)),
  })

  if (!quote) {
    throw new Error('Cotización no encontrada, por favor intente nuevamente.')
  }

  const quoteItem = quote.items?.find(
    (item) => item.productId === input.productId
  )

  // If this is a new product, create a new quote item. Otherwise, update the quantity of the existing quote item
  if (input.quantity > 0) {
    if (quoteItem) {
      if (input.quantity === 1) {
        quoteItem.quantity += 1
      } else {
        quoteItem.quantity = input.quantity
      }
    } else {
      quote.items?.push(input)
    }
  }

  // If the quantity is 0, remove the item from the quote
  else if (quoteItem) {
    quote.items =
      quote.items?.filter((item) => item.productId !== input.productId) ?? []
  }

  await db
    .update(quotes)
    .set({
      items: quote.items,
    })
    .where(eq(quotes.id, Number(quoteId)))

  revalidatePath('/')
}

export async function deleteQuoteAction() {
  const quoteId = Number(cookies().get('quoteId')?.value)

  if (!quoteId) {
    throw new Error('quoteId not found, please try again.')
  }

  if (isNaN(quoteId)) {
    throw new Error('Invalid quoteId, please try again.')
  }

  await db.delete(quotes).where(eq(quotes.id, quoteId))
}

export async function deleteQuoteItemAction(input: { productId: string }) {
  const quoteId = Number(cookies().get('quoteId')?.value)

  if (!quoteId) {
    throw new Error(
      'Id de la cotización no encontrada, por favor intente nuevamente.'
    )
  }

  if (isNaN(quoteId)) {
    throw new Error('Id de cotización inválido, por favor intente nuevamente.')
  }

  const quote = await db.query.quotes.findFirst({
    where: eq(quotes.id, quoteId),
  })

  if (!quote) return

  quote.items =
    quote.items?.filter((item) => item.productId !== input.productId) ?? []

  await db
    .update(quotes)
    .set({
      items: quote.items,
    })
    .where(eq(quotes.id, quoteId))

  revalidatePath('/')
}

export async function deleteQuoteItemsAction(input: { productIds: string[] }) {
  const quoteId = cookies().get('quoteId')?.value

  if (!quoteId) {
    throw new Error('quoteId not found, please try again.')
  }

  if (isNaN(Number(quoteId))) {
    throw new Error('Invalid quoteId, please try again.')
  }

  const quote = await db.query.quotes.findFirst({
    where: eq(quotes.id, Number(quoteId)),
  })

  if (!quote) return

  quote.items =
    quote.items?.filter((item) => !input.productIds.includes(item.productId)) ??
    []

  await db
    .update(quotes)
    .set({
      items: quote.items,
    })
    .where(eq(quotes.id, Number(quoteId)))

  revalidatePath('/')
}
