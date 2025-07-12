import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const loginAttempts: Record<string, { attempts: number; lastAttempt: number }> =
	{};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const MAX_ATTEMPTS = 5;

export default function rateLimit(fastify: FastifyInstance) {
	fastify.addHook(
		'preHandler',
		async (request: FastifyRequest, reply: FastifyReply) => {
			const ip = request.ip;
			const now = Date.now();

			if (!loginAttempts[ip]) {
				loginAttempts[ip] = { attempts: 0, lastAttempt: now };
			}

			const { attempts, lastAttempt } = loginAttempts[ip];

			if (now - lastAttempt > RATE_LIMIT_WINDOW_MS) {
				loginAttempts[ip] = { attempts: 0, lastAttempt: now };
			}

			if (attempts >= MAX_ATTEMPTS) {
				reply.status(429).send({
					error: 'Muitas tentativas de login. Tente novamente mais tarde.',
				});
				return;
			}

			loginAttempts[ip].attempts += 1;
			loginAttempts[ip].lastAttempt = now;
		},
	);
}
