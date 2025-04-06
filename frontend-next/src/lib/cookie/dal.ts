import { cookies } from 'next/headers';
import { decrypt } from './session';

export async function isAuthenticated() {
	try {
		const cookie = (await cookies()).get('session')?.value;

		if (!cookie) {
			return false;
		}

		const session = await decrypt(cookie);
		return !!session?.userId;
	} catch (error) {
		console.error('Erro ao verificar autenticação:', error);
		return false;
	}
}

export async function verifySession() {
	const cookie = (await cookies()).get('session')?.value;

	if (!cookie) {
		return { isAuth: false };
	}

	try {
		const session = await decrypt(cookie);

		if (!session?.userId) {
			return { isAuth: false };
		}

		return {
			isAuth: true,
			userId: session.userId,
		};
	} catch (error) {
		console.error('Erro ao verificar sessão:', error);
		return { isAuth: false };
	}
}

