import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config();
const fastify = Fastify({ logger: true });

fastify.register(fastifyCookie, {
	secret: process.env.JWT_SECRET_KEY,
	hook: 'onRequest',
	parseOptions: {},
});

fastify.register(helmet);
fastify.register(cors, {
	origin: 'http://localhost:3000',
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
	allowedHeaders: ['Content-Type', 'Authorization'],
});

fastify.register(authRoutes);
fastify.register(productRoutes);

const start = async () => {
	try {
		await fastify.listen({ port: 3001 });
		console.log('🚀 Servidor rodando na porta 3001');
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};

start();
