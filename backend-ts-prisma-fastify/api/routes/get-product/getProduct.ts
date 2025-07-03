import type { FastifyInstance } from 'fastify';
import { db } from '../../../db/database-connection';
import { products } from '../../../db/schema';
import { and, eq, ne } from 'drizzle-orm';
import { paramsSchema } from '../../lib/definition';

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

	fastify.get('/products/:category', async (request, reply) => {
		const { category } = request.params as { category: string };

		if (!category) {
			return reply.status(400).send({ error: 'Categoria não fornecida' });
		}

		try {
			const foundProducts = await db
				.select()
				.from(products)
				.where(eq(products.category, category))
				.execute();

			const productsList = foundProducts;

			if (productsList.length > 0) {
				reply.send(productsList);
			} else {
				reply
					.status(404)
					.send({ error: 'Nenhum produto encontrado para esta categoria' });
			}
		} catch (error) {
			fastify.log.error(
				error,
				`Erro ao buscar produtos na categoria: ${category}`,
			);
			reply
				.status(500)
				.send({ error: 'Erro interno ao buscar produtos na categoria' });
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

	fastify.get('/products/:category/related', async (request, reply) => {
		const { category } = request.params as { category: string };
		const { exclude, limit } = request.query as {
			exclude?: string;
			limit?: string;
		};

		if (!category) {
			return reply.status(400).send({ error: 'Categoria não fornecida' });
		}

		try {
			const whereCondition = exclude
				? and(eq(products.category, category), ne(products.id, exclude))
				: eq(products.category, category);

			const relatedProducts = await db
				.select()
				.from(products)
				.where(whereCondition)
				.limit(limit ? parseInt(limit) : 5)
				.execute();

			fastify.log.info(
				`Buscando produtos relacionados para a categoria: ${category}, excluindo ID: ${exclude}, limit: ${limit}`,
			);
			if (relatedProducts.length > 0) {
				reply.send(relatedProducts);
			} else {
				reply
					.status(404)
					.send({ error: 'Nenhum produto relacionado encontrado' });
			}
		} catch (error) {
			fastify.log.error(error, `Erro ao buscar produtos relacionados`);
			reply
				.status(500)
				.send({ error: 'Erro interno ao buscar produtos relacionados' });
		}
	});
}
