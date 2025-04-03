import type { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import argon2 from 'argon2';

const prisma = new PrismaClient();

const createUserSchema = z.object({
	name: z.string().optional(),
	email: z.string().email(),
	password: z.string().min(1),
});

export default async function createUserRoutes(fastify: FastifyInstance) {
	fastify.post('/register', async (request, reply) => {
		const result = createUserSchema.safeParse(request.body);

		if (!result.success) {
			reply.status(400).send({ error: 'Dados inválidos' });
			return;
		}

		const { name, email, password } = result.data;

		try {
			const hashedPassword = await argon2.hash(password);

			const user = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
			});

			//reply.redirect("/", 303);
			reply.send(user);
		} catch (error) {
			fastify.log.error(error);
			reply.status(500).send({ error: 'Erro ao criar usuário' });
		}
	});
}
