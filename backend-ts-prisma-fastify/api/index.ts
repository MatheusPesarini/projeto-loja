import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import dotenv from 'dotenv';

// import { getUserRoutes } from "./routes/get-user-DEPRECATED/user";
import loginUserRoutes from './routes/login-user/login';
import createUserRoutes from './routes/register-user/register';
import deleteUserRoutes from './routes/delete-user/deleteUser';
import updateProfileRoutes from './routes/update-profile/updateProfile';

import getProductRoutes from './routes/get-product/getProduct';

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
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
});

// fastify.register(getUserRoutes);
fastify.register(loginUserRoutes);
fastify.register(createUserRoutes);
fastify.register(deleteUserRoutes);
fastify.register(updateProfileRoutes);

fastify.register(getProductRoutes);

const start = async () => {
	try {
		await fastify.listen({ port: 3001 });
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};

start();
