/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import { db } from '../../db/database-connection';
import { products } from '../../db/schema';
import { eq, ilike, and, ne } from 'drizzle-orm';

export class ProductService {
	static async getAllProducts() {
		return await db.select().from(products).execute();
	}

	static async getProductsByCategory(category: string) {
		return await db
			.select()
			.from(products)
			.where(eq(products.category, category))
			.execute();
	}

	static async getProductById(id: string) {
		const foundProducts = await db
			.select()
			.from(products)
			.where(eq(products.id, id))
			.limit(1)
			.execute();

		return foundProducts[0] || null;
	}

	static async searchProducts(searchTerm: string) {
		const term = `%${searchTerm}%`;
		return await db
			.select()
			.from(products)
			.where(ilike(products.productName, term))
			.limit(99)
			.execute();
	}

	static async getRelatedProducts(
		category: string,
		excludeId: string,
		limit: number = 5,
	) {
		const whereCondition = and(
			eq(products.category, category),
			ne(products.id, excludeId),
		);

		return await db
			.select()
			.from(products)
			.where(whereCondition)
			.limit(limit)
			.execute();
	}
}
