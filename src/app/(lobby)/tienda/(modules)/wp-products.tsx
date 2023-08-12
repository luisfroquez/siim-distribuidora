'use client'

import type { Option } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

import { Icons } from '@/components/icons'
import { PaginationButton } from '@/components/pagination-button'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { GET_ALL_PRODUCTS } from '@/wp/queries'

import Switch from '@/components/ui/switch/switch'
import { wpSortOptions } from '@/config/wp-products'
import {
  type WpCategories,
  type WpGetAllProducts,
  type WpGetAllProductsVariables,
} from '@/wp/types'
import { useQuery } from '@apollo/client'
import { WpProductCard } from '../../../../components/product-card/wp-product-card'
import WpProductsSkeleton from './wp-products-skeleton'

interface WpProductsProps {
  category?: WpCategories | null
}

export function WpProducts({ category }: WpProductsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  // Search params
  const page = searchParams?.get('page') ?? '1'
  const per_page = searchParams?.get('per_page') ?? '16'
  const sort = searchParams?.get('sort') ?? 'ASC'
  const sortField = searchParams.get('sortField') ?? 'NAME'
  const featured = searchParams.get('featured') === 'true' ? true : undefined
  const categoryId = category?.databaseId

  const { loading, data, error } = useQuery<
    WpGetAllProducts,
    WpGetAllProductsVariables
  >(GET_ALL_PRODUCTS, {
    variables: {
      first: Number(per_page),
      orderByField: sortField,
      orderByOrder: sort,
      featured: featured,
      categoryId: categoryId,
    },
  })

  const products = data?.products.edges

  const pageCount = data?.products.pageInfo.total ?? 0

  const renderPagination = products?.length && pageCount / Number(per_page) > 1

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  // Category filter
  const [selectedCategories, setSelectedCategories] = React.useState<
    Option[] | null
  >(null)

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          categories: selectedCategories?.length
            ? // Join categories with a dot to make search params prettier
              selectedCategories.map((c) => c.value).join('.')
            : null,
        })}`
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories])

  // Subcategory filter
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<
    Option[] | null
  >(null)
  // const subcategories = getSubcategories(category)

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          subcategories: selectedSubcategories?.length
            ? selectedSubcategories.map((s) => s.value).join('.')
            : null,
        })}`
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubcategories])

  if (loading) return <WpProductsSkeleton />

  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="flex flex-col space-y-6 h-full pb-6">
      <div className="flex items-center space-x-2 w-full justify-between">
        {/* FILTRAR */}
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Filter products" size="sm" disabled={isPending}>
              Filtrar
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader className="px-1">
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <Separator />
            <Switch
              label="Mostrar solo productos Selección SIIM"
              defaultChecked={featured}
              onChange={(isChecked) => {
                startTransition(() => {
                  router.push(
                    `${pathname}?${createQueryString({
                      featured: !isChecked ? 'true' : null,
                    })}`
                  )
                })
              }}
            />
            <Separator />
            <div className="flex flex-1 flex-col gap-5 overflow-hidden px-4">
              {/* {categories?.length ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wide text-foreground">
                    Categories
                  </h3>
                  <MultiSelect
                    placeholder="Select categories"
                    selected={selectedCategories}
                    setSelected={setSelectedCategories}
                    options={categories.map((c) => ({
                      label: toTitleCase(c),
                      value: c,
                    }))}
                  />
                </div>
              ) : null}
              {category ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wide text-foreground">
                    Subcategories
                  </h3>
                  <MultiSelect
                    placeholder="Select subcategories"
                    selected={selectedSubcategories}
                    setSelected={setSelectedSubcategories}
                    options={subcategories}
                  />
                </div>
              ) : null} */}
            </div>
            <div>
              <Separator className="my-4" />
              <SheetFooter>
                <Button
                  aria-label="Clear filters"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    startTransition(() => {
                      router.push(
                        `${pathname}?${createQueryString({
                          price_range: 0 - 100,
                          store_ids: null,
                          categories: null,
                          subcategories: null,
                        })}`
                      )

                      setSelectedCategories(null)
                      setSelectedSubcategories(null)
                      // setStoreIds(null)
                    })
                  }}
                  disabled={isPending}
                >
                  Clear Filters
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
        {/* ORDENAR */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort products" size="sm" disabled={isPending}>
              Ordenar
              <Icons.chevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Ordernar por</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {wpSortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn(
                  option.value.field === sortField &&
                    option.value.order === sort &&
                    'font-bold'
                )}
                onClick={() => {
                  startTransition(() => {
                    router.push(
                      `${pathname}?${createQueryString({
                        sortField: option.value.field,
                        sort: option.value.order,
                      })}`
                    )
                  })
                }}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-muted-foreground text-xs justify-end w-full pr-2 flex">
          {pageCount} Resultados
        </span>
      </div>
      {!isPending && !products?.length ? (
        <div className="flex flex-col space-y-1.5 h-full justify-center items-center w-full bg-border rounded-xl">
          <h1 className="text-center text-2xl max-w-lg font-bold">
            No se encontraron productos
          </h1>
          <p className="max-w-lg text-center text-muted-foreground">
            Intenta cambiando tus filtros, o visitanos luego cuando actualicemos
            nuestro catálogo
          </p>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map((product) => (
          <WpProductCard key={product.cursor} product={product.node} />
        ))}
      </div>
      {renderPagination ? (
        <PaginationButton
          pageCount={pageCount}
          page={page}
          per_page={per_page}
          sort={sort}
          createQueryString={createQueryString}
          router={router}
          pathname={pathname}
          isPending={isPending}
          startTransition={startTransition}
        />
      ) : null}
    </div>
  )
}
