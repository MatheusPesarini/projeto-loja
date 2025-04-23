'use server';

import { ProductSchema, SearchProductState } from '../definitions';
import { z } from 'zod';

const SearchQuerySchema = z.string().min(1, 'O termo de busca não pode estar vazio.');

export async function searchProduct(prevState: SearchProductState | undefined, data: FormData,): Promise<SearchProductState> {
  const query = data.get('query');

  const validatedQuery = SearchQuerySchema.safeParse(query);

  if (!validatedQuery.success) {
    return {
      message: 'Termo de busca inválido.',
      errors: { query: validatedQuery.error.flatten().formErrors },
    };
  }

  const searchTerm = validatedQuery.data;
  const encodedSearchTerm = encodeURIComponent(searchTerm);

  const apiUrl = `http://localhost:3001/products/search/${encodedSearchTerm}`;
  console.log(`[searchProduct] Fetching URL: ${apiUrl}`);

  try {
    const result = await fetch(apiUrl, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!result.ok) {
      let errorMessage = 'Falha ao buscar produtos.';
      try {
        const errorData = await result.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
      }
      console.error(`[searchProduct] API Error (${result.status}): ${errorMessage}`);
      return {
        message: errorMessage,
        errors: { _form: [errorMessage] },
      };
    }

    const responseData = await result.json();
    const validatedProducts = z.array(ProductSchema).safeParse(responseData);

    if (!validatedProducts.success) {
      console.error('[searchProduct] Validation Error:', validatedProducts.error.flatten());
      return {
        message: 'Falha ao validar dados dos produtos recebidos.',
        errors: { _form: ['Formato de dados inválido recebido do servidor.'] },
      };
    }

    console.log(`[searchProduct] Found ${validatedProducts.data} products.`);
    return {
      message: 'Produtos buscados com sucesso',
      data: validatedProducts.data,
      errors: {},
    };

  } catch (error) {
    console.error('[searchProduct] Fetch failed:', error);
    return {
      message: 'Erro de rede ao tentar buscar produtos.',
      errors: { _form: ['Não foi possível conectar ao servidor.'] },
    };
  }
}
