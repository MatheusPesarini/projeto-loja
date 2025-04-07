'use server';

import {
	RegisterFormSchema,
	type RegisterFormState,
} from '@/lib/actions/definitions';
import { redirect } from 'next/navigation';

export async function submitAction(
	prevState: RegisterFormState,
	data: FormData,
) {
	const validatedFields = RegisterFormSchema.safeParse({
		name: data.get('name') as string,
		email: data.get('email') as string,
		password: data.get('password') as string,
	});

	if (!validatedFields.success) {
		return {
			message: 'Falha ao validar dados registro',
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const result = await fetch('http://localhost:3001/register', {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(validatedFields.data),
	});

	if (!result.ok) {
		return {
			message: 'Falha ao fazer registro',
			errors: {},
		};
	}

	redirect('/login');
}
