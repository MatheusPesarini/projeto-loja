import type { FastifyInstance } from 'fastify';
import { db } from '../../../db/database-connection';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { users } from '../../../db/schema';
import { verifyUserSession } from '../../middleware/session';

const paramsSchema = z.object({
	id: z.string().uuid({ message: 'ID de usuário inválido' }),
});

export default async function deleteUserRoutes(fastify: FastifyInstance) {
	fastify.delete('/deleteUser/:id', async (request, reply) => {
		const paramsValidation = paramsSchema.safeParse(request.params);
		if (!paramsValidation.success) {
			return reply.status(400).send({
				error: 'ID inválido',
				details: paramsValidation.error.flatten(),
			});
		}
		const idToDelete = paramsValidation.data.id;

		let userIdFromToken: string | null = null;
		try {
			const sessionToken = request.cookies.session;
			if (!sessionToken) {
				return reply
					.status(401)
					.send({ error: 'Não autorizado: Token de sessão ausente' });
			}
			userIdFromToken = await verifyUserSession(sessionToken);
			if (!userIdFromToken) {
				throw new Error('Falha ao obter ID do usuário do token');
			}
		} catch (error) {
			fastify.log.warn(error, 'Falha na verificação do token de sessão');
			return reply
				.status(401)
				.send({ error: 'Não autorizado: Sessão inválida ou expirada' });
		}

		if (userIdFromToken !== idToDelete) {
			fastify.log.warn(
				`Tentativa de acesso não autorizado: Usuário ${userIdFromToken} tentando deletar usuário ${idToDelete}`,
			);
			return reply.status(403).send({
				error: 'Acesso negado: Você só pode deletar sua própria conta',
			});
		}

		fastify.log.info(
			`Autorizado: Usuário ${userIdFromToken} deletando conta ${idToDelete}`,
		);

		try {
			const deletedUsers = await db
				.delete(users)
				.where(eq(users.id, idToDelete))
				.returning({
					id: users.id,
					email: users.email,
					name: users.name,
				});

			if (deletedUsers.length === 0) {
				return reply
					.status(404)
					.send({ error: 'Usuário não encontrado para deleção' });
			}

			const deletedUser = deletedUsers[0];
			fastify.log.info('User deleted successfully: ', deletedUser);

			reply.clearCookie('session', {
				path: '/',
				secure: process.env.NODE_ENV === 'production',
				httpOnly: true,
				sameSite: 'lax', // Deve corresponder ao setCookie
			});

			reply.send({
				success: true,
				message: 'Usuário deletado com sucesso',
				deletedUser,
			});
		} catch (error: unknown) {
			fastify.log.error(error, 'Error deleting user');
			reply.status(500).send({ error: 'Erro interno ao deletar usuário' });
		}
	});
}
