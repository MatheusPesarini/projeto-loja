import type { FastifyInstance } from 'fastify';
import { db } from '../../../db/database-connection';
import { products } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const paramsSchema = z.object({
	id: z.string().uuid({ message: 'ID de produto inválido' }),
});

export default async function getProductRoutes(fastify: FastifyInstance) {
	fastify.get('/products', async (request, reply) => {
		try {
			const allProducts = await db.select().from(products).execute();
			reply.send(allProducts);
		} catch (error) {
			fastify.log.error(error, 'Erro ao buscar produtos');
			reply.status(500).send({ error: 'Erro interno ao buscar produtos' });
		}
	});

	fastify.get('/product/:id', async (request, reply) => {
		const paramsValidation = paramsSchema.safeParse(request.params);
		if (!paramsValidation.success) {
			return reply.status(400).send({
				error: 'ID inválido',
				details: paramsValidation.error.flatten(),
			});
		}
		const { id } = paramsValidation.data;

		try {
			const foundProducts = await db
				.select()
				.from(products)
				.where(eq(products.id, id))
				.limit(1)
				.execute();

			const product = foundProducts[0];

			if (product) {
				reply.send(product);
			} else {
				reply.status(404).send({ error: 'Produto não encontrado' });
			}
		} catch (error) {
			fastify.log.error(error, `Erro ao buscar produto com ID: ${id}`);
			reply.status(500).send({ error: 'Erro interno ao buscar produto' });
		}
	});
}
