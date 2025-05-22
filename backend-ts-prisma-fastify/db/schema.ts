// filepath: src/db/schema.ts
import {
	pgTable,
	uuid,
	text,
	integer,
	timestamp,
	decimal,
	primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const vendors = pgTable('Vendor', {
	id: uuid('id').primaryKey().defaultRandom(),
	companyName: text('companyName').notNull().unique(),
	cnpj: text('cnpj').notNull().unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
});

export const users = pgTable('User', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	name: text('name'),
});

export const products = pgTable('Product', {
	id: uuid('id').primaryKey().defaultRandom(),
	productName: text('productName').notNull(),
	brand: text('brand').notNull(),
	model: text('model').notNull(),
	category: text('category').notNull(),
	originalPrice: decimal('originalPrice', { precision: 10, scale: 2 }).notNull(),
	discountedPrice: decimal('discountedPrice', { precision: 10, scale: 2 }),
	discount: decimal('discount', { precision: 5, scale: 2 }),
	quantity: integer('quantity').notNull(),
	description: text('description').notNull(),
	image: text('image').notNull(),
	createdAt: timestamp('createdAt', { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updatedAt', { withTimezone: true })
		.defaultNow()
		.notNull(),
	vendorId: uuid('vendorId').references(() => vendors.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
});

export const sizes = pgTable('Size', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull().unique(),
})

export const productSizes = pgTable('ProductSize', {
	productId: uuid('productId').notNull().references(() => products.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	sizeId: uuid('sizeId').notNull().references(() => sizes.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	quantity: integer('quantity').notNull().default(0),
}, (table) => {
	return {
		pk: primaryKey({ columns: [table.productId, table.sizeId] }),
	}
});

export const orders = pgTable('Order', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
	productId: uuid('productId')
		.notNull()
		.references(() => products.id, {
			onDelete: 'restrict',
			onUpdate: 'cascade',
		}),
	quantity: integer('quantity').notNull(),
	createdAt: timestamp('createdAt', { withTimezone: true })
		.defaultNow()
		.notNull(),
});


export const vendorRelations = relations(vendors, ({ many }) => ({
	products: many(products),
}));

export const userRelations = relations(users, ({ many }) => ({
	orders: many(orders),
}));

export const productRelations = relations(products, ({ one, many }) => ({
	vendor: one(vendors, {
		fields: [products.vendorId],
		references: [vendors.id],
	}),
	orders: many(orders),
}));

export const orderRelations = relations(orders, ({ one }) => ({
	user: one(users, {
		fields: [orders.userId],
		references: [users.id],
	}),
	product: one(products, {
		fields: [orders.productId],
		references: [products.id],
	}),
}));
