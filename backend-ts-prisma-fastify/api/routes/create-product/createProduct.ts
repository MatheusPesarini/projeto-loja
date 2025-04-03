import type { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createProductSchema = z.object({
	name: z.string(),
	price: z.number(),
	quantity: z.number(),
	description: z.string().optional(),
	image: z.string().optional(),
	category: z.string(),
});

export default async function createProductRoutes(fastify: FastifyInstance) {
	fastify.post('/createProduct', async (request, reply) => {
		const result = createProductSchema.safeParse(request.body);

		if (!result.success) {
			reply.status(400).send({ error: 'Dados inválidos' });
			return;
		}
		const { name, price, quantity, description, image, category } = result.data;

		try {
			const product = await prisma.product.create({
				data: {
					name,
					price,
					quantity,
					description,
					category,
				},
			});

			//reply.redirect("/", 303);
			reply.send({ message: 'Produto criado com sucesso' });
		} catch (error) {
			fastify.log.error(error);
			reply.status(500).send({ error: 'Erro ao criar produto' });
		}
	});
}
