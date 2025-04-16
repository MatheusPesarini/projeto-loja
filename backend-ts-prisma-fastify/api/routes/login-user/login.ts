import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import argon2 from 'argon2';
import { users } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '../../../db/database-connection';

const loginUserSchema = z.object({
	email: z.string().email({ message: 'Email inválido' }),
	password: z.string().min(1, { message: 'Senha não pode estar vazia' }),
});

export default async function loginUserRoutes(fastify: FastifyInstance) {
	fastify.post('/login', async (request, reply) => {
		const result = loginUserSchema.safeParse(request.body);

		if (!result.success) {
			return reply.status(400).send({
				error: 'Dados inválidos',
				details: result.error.flatten().fieldErrors,
			});
		}

		const { email, password } = result.data;

		try {
			const foundUsers = await db
				.select({ id: users.id, passwordHash: users.password })
				.from(users)
				.where(eq(users.email, email))
				.limit(1)
				.execute();

			const user = foundUsers[0];

			if (!user) {
				return reply.status(404).send({ error: 'Usuário não encontrado' });
			}

			const isPasswordValid = await argon2.verify(user.passwordHash, password);

			if (!isPasswordValid) {
				return reply.status(401).send({ error: 'Senha inválida' });
			}

			fastify.log.info(`User ${user.id} logged in successfully.`);

			reply.send({ message: 'Login bem-sucedido' });
		} catch (error) {
			fastify.log.error(error);
			reply.status(500).send({ error: 'Erro ao fazer login' });
		}
	});
}
