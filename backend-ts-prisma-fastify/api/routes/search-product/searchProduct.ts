import type { FastifyInstance } from 'fastify';
import { db } from '../../../db/database-connection';
import { products } from '../../../db/schema';
import { ilike } from 'drizzle-orm';
import { searchQuerySchema } from '../../lib/definition';

export default async function getProductRoutes(fastify: FastifyInstance) {
	fastify.get('/product/search/:id', async (request, reply) => {
		const queryValidation = searchQuerySchema.safeParse(request.params);
		if (!queryValidation.success) {
			return reply.status(400).send({
				success: false,
				message: 'Termo de busca inválido.',
				errors: queryValidation.error.flatten().fieldErrors,
			});
		}
		const q = queryValidation.data;
		const searchTerm = `%${q}%`;

		try {
			const foundProducts = await db
				.select()
				.from(products)
				.where(ilike(products.productName, searchTerm))
				.limit(99)
				.execute();

			reply.send({
				success: true,
				products: foundProducts,
			});
		} catch (error) {
			fastify.log.error(error, `Erro ao buscar produtos com termo: ${q}`);
			reply.status(500).send({
				success: false,
				errors: { _form: ['Erro interno ao buscar produtos'] },
			});
		}
	});
}
