import type { FastifyInstance } from 'fastify';
import { ProductController } from '../controllers/productController';
import {
	categoryParamSchema,
	errorResponseSchema,
	productResponseSchema,
	productsListResponseSchema,
	relatedProductsQuerySchema,
	searchParamSchema,
	uuidParamSchema,
} from '../types/swagger-schemas';

export default async function productRoutes(fastify: FastifyInstance) {
	fastify.get(
		'/products',
		{
			schema: {
				tags: ['Products'],
				summary: 'Listar todos os produtos',
				description: 'Retorna lista completa de produtos disponíveis',
				response: {
					200: productsListResponseSchema,
					500: errorResponseSchema,
				},
			},
		},
		ProductController.getAllProducts,
	);

	fastify.get(
		'/products/:category',
		{
			schema: {
				tags: ['Products'],
				summary: 'Buscar produtos por categoria',
				description: 'Retorna produtos filtrados por categoria',
				params: categoryParamSchema,
				response: {
					200: productResponseSchema,
					400: errorResponseSchema,
					404: errorResponseSchema,
					500: errorResponseSchema,
				},
			},
		},
		ProductController.getProductsByCategory,
	);

	fastify.get(
		'/product/:id',
		{
			schema: {
				tags: ['Products'],
				summary: 'Buscar produto por ID',
				description: 'Retorna detalhes de um produto específico',
				params: uuidParamSchema,
				response: {
					200: productResponseSchema,
					400: errorResponseSchema,
					404: errorResponseSchema,
					500: errorResponseSchema,
				},
			},
		},
		ProductController.getProductById,
	);

	fastify.get(
		'/products/:category/related',
		{
			schema: {
				tags: ['Products'],
				summary: 'Buscar produtos relacionados',
				description:
					'Retorna produtos da mesma categoria (excluindo um produto específico)',
				params: categoryParamSchema,
				querystring: relatedProductsQuerySchema,
				response: {
					200: productsListResponseSchema,
					400: errorResponseSchema,
					404: errorResponseSchema,
					500: errorResponseSchema,
				},
			},
		},
		ProductController.getRelatedProducts,
	);

	fastify.get(
		'/products/search/:searchTerm',
		{
			schema: {
				tags: ['Products'],
				summary: 'Buscar produtos por termo',
				description: 'Pesquisa produtos por nome ou descrição',
				params: searchParamSchema,
				response: {
					200: productsListResponseSchema,
					400: errorResponseSchema,
					404: errorResponseSchema,
					500: errorResponseSchema,
				},
			},
		},
		ProductController.searchProducts,
	);
}
