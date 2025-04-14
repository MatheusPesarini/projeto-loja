'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function submitLogout() {
	try {
		const response = await fetch('http://localhost:3001/logout', {
			method: 'POST',
			credentials: 'include',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			console.error('Erro ao fazer logout no backend:', response.statusText);
			return { success: false, error: 'Falha ao deslogar no servidor.' };
		}

		console.log('Logout no backend realizado com sucesso');
	} catch (error) {
		console.error('Erro ao fazer logout', error);
		throw error;
	}

	revalidatePath('/', 'layout'); 
	redirect('/login');
}
