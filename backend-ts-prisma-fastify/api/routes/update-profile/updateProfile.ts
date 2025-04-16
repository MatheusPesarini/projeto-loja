import type { FastifyInstance } from 'fastify';
import { users } from '../../../db/schema';
import { db } from '../../../db/database-connection';
import { z } from 'zod';
import argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { verifySession } from '../../middleware/session';

const paramsSchema = z.object({
	id: z.string().uuid({ message: 'ID de usuário inválido' }),
});

const updateProfileSchema = z.object({
	name: z.string().min(1, 'Nome não pode ser vazio').optional(),
	email: z.string().email('Email inválido').optional(),
	password: z
		.string()
		.min(6, 'Nova senha deve ter no mínimo 6 caracteres')
		.optional(),
});

export default async function updateProfileRoutes(fastify: FastifyInstance) {
	fastify.patch('/updateProfile/:id', async (request, reply) => {
		const paramsValidation = paramsSchema.safeParse(request.params);
		if (!paramsValidation.success) {
			return reply.status(400).send({
				error: 'ID inválido',
				details: paramsValidation.error.flatten(),
			});
		}
		const { id } = paramsValidation.data;

		let userIdFromToken: string | undefined;
		try {
			const sessionsToken = request.cookies.session;
			if (!sessionsToken) {
				return reply
					.status(401)
					.send({ error: 'Não autorizado: Token de sessão ausente' });
			}

			userIdFromToken = (await verifySession(sessionsToken)) ?? undefined;

			if (!userIdFromToken) {
				throw new Error('Falha ao obter ID do usuário do token');
			}
		} catch (error) {
			fastify.log.warn(error, 'Falha na verificação do token de sessão');
			return reply
				.status(401)
				.send({ error: 'Não autorizado: Sessão inválida ou expirada' });
		}

		if (userIdFromToken !== id) {
			fastify.log.warn(
				`Tentativa de acesso não autorizado: Usuário ${userIdFromToken} tentando atualizar perfil ${id}`,
			);
			return reply.status(403).send({
				error: 'Acesso negado: Você só pode atualizar seu próprio perfil',
			});
		}

		fastify.log.info(
			`Autorizado: Usuário ${userIdFromToken} atualizando perfil ${id}`,
		);

		const bodyValidation = updateProfileSchema.safeParse(request.body);
		if (!bodyValidation.success) {
			return reply.status(400).send({
				error: 'Dados inválidos',
				details: bodyValidation.error.flatten().fieldErrors,
			});
		}
		const validatedData = bodyValidation.data;

		const dataToUpdate: Partial<typeof users.$inferInsert> = {};

		if (validatedData.name !== undefined) {
			dataToUpdate.name = validatedData.name;
		}
		if (validatedData.email !== undefined) {
			dataToUpdate.email = validatedData.email;
		}
		if (validatedData.password !== undefined) {
			dataToUpdate.password = await argon2.hash(validatedData.password);
		}

		if (Object.keys(dataToUpdate).length === 0) {
			return reply
				.status(400)
				.send({ error: 'Nenhum dado fornecido para atualização' });
		}

		try {
			const updatedUsers = await db
				.update(users)
				.set(dataToUpdate)
				.where(eq(users.id, id))
				.returning({
					id: users.id,
					name: users.name,
					email: users.email,
				});

			if (updatedUsers.length === 0) {
				return reply.status(404).send({ error: 'Usuário não encontrado' });
			}

			const updatedUser = updatedUsers[0];
			fastify.log.info(`User profile updated: ${updatedUser.id}`);
			reply.send(updatedUser);
		} catch (error) {
			fastify.log.error(error, 'Error updating user profile');
			reply.status(500).send({ error: 'Erro interno ao atualizar perfil' });
		}
	});
}
