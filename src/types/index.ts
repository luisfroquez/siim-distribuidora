import { type Icons } from '@/components/icons'
import { type WpProduct } from '@/wp/types'
import { type FileWithPath } from 'react-dropzone'

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

// QUOTES
export type QuoteItem = {
  productId: string
  quantity: number
  isVariable?: boolean
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
