import type { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function updateProductRoutes(fastify: FastifyInstance) {
	fastify.put('/updateProduct/:id', async (request, reply) => {
		const { id } = request.params as { id: string };

		const { name, price, quantity } = request.body as {
			name: string;
			price: number;
			quantity: number;
		};

		try {
			const product = await prisma.product.update({
				where: { id },
				data: {
					name,
					price,
					quantity,
				},
			});

			console.log('Product updated: ', product);
			reply.send(product);
		} catch (error) {
			fastify.log.error(error);
			reply.status(500).send({ error: 'Erro ao atualizar produto' });
		}
	});
}
