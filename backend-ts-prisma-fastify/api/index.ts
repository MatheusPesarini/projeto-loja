import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

// import { getUserRoutes } from "./routes/get-user-DEPRECATED/user";
import loginUserRoutes from './routes/login-user/login';
import createUserRoutes from './routes/create-user/register';
import deleteUserRoutes from './routes/delete-user/deleteUser';
import logoutRoutes from './routes/logout/logout';
import updateProfileRoutes from './routes/update-profile/updateProfile';

import createProductRoutes from './routes/create-product/createProduct';
import getProductRoutes from './routes/get-product/getProduct';
import deleteProductRoutes from './routes/delete-product/deleteProduct';
import updateProductRoutes from './routes/update-product/updateProduct';

const fastify = Fastify({ logger: true });

// Registre o plugin @fastify/cookie
fastify.register(fastifyCookie, {
	secret: 'my-secret', // Use uma chave secreta para assinar os cookies
	hook: 'onRequest', // Execute o plugin no gancho onRequest
	parseOptions: {}, // Opções de análise de cookies
});

fastify.register(helmet);
fastify.register(cors, {
	origin: 'http://localhost:3000',
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
});

// fastify.register(getUserRoutes);
fastify.register(loginUserRoutes);
fastify.register(createUserRoutes);
fastify.register(deleteUserRoutes);
fastify.register(logoutRoutes);
fastify.register(updateProfileRoutes);

fastify.register(createProductRoutes);
fastify.register(getProductRoutes);
fastify.register(deleteProductRoutes);
fastify.register(updateProductRoutes);

const start = async () => {
	try {
		await fastify.listen({ port: 3001 });
		const address = fastify.server.address();
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};

start();
