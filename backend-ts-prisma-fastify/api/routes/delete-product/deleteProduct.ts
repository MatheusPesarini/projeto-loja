import type { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function deleteProductRoutes(fastify: FastifyInstance) {
	fastify.delete('/deleteProduct/:id', async (request, reply) => {
		const { id } = request.params as { id: string };
		try {
			const product = await prisma.product.delete({
				where: { id },
			});

			console.log('Product deleted: ', product);
			reply.send(product);
		} catch (error) {
			fastify.log.error(error);
			reply.status(500).send({ error: 'Erro ao deletar produto' });
		}
	});
}
