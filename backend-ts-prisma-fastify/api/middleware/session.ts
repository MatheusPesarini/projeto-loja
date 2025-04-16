import { jwtVerify, SignJWT } from 'jose';

export async function verifySession(token: string): Promise<string | null> {
	const secret = process.env.JWT_SECRET_KEY;
	if (!secret) {
		console.error('JWT_SECRET_KEY não está definida para verificação.');
		return null;
	}
	const encodedKey = new TextEncoder().encode(secret);

	try {
		const { payload } = await jwtVerify(token, encodedKey, {
			algorithms: ['HS256'],
		});
		return payload.userId as string;
	} catch (error) {
		console.error('Erro ao verificar o token:', error);
		return null;
	}
}
