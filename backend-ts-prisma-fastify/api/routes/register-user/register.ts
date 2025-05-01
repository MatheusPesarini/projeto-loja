import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import argon2 from 'argon2';
import { users } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '../../../db/database-connection';

const createUserSchema = z.object({
	name: z.string().optional(),
	email: z.string().email({ message: 'Email inválido' }),
	password: z
		.string()
		.min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});

export default async function createUserRoutes(fastify: FastifyInstance) {
	fastify.post('/register', async (request, reply) => {
		const result = createUserSchema.safeParse(request.body);

		if (!result.success) {
			return reply.status(400).send({
				error: 'Dados inválidos',
				details: result.error.flatten().fieldErrors,
			});
		}

		const { name, email, password } = result.data;

		try {
			const existingUsers = await db
				.select({ id: users.id })
				.from(users)
				.where(eq(users.email, email))
				.limit(1)
				.execute();

			const existingUser = existingUsers[0];

			if (existingUser) {
				return reply.status(409).send({ error: 'Email já cadastrado' });
			}

			const hashedPassword = await argon2.hash(password);

			const createdUser = await db
				.insert(users)
				.values({
					name: name,
					email: email,
					password: hashedPassword,
				})
				.returning({
					id: users.id,
					name: users.name,
					email: users.email,
				});

			if (createdUser.length === 0) {
				fastify.log.error('User insertion failed without throwing an error.');
				return reply.status(500).send({ error: 'Falha ao criar usuário' });
			}

			const newUser = createdUser[0];
			fastify.log.info(`User created successfully: ${newUser.id}`);
			reply.status(201).send(newUser);
		} catch (error: unknown) {
			fastify.log.error(error);
			reply.status(500).send({ error: 'Erro interno ao criar usuário' });
		}
	});
}
