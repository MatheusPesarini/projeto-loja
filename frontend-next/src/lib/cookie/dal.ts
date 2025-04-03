import { cookies } from 'next/headers';
import { decrypt } from './session';

// Função para verificar se está autenticado (para middleware)
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

// Função para verificação de sessão
export async function verifySession() {
	const cookie = (await cookies()).get('session')?.value;

	// Se não houver cookie, retorne imediatamente
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
			userRole: session.userRole || 'user',
		};
	} catch (error) {
		console.error('Erro ao verificar sessão:', error);
		return { isAuth: false };
	}
}

// Função separada para obter apenas o papel do usuário
export async function getUserRole() {
	const cookie = (await cookies()).get('session')?.value;

	if (!cookie) {
		return 'user'; // Papel padrão
	}

	try {
		const session = await decrypt(cookie);
		return session?.userRole || 'user';
	} catch (error) {
		console.error('Erro ao obter papel do usuário:', error);
		return 'user';
	}
}
