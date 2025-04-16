'use client';

import { submitLogin } from '@/lib/actions/auth/postLogin';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { LoginFormState } from '@/lib/actions/definitions';

import FormInput from '@/components/formInput/formInput';

const initialState = {
	errors: {},
	message: '',
} as LoginFormState;

export default function Login() {
	const router = useRouter();
	const { setIsAuthenticated } = useAuth();
	const [state, formAction, isPending] = useActionState(
		submitLogin,
		initialState,
	);

	useEffect(() => {
		if (state?.success) {
			setIsAuthenticated(true);
			router.push('/dashboard');
		}
	}, [state, router, setIsAuthenticated]);

	return (
		<div className="flex flex-col items-center mt-10">
			<h1 className="font-bold mb-5">Login</h1>
			<form className="flex flex-col items-center" action={formAction}>
				{state?.errors?._form && (
					<div className="text-red-500 mt-2 mb-4 text-center">
						{' '}
						{state.errors._form.map((error) => (
							<p key={error}>{error}</p>
						))}
					</div>
				)}
				<FormInput
					label="Email"
					name="email"
					type="email"
					placeholder="Digite seu e-mail"
					errors={state?.errors?.email}
					required
				/>

				<div className="mb-10 flex flex-col items-center">
					<label htmlFor="password">Senha</label>
					<input
						type="password"
						placeholder="Digite sua senha"
						name="password"
						id="password"
						aria-describedby="password"
						aria-invalid={state?.errors?.password ? 'true' : 'false'}
						aria-errormessage={state?.errors?.password ? 'password' : undefined}
						className="text-black bg-amber-50 w-80 p-2 rounded"
					/>
					{state?.errors?.password && (
						<div id="password" className="text-red-500 mt-1">
							{state.errors.password.map((error) => (
								<p key={error}>{error}</p>
							))}
						</div>
					)}
				</div>

				{state?.message && <p className="text-red-500">{state.message}</p>}
				<button
					type="submit"
					disabled={isPending}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
				>
					{isPending ? 'Enviando...' : 'Entrar'}
				</button>
			</form>
		</div>
	);
}
