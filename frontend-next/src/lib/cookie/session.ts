import { jwtVerify } from 'jose';
import type { SessionPayload } from '@/lib/actions/definitions';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = 'process.env.JWT_SECRET_KEY' as string;
const encodedKey = new TextEncoder().encode(secretKey);

// Cache manual para a função decrypt
const tokenCache = new Map<string, SessionPayload | null>();

export async function decrypt(session: string | undefined = '') {
	// Se o token for undefined ou vazio, retorne null
	if (!session) {
		return null;
	}

	// Verificar se o token já está no cache
	if (tokenCache.has(session)) {
		return tokenCache.get(session);
	}

	console.log('JWT decodificado - chamada real');

	try {
		// Verificar a assinatura e decodificar
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		});

		// Verificar se o token expirou
		const now = Math.floor(Date.now() / 1000);
		if (payload.exp && payload.exp < now) {
			// Token expirado, tentar fazer logout silenciosamente
			try {
				fetch('http://localhost:3001/logout', {
					method: 'POST',
					credentials: 'include',
					cache: 'no-cache',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ action: 'logout' }),
				}).catch(() => {});
			} catch (e) {
				// Ignorar erros de fetch
			}

			// Armazenar no cache
			tokenCache.set(session, null);
			return null;
		}

		const result = payload as SessionPayload;

		// Armazenar no cache
		tokenCache.set(session, result);
		return result;
	} catch (error) {
		// Armazenar no cache
		tokenCache.set(session, null);
		return null;
	}
}
