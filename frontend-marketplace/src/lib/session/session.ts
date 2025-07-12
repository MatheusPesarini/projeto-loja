import { jwtVerify } from 'jose';
import type { SessionPayload } from '@/lib/types/definitions';
import { submitLogout } from '../actions/auth/post-logout';

const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) {
	throw new Error('JWT_SECRET_KEY não está definida nas variáveis de ambiente');
}
const encodedKey = new TextEncoder().encode(secretKey);

export async function verifySession(
	session: string | undefined,
): Promise<SessionPayload | null> {
	if (!session) {
		console.log('Nenhum token de sessão fornecido.');
		return null;
	}

	try {
		console.log('Tentando verificar o JWT...');
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		});
		console.log('JWT verificado com sucesso.');
		return payload as SessionPayload;
	} catch (error: unknown) {
		console.warn('Token JWT expirado.');
		submitLogout();
		return null;
	}
}
