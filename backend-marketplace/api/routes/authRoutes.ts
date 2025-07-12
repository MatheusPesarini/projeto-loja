import type { FastifyInstance } from 'fastify';
import { AuthController } from '../controllers/authController';
import {
	createUserRequestSchema,
	createUserResponseSchema,
	deleteResponseSchema,
	errorResponseSchema,
	loginResponseSchema,
	loginUserRequestSchema,
	uuidUserParamSchema,
} from '../types/swagger-schemas';

export default async function authRoutes(fastify: FastifyInstance) {
	fastify.post(
		'/register',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Registrar novo usuário',
				description: 'Cria uma nova conta de usuário',
				body: createUserRequestSchema,
				response: {
					201: createUserResponseSchema,
					400: errorResponseSchema,
					409: errorResponseSchema,
					500: errorResponseSchema,
				},
			},
		},
		AuthController.registerUser,
	);

	fastify.post(
		'/login',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Realizar login do usuário',
				description: 'Autentica o usuário e retorna cookie de sessão',
				body: loginUserRequestSchema,
				response: {
					200: loginResponseSchema,
					400: errorResponseSchema,
					401: errorResponseSchema,
					404: errorResponseSchema,
					500: errorResponseSchema,
				},
			},
		},
		AuthController.loginUser,
	);

	fastify.post(
		'/users/:id',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Deletar usuário',
				description: 'Remove a conta do usuário (requer autenticação)',
				security: [{ cookieAuth: [] }],
				params: uuidUserParamSchema,
				response: {
					200: deleteResponseSchema,
					400: errorResponseSchema,
					403: errorResponseSchema,
					404: errorResponseSchema,
					500: errorResponseSchema,
				},
			},
		},
		AuthController.deleteUser,
	);
}
