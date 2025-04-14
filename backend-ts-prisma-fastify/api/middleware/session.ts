import { jwtVerify, SignJWT } from 'jose';

type SessionPayload = {
	userId: string;
	expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
	const secret = process.env.JWT_SECRET_KEY;
	if (!secret) {
		throw new Error(
			'JWT_SECRET_KEY não está definida nas variáveis de ambiente',
		);
	}
	const encodedKey = new TextEncoder().encode(secret);

	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(encodedKey);
}

export async function createSession(userId: string): Promise<string> {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const session = await encrypt({ userId, expiresAt });
	console.log('Token gerado:', session);
	return session;
}

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
