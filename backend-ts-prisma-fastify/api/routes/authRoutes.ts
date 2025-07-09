import type { FastifyInstance } from 'fastify';
import { AuthController } from '../controllers/authController';

export default async function authRoutes(fastify: FastifyInstance) {
	fastify.post('/register', AuthController.registerUser);
	fastify.post('/login', AuthController.loginUser);
	fastify.post('/deleteUser', AuthController.deleteUser);
}
