import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

// import { getUserRoutes } from "./routes/get-user-DEPRECATED/user";
import loginUserRoutes from './routes/login-user/login';
import createUserRoutes from './routes/register-user/register';
import deleteUserRoutes from './routes/delete-user/deleteUser';
import logoutRoutes from './routes/logout/logout';
import updateProfileRoutes from './routes/update-profile/updateProfile';

import getProductRoutes from './routes/get-product/getProduct';
import deleteProductRoutes from './routes/delete-product/deleteProduct';

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
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
});

// fastify.register(getUserRoutes);
fastify.register(loginUserRoutes);
fastify.register(createUserRoutes);
fastify.register(deleteUserRoutes);
fastify.register(logoutRoutes);
fastify.register(updateProfileRoutes);

fastify.register(getProductRoutes);
fastify.register(deleteProductRoutes);

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
