export interface ProductsList {
  Sku: string
  Mpn: string
  Brand: Brand
  Category: Category
  Description: string
  Type: string
}

export interface Brand {
  ManufacturerId: string
  BrandId: string
  Description: string
}

export interface Category {
  CategoryId: string
  Description: string
  Subcategories: Category[]
}

export type Endpoint = 'getcatalog' | 'getproducts'

export interface Params
  extends Record<string | number, string | number | boolean> {
  locale?: 'en' | 'es'
  format?: 'json' | 'csv'
}

export type GetCatalogParams = Params
