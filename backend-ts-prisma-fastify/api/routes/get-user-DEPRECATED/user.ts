// import type { FastifyInstance } from 'fastify';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function getUserRoutes(fastify: FastifyInstance) {
// 	fastify.get('/users', async (request, reply) => {
// 		try {
// 			const users = await prisma.user.findMany();
// 			reply.send(users);
// 		} catch (error) {
// 			fastify.log.error(error);
// 			reply.status(500).send({ error: 'Erro ao buscar usuários' });
// 		}
// 	});

// 	fastify.get('/users/:id', async (request, reply) => {
// 		const { id } = request.params as { id: string };
// 		try {
// 			const user = await prisma.user.findUnique({
// 				where: { id },
// 			});
// 			if (user) {
// 				reply.send(user);
// 			} else {
// 				reply.status(404).send({ error: 'Usuário não encontrado' });
// 			}
// 		} catch (error) {
// 			fastify.log.error(error);
// 			reply.status(500).send({ error: 'Erro ao buscar usuário' });
// 		}
// 	});
// }
