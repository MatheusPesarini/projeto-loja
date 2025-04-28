'use server';

import {
	RegisterFormSchema,
	type RegisterFormState,
} from '@/lib/actions/definitions';
import { redirect } from 'next/navigation';

export async function submitRegister(
	prevState: RegisterFormState | undefined,
	data: FormData,
): Promise<RegisterFormState> {
	const validatedFields = RegisterFormSchema.safeParse({
		name: data.get('name') as string,
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
		const result = await fetch('http://localhost:3001/register', {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(validatedFields.data),
		});

		if (!result.ok) {
			let errorMessage = 'Não foi possível completar o registro.';
			try {
				const errorData = await result.json();
				if (errorData && typeof errorData.message === 'string') {
					errorMessage = errorData.message;
				} else if (errorData && typeof errorData.error === 'string') {
					errorMessage = errorData.error;
				}
			} catch (error) {
				console.error(
					'Falha ao parsear resposta de erro da API de registro:',
					error,
				);
			}

			if (
				errorMessage.toLowerCase().includes('e-mail') ||
				errorMessage.toLowerCase().includes('email')
			) {
				return {
					errors: { email: [errorMessage], _form: [errorMessage] },
					message: errorMessage,
					success: false,
				};
			}
			return {
				errors: { _form: [errorMessage] },
				message: errorMessage,
				success: false,
			};
		}
	} catch (error) {
		console.error('Erro inesperado durante o registro:', error);
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

	redirect('/login?registered=true');
}
