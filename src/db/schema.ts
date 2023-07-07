import type { CartItem, StoredFile } from '@/types'
import { relations, sql, type InferModel } from 'drizzle-orm'
import {
  boolean,
  datetime,
  decimal,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

// IWS TABLES:
// Brands
export const brands = mysqlTable('brands', {
  id: serial('id').primaryKey(),
  ManufacturerId: varchar('manufacturer_id', { length: 12 }).notNull(),
  BrandId: varchar('brand_id', { length: 12 }).notNull(),
  description: text('description').notNull(),
})
export type Brands = InferModel<typeof brands>

// Categories
export const categories = mysqlTable('categories', {
  id: serial('id').primaryKey(),
  CategoryId: varchar('category_id', { length: 12 }).notNull(),
  Description: text('description').notNull(),
  Path: json('path').$type<string[] | null>().default(null),
})
export type Categories = InferModel<typeof categories>

// IwsProducts
export const iwsProducts = mysqlTable('iws_products', {
  id: serial('id').primaryKey(),
  Sku: varchar('Sku', { length: 12 }).notNull(),
  Mpn: varchar('Sku', { length: 12 }).notNull(),
  Description: text('description'),
  Images: json('images').$type<StoredFile[] | null>().default(null),
  BrandId: varchar('brand_id', { length: 12 }).notNull(),
  CategoryId: varchar('category_id', { length: 12 }).notNull(),
})
export type IwsProduct = InferModel<typeof iwsProducts>

// IWS RELATIONS:
export const brandsRelations = relations(brands, ({ many }) => ({
  iwsProducts: many(iwsProducts),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  iwsProducts: many(iwsProducts),
}))

export const iwsProductsRelations = relations(iwsProducts, ({ one }) => ({
  brands: one(brands, {
    fields: [iwsProducts.BrandId],
    references: [brands.BrandId],
  }),
  categories: one(categories, {
    fields: [iwsProducts.CategoryId],
    references: [categories.CategoryId],
  }),
}))

// OTHERS

export const stores = mysqlTable('stores', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 191 }).notNull(),
  name: varchar('name', { length: 191 }).notNull(),
  description: text('description'),
  slug: text('slug'),
  createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`),
})

export type Store = InferModel<typeof stores>

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
}))

export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 191 }).notNull(),
  description: text('description'),
  images: json('images').$type<StoredFile[] | null>().default(null),
  category: mysqlEnum('category', [
    'Detección de Incendio',
    'Extinción de Incendio',
    'Electrónica',
    'Ferretería',
    'Canalización',
    'Electricidad',
  ])
    .notNull()
    .default('Detección de Incendio'),
  subcategory: varchar('subcategory', { length: 191 }),
  price: decimal('price', { precision: 10, scale: 2 }).notNull().default('0'),
  inventory: int('inventory').notNull().default(0),
  rating: int('rating').notNull().default(0),
  tags: json('tags').$type<string[] | null>().default(null),
  storeId: int('storeId').notNull(),
  createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`),
})

export type Product = InferModel<typeof products>

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
}))

export const carts = mysqlTable('carts', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 191 }),
  paymentIntentId: varchar('paymentIntentId', { length: 191 }),
  clientSecret: varchar('clientSecret', { length: 191 }),
  items: json('items').$type<CartItem[] | null>().default(null),
  createdAt: timestamp('createdAt').defaultNow(),
})

export type Cart = InferModel<typeof carts>

export const emailPreferences = mysqlTable('email_preferences', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 191 }),
  email: varchar('email', { length: 191 }).notNull(),
  token: varchar('token', { length: 191 }).notNull(),
  newsletter: boolean('newsletter').notNull().default(false),
  marketing: boolean('marketing').notNull().default(false),
  transactional: boolean('transactional').notNull().default(false),
  createdAt: timestamp('createdAt').defaultNow(),
})

export type EmailPreference = InferModel<typeof emailPreferences>
