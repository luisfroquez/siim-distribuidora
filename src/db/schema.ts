import type { QuoteItem } from '@/types'
import { type InferModel } from 'drizzle-orm'
import {
  boolean,
  json,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

export const quotes = mysqlTable('quotes', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 191 }),
  items: json('items').$type<QuoteItem[] | null>().default(null),
  createdAt: timestamp('createdAt').defaultNow(),
})

export type Quote = InferModel<typeof quotes>

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
