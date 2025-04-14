import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema para validar o corpo da requisição vindo do frontend
const loginSchema = z.object({
	email: z.string().email({ message: 'Email inválido' }),
	password: z.string().min(1, { message: 'Senha não pode estar vazia' }),
});

// URL do seu backend Fastify (IMPORTANTE: Use variável de ambiente em produção!)
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
	let requestBody: unknown;
	try {
		// 1. Parse do corpo da requisição
		requestBody = await request.json();
	} catch (error) {
		console.error('[API Login Route] Erro ao parsear JSON:', error);
		return NextResponse.json(
			{ error: 'Corpo da requisição inválido (JSON esperado)' },
			{ status: 400 },
		);
	}

	// 2. Validar os dados recebidos do frontend
	const validation = loginSchema.safeParse(requestBody);
	if (!validation.success) {
		console.warn(
			'[API Login Route] Falha na validação:',
			validation.error.flatten(),
		);
		return NextResponse.json(
			{
				error: 'Dados inválidos',
				details: validation.error.flatten().fieldErrors,
			},
			{ status: 400 },
		);
	}
	const { email, password } = validation.data;
	console.log(`[API Login Route] Tentativa de login para: ${email}`);

	try {
		// 3. Fazer a chamada fetch para o backend Fastify
		console.log(`[API Login Route] Chamando backend: ${BACKEND_API_URL}/login`);
		const apiResponse = await fetch(`${BACKEND_API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		// 4. Extrair dados e cabeçalho Set-Cookie da resposta do backend
		// É importante ler o corpo ANTES de verificar apiResponse.ok se o backend envia detalhes no erro
		const responseData = await apiResponse.json();
		const setCookieHeader = apiResponse.headers.get('set-cookie');

		console.log(
			`[API Login Route] Resposta do backend status: ${apiResponse.status}`,
		);
		if (setCookieHeader) {
			console.log(
				'[API Login Route] Backend enviou Set-Cookie:',
				setCookieHeader,
			);
		} else {
			console.warn('[API Login Route] Backend NÃO enviou Set-Cookie.');
		}

		// 5. Verificar se a resposta do backend foi OK
		if (!apiResponse.ok) {
			console.error(
				`[API Login Route] Erro da API de backend (${apiResponse.status}):`,
				responseData,
			);
			// Repassa o erro do backend para o frontend
			return NextResponse.json(responseData, { status: apiResponse.status });
		}

		// 6. Criar a resposta final do Next.js para o frontend
		console.log(
			'[API Login Route] Login no backend bem-sucedido. Preparando resposta para o cliente.',
		);
		const response = NextResponse.json(responseData, { status: 200 });

		// 7. Copiar o cabeçalho Set-Cookie (se existir) para a resposta final
		if (setCookieHeader) {
			// Usar 'set' é geralmente suficiente para um único cookie de sessão.
			response.headers.set('Set-Cookie', setCookieHeader);
			console.log('[API Login Route] Repassando Set-Cookie para o cliente.');
		}

		// 8. Retornar a resposta para o frontend
		return response;
	} catch (error) {
		console.error(
			'[API Login Route] Erro ao chamar API de backend ou processar resposta:',
			error,
		);
		// Evite expor detalhes do erro interno para o cliente em produção
		return NextResponse.json(
			{ error: 'Erro interno ao processar login' },
			{ status: 500 },
		);
	}
}
