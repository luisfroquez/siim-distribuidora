'use client'
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { CommandDialog, CommandInput } from '@/components/ui/command'
import { Skeleton } from '@/components/ui/skeleton'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'
import { SEARCH_PRODUCTS_CATEGORIES_TAGS } from '@/wp/queries'
import type { WpSearchResult } from '@/wp/types'
import { useQuery } from '@apollo/client'
import * as React from 'react'
import ComboboxSearchResult from './combobox-search-result'

export function Combobox() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const debouncedQuery = useDebounce(query, 300)

  const {
    loading: isPending,
    data,
    refetch,
  } = useQuery<WpSearchResult>(SEARCH_PRODUCTS_CATEGORIES_TAGS, {
    variables: { search: debouncedQuery },
  })

  React.useEffect(() => {
    if (debouncedQuery.length > 0) {
      refetch()
    }
  }, [debouncedQuery])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((isOpen) => !isOpen)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  React.useEffect(() => {
    if (!isOpen) {
      setQuery('')
    }
  }, [isOpen])

  const resultHasCategories = data?.productCategories?.nodes
    ? data?.productCategories?.nodes?.length > 0
    : false

  const resultHasProducts = data?.products?.nodes
    ? data?.products?.nodes?.length > 0
    : false

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Buscar productos...</span>
        <span className="sr-only">Buscar productos</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </Button>
      <CommandDialog position="top" open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Buscar productos..."
          value={query}
          onValueChange={setQuery}
        />

        <div className="flex flex-col p-2">
          {isPending ? (
            <div className="flex flex-col">
              <Skeleton className="h-7 w-24 rounded-sm" />
              <div className="flex flex-col gap-1 p-1 px-2">
                <Skeleton className="h-8 rounded-sm" />
                <Skeleton className="h-8 rounded-sm" />
                <Skeleton className="h-8 rounded-sm" />
              </div>
            </div>
          ) : (
            <>
              {resultHasProducts && (
                <ComboboxSearchResult
                  action={() => setIsOpen(false)}
                  nodes={data?.products?.nodes ?? []}
                  path="/tienda/producto/"
                  title="Productos"
                />
              )}
              {resultHasCategories && (
                <ComboboxSearchResult
                  action={() => setIsOpen(false)}
                  nodes={data?.productCategories?.nodes ?? []}
                  path="/tienda/categoria-producto/"
                  title="Categorías"
                />
              )}
            </>
          )}

          <p
            className={cn(
              isPending || resultHasProducts || resultHasCategories
                ? 'hidden'
                : 'py-6 text-center text-sm'
            )}
          >
            No encontramos resultados.
          </p>
        </div>
      </CommandDialog>
    </>
  )
}
