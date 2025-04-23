'use server';

import { ProductSchema } from '../definitions';
import { z } from 'zod';

const ProductArraySchema = z.array(ProductSchema);

export async function getProduct() {
	const result = await fetch('http://localhost:3001/products', {
		method: 'GET',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!result.ok) {
		return {
			message: 'Falha ao buscar produtos',
			errors: {},
		};
	}

	const responseData = await result.json();
	const validatedFields = ProductArraySchema.safeParse(responseData);

	if (!validatedFields.success) {
		return {
			message: 'Falha ao validar produtos',
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	return {
		message: 'Produtos buscados com sucesso',
		data: validatedFields.data,
	};
}
