'use server';

import {
	LoginFormSchema,
	type LoginFormState,
} from '@/lib/actions/definitions';
import { cookies } from 'next/headers';

export async function submitLogin(
	prevState: LoginFormState | undefined,
	data: FormData,
): Promise<LoginFormState> {
	const validatedFields = LoginFormSchema.safeParse({
		email: data.get('email') as string,
		password: data.get('password') as string,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Erro de validação. Verifique os campos destacados.',
			success: false,
		};
	}

	try {
		const result = await fetch('http://localhost:3001/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(validatedFields.data),
		});

		if (!result.ok) {
			let errorMessage = 'E-mail ou senha inválidos.';
			try {
				const errorData = await result.json();
				if (errorData && typeof errorData.message === 'string') {
					errorMessage = errorData.message;
				} else if (errorData && typeof errorData.error === 'string') {
					errorMessage = errorData.error;
				}
			} catch (parseError) {
				console.error(
					'Falha ao parsear resposta de erro da API de login:',
					parseError,
				);
			}

			return {
				errors: { _form: [errorMessage] },
				message: errorMessage,
				success: false,
			};
		}

		const responseData = await result.json();

		const setCookieHeader = result.headers.get('set-cookie');
		if (setCookieHeader) {
			const [cookiePair] = setCookieHeader.split(';');
			const [name, value] = cookiePair.split('=');
			(await cookies()).set(name, value, {
				httpOnly: true,
				secure: false,
				path: '/',
				maxAge: 60 * 60 * 24 * 7,
				sameSite: 'lax',
			});
		}

		return {
			message: responseData.message,
			success: true,
			isAuthenticated: true,
			errors: {},
		};
	} catch (error) {
		console.error('Erro inesperado durante o login:', error);
		return {
			errors: {
				_form: [
					'Não foi possível conectar ao servidor. Verifique sua conexão ou tente mais tarde.',
				],
			},
			message: 'Erro de conexão.',
			success: false,
		};
	}
}
