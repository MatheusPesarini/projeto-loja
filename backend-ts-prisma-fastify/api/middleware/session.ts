import { jwtVerify, SignJWT } from 'jose';

const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

type SessionPayload = {
	userId: string;
	expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(encodedKey);
}

export async function createUserSession(userId: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const session = await encrypt({ userId, expiresAt });
	console.log('Token gerado:', session);
	return session;
}

export async function verifyUserSession(token: string) {
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
