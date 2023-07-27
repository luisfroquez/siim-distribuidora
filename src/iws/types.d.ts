export interface Product {
  Sku: string
  Mpn: string
  Description: string
  Type: string
  Brand: Brand
  Category: Category
  Components?: string
  CompilationDate: string
  PrePurchaseStartDate?: string
  PrePurchaseEndDate?: string
  PrePurchaseActive?: boolean
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

type IwsProduct = {
  id: number
  Sku: string
  Mpn: string
  Description: string | null
  Type: string
  Images: ProductImage[] | null
  Brand: Brand | null
  Category: Category | null
}

export interface ExtendedProduct {
  Descripcion: string
  mpn: string
  centralRecno: string
  localSku: string
  DescripcionFabrica: string
  DescripcionMarca: string
  Imagenes: ProductImage[]
}

export interface ProductImage {
  angulo: string
  imagenId: string
  isMainImage: boolean
  ancho: string
  alto: string
  url: string
}

export type Endpoint = 'getcatalog' | 'getproducts' | 'downloadextendedcatalog'

export interface Params
  extends Record<string | number, string | number | boolean> {
  locale?: 'en' | 'es'
  format?: 'json' | 'csv'
}

export type GetCatalogParams = Params

export type inventoryFilter = 'Any' | 'InStock' | 'OutOfStock'

export interface GetProductsParams extends Params {
  includePriceData?: boolean
  includeInventoryData?: boolean
  skusList?: string
  mpnsList?: string
  upcsList?: string
  inventoryFilter?: inventoryFilter
}
