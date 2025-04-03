'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleSubmit() {
	try {
		const response = await fetch('http://localhost:3001/logout', {
			method: 'POST',
			credentials: 'include',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ action: 'logout' }),
		});

		if (!response.ok) {
			throw new Error('Erro ao fazer logout');
		}

		// 2. Limpar o cookie no frontend também
		(
			await // 2. Limpar o cookie no frontend também
			cookies()
		).delete('session');

		// 3. Registrar sucesso
		console.log('Logout realizado com sucesso');

		// 4. Redirecionar para a página de login
		redirect('/login');
	} catch (error) {
		console.error('Erro ao fazer logout', error);
		throw error;
	}
}
