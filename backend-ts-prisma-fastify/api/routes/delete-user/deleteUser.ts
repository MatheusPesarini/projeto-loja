import type { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function deleteUserRoutes(fastify: FastifyInstance) {
	fastify.delete('/deleteUser/:id', async (request, reply) => {
		const { id } = request.params as { id: string };

		try {
			const user = await prisma.user.delete({
				where: { id },
			});

			console.log('User deleted: ', user);
			reply.send(user);
		} catch (error) {
			fastify.log.error(error);
			reply.status(500).send({ error: 'Erro ao deletar usuário' });
		}
	});
}
