import type { FastifyInstance } from 'fastify';
import { ProductController } from '../controllers/productController';

export default async function productRoutes(fastify: FastifyInstance) {
	fastify.get('/products', ProductController.getAllProducts);
	fastify.get('/products/:category', ProductController.getProductsByCategory);
	fastify.get('/product/:id', ProductController.getProductById);
	fastify.get(
		'/products/:category/related',
		ProductController.getRelatedProducts,
	);
	fastify.get('/products/search/:searchTerm', ProductController.searchProducts);
}
