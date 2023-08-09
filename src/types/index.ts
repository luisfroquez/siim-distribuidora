import { type Product } from '@/db/schema'
import { type FileWithPath } from 'react-dropzone'

import { type Icons } from '@/components/icons'
import { WpProduct } from '@/wp/types'

export interface WPProductCategories {
  ID: number
  title: string
  url: string
  children?: WPProductCategories[]
  pageSlug: string
  pageID: number
}

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type UserRole = 'user' | 'admin' | 'superadmin'

export type Option = {
  label: string
  value: string
}

export type FileWithPreview = FileWithPath & {
  preview: string
}

export type StoredFile = {
  id: string
  name: string
  url: string
}

export type CartItem = {
  productId: number
  quantity: number
  productSubcategory?: string | null
}

export interface CheckoutItem extends CartItem {
  price: number
}

export interface CartLineItem
  extends Pick<
    Product,
    | 'id'
    | 'name'
    | 'images'
    | 'category'
    | 'subcategory'
    | 'price'
    | 'inventory'
    | 'storeId'
  > {
  quantity?: number
  storeName: string | null
}

// QUOTES
export type QuoteItem = {
  productId: string
  quantity: number
}

export interface QuoteLineItem extends WpProduct {
  quantity?: number
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
  monthlyPrice?: number | null
}
