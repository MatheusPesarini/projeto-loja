import type { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getProductRoutes(fastify: FastifyInstance) {
	fastify.get('/products', async (request, reply) => {
		try {
			const products = prisma.product.findMany();
			reply.send(products);
		} catch (error) {
			fastify.log.error(error);
			reply.status(500).send({ error: 'Erro ao buscar produtos' });
		}
	});

	fastify.get('/product/:id', async (request, reply) => {
		const { id } = request.params as { id: string };
		try {
			const product = await prisma.product.findUnique({
				where: { id },
			});
			if (product) {
				reply.send(product);
			} else {
				reply.status(404).send({ error: 'Produto não encontrado' });
			}
		} catch (error) {
			fastify.log.error(error);
			reply.status(500).send({ error: 'Erro ao buscar produto' });
		}
	});
}
