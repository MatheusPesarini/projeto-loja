'use client';

import { submitLogin } from '@/lib/actions/auth/postLogin';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { LoginFormState } from '@/lib/actions/definitions';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const initialState: LoginFormState = {
	errors: {},
	message: '',
	success: false,
};

export default function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
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

	const emailErrors = state?.errors?.email;
	const passwordErrors = state?.errors?.password;
	const formErrors = state?.errors?._form;

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className="shadow-md">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Digite seu e-mail e senha para entrar na sua conta.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={formAction} className="space-y-4">
						{' '}
						<div className="grid gap-2">
							<Label htmlFor="email">E-mail</Label>
							<Input
								type="email"
								id="email"
								name="email"
								placeholder="m@example.com"
								required
								aria-describedby="email-error"
								className={cn(
									'text-black bg-amber-50 w-full p-2 rounded border',
									emailErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id="email-error" aria-live="polite" aria-atomic="true">
								{emailErrors &&
									emailErrors.map((error: string) => (
										<p className="mt-1 text-sm text-red-500" key={error}>
											{error}
										</p>
									))}
							</div>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Senha</Label>
								<a
									href="404"
									className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								>
									Esqueceu a senha?
								</a>
							</div>
							<Input
								id="password"
								name="password"
								type="password"
								required
								aria-describedby="password-error"
								className={cn(
									'text-black bg-amber-50 w-full p-2 rounded border',
									passwordErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id="password-error" aria-live="polite" aria-atomic="true">
								{passwordErrors &&
									passwordErrors.map((error: string) => (
										<p className="mt-1 text-sm text-red-500" key={error}>
											{error}
										</p>
									))}
							</div>
						</div>
						{formErrors && (
							<div
								className="mt-2 text-sm text-red-500 text-center"
								aria-live="polite"
							>
								{formErrors.map((error: string) => (
									<p key={error}>{error}</p>
								))}
							</div>
						)}
						{state?.message && !state.success && (
							<div
								className="mt-2 text-sm text-red-500 text-center"
								aria-live="polite"
							>
								{/* {state.message} */}
							</div>
						)}
						<Button
							type="submit"
							disabled={isPending}
							className="w-full cursor-pointer shadow-md"
						>
							{isPending ? 'Enviando...' : 'Entrar'}
						</Button>
						<div className="mt-4 text-center text-sm">
							Não tem uma conta?{' '}
							<a
								onClick={() => router.push('/register')}
								className="underline underline-offset-4 cursor-pointer"
							>
								Registrar-se
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
