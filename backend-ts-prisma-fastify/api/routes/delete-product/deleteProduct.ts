import type { FastifyInstance } from 'fastify';
import { products } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '../../../db/database-connection';

export default async function deleteProductRoutes(fastify: FastifyInstance) {
	fastify.delete('/deleteProduct/:id', async (request, reply) => {
		const { id } = request.params as { id: string };
		try {
			const deletedProducts = await db
				.delete(products)
				.where(eq(products.id, id))
				.returning();

			if (deletedProducts.length === 0) {
				return reply.status(404).send({ error: 'Produto não encontrado' });
			}

			const deletedProduct = deletedProducts[0];
			console.log('Product deleted: ', deletedProduct);
			reply.send(deletedProduct);
		} catch (error) {
			fastify.log.error(error);
			reply.status(500).send({ error: 'Erro ao deletar produto' });
		}
	});
}
