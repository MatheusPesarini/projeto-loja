/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import type { FastifyReply, FastifyRequest } from 'fastify';
import { createUserSchema, loginUserSchema, paramsSchema } from '../types/definition';
import { AuthService } from '../services/authService';
import argon2 from 'argon2';
import { createSession, verifySession } from '../middleware/session';
import { errorResponse, successResponse } from '../utils/responses';

export class AuthController {
  static async registerUser(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = createUserSchema.safeParse(request.body);

    if (!validatedData.success) {
      return reply.status(400).send({
        error: 'Dados inválidos',
        details: validatedData.error.flatten().fieldErrors,
      });
    }

    const { name, email, password } = validatedData.data;

    try {
      if (await AuthService.existingUser(email)) {
        return reply.status(409).send({ error: 'Email já cadastrado' });
      }

      const hashedPassword = await argon2.hash(password);

      const newUser = await AuthService.registerUser({
        email,
        name,
        password: hashedPassword,
      });

      reply.status(201).send(successResponse(newUser, 'Cadastro realizado com sucesso'));
    } catch (error) {
      request.log.error(error, 'Erro ao registrar usuário');
      reply.status(500).send(errorResponse('Erro interno ao registrar usuário'));
    }
  }

  static async loginUser(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = loginUserSchema.safeParse(request.body);

    if (!validatedData.success) {
      return reply.status(400).send({
        error: 'Dados inválidos',
        details: validatedData.error.flatten().fieldErrors,
      });
    }

    const { email, password } = validatedData.data;

    try {
      const foundUser = await AuthService.loginUser(email);

      if (!foundUser) {
        return reply.status(404).send({ error: 'Usuário não encontrado' });
      }

      const user = foundUser[0];

      const isPasswordValid = await argon2.verify(user.passwordHash, password);

      if (!isPasswordValid) {
        return reply.status(401).send({ error: 'Senha inválida' });
      }

      const sessionToken = await createSession(user.id);

      reply.setCookie('session', sessionToken, {
        path: '/',
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });

      const userResponse = {
        id: user.id,
      };

      request.log.info(`Login realizado com sucesso para o usuário: ${user.id}`);
      reply.send(successResponse(userResponse, 'Login realizado com sucesso'));
    } catch (error) {
      request.log.error(error, 'Erro durante o processo de login');

      if (error instanceof Error && error.message.includes('JWT_SECRET_KEY')) {
        return reply.status(500).send(errorResponse('Erro de configuração interna do servidor'));
      }

      reply.status(500).send(errorResponse('Erro interno ao fazer login'));
    }
  }

  static async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = paramsSchema.safeParse(request.params);

    if (!validatedData.success) {
      return reply.status(400).send({
        error: 'Dados inválidos',
        details: validatedData.error.flatten().fieldErrors,
      });
    }

    const { id } = validatedData.data;

    let userIdFromToken: string | null;

    try {
      const session = request.cookies.session;

      if (!session) {
        return reply.status(401).send({ error: 'Usuário não autenticado' });
      }

      userIdFromToken = await verifySession(session);

      if (!userIdFromToken) {
        return reply.status(401).send({ error: 'Sessão inválida ou expirada' });
      }
    } catch (error) {
      request.log.error(error, 'Erro ao verificar sessão');
      return reply.status(500).send(errorResponse('Erro interno ao verificar sessão'));
    }

    if (userIdFromToken !== id) {
      return reply.status(403).send({ error: 'Acesso negado' });
    }

    try {
      const deletedUser = await AuthService.deleteUser(id);

      if (!deletedUser) {
        return reply.status(404).send({ error: 'Usuário não encontrado' });
      }

      reply.send(successResponse(true, 'Usuário deletado com sucesso'));
    } catch (error) {
      request.log.error(error, 'Erro ao deletar usuário');
      reply.status(500).send(errorResponse('Erro interno ao deletar usuário'));
    }
  }
}
