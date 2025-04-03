import type { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function updateProfileRoutes(fastify: FastifyInstance) {
	fastify.put('/updateProfile/:id', async (request, reply) => {
		const { id } = request.params as { id: string };

		const { name, email, password } = request.body as {
			name: string;
			email: string;
			password: string;
		};

		try {
			const user = await prisma.user.update({
				where: { id },
				data: {
					name,
					email,
					password,
				},
			});

			console.log('User updated: ', user);
			reply.send(user);
		} catch (error) {
			fastify.log.error(error);
			reply.status(500).send({ error: 'Erro ao atualizar perfil' });
		}
	});
}
