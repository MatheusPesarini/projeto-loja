'use server';

import {
	LoginFormSchema,
	type LoginFormState,
} from '@/lib/actions/definitions';
import { cookies } from 'next/headers';

export async function submitAction(prevState: LoginFormState, data: FormData) {
	const validatedFields = LoginFormSchema.safeParse({
		email: data.get('email') as string,
		password: data.get('password') as string,
	});

	if (!validatedFields.success) {
		return {
			message: 'Falha ao validar dados registro',
			errors: validatedFields.error.flatten().fieldErrors,
			success: false,
		};
	}

	const result = await fetch('http://localhost:3001/login', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(validatedFields.data),
	});

	if (!result.ok) {
		return {
			message: 'Falha ao fazer registro',
			errors: {},
			success: false,
		};
	}

	const responseData = await result.json();

	if (responseData.token) {
		(await cookies()).set('session', responseData.token, {
			httpOnly: true,
			secure: false,
			path: '/',
			maxAge: 604800, // 7 dias em segundos
			sameSite: 'lax',
		});
	}

	return {
		success: true,
	};
}
