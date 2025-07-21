'use client';

import { submitRegister } from '@/lib/actions/auth/post-register';
import type { RegisterFormState } from '@/lib/types/definitions';
import type React from 'react';
import { useActionState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { cn } from '@/lib/types/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Link from 'next/link';

const initialState: RegisterFormState = {
	errors: {},
	message: '',
	success: false,
};

export default function RegisterForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const [state, formAction, isPending] = useActionState(
		submitRegister,
		initialState,
	);

	const nameErrors = state?.errors?.name;
	const emailErrors = state?.errors?.email;
	const passwordErrors = state?.errors?.password;
	const formErrors = state?.errors?._form;

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className="shadow-md">
				<CardHeader>
					<CardTitle className="text-2xl">Cadastro</CardTitle>
					<CardDescription>
						Digite seu dados para cadastro da sua conta.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={formAction} className="space-y-4">
						{' '}
						<div className="grid gap-2">
							<Label htmlFor="name">Nome</Label>
							<Input
								type="name"
								id="name"
								name="name"
								required
								aria-describedby="name-error"
								className={cn(
									'text-black bg-amber-50 w-full p-2 rounded border',
									nameErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id="name-error" aria-live="polite" aria-atomic="true">
								{nameErrors &&
									nameErrors.map((error: string) => (
										<p className="mt-1 text-sm text-red-500" key={error}>
											{error}
										</p>
									))}
							</div>
						</div>
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
							<Label htmlFor="password">Senha</Label>
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
								{state.message}
							</div>
						)}
						<Button
							variant="outline"
							type="submit"
							disabled={isPending}
							className="w-full cursor-pointer shadow-md"
						>
							{isPending ? 'Enviando...' : 'Cadastrar'}
						</Button>
						<div className="mt-4 text-center text-sm">
							Já tem uma conta?{' '}
							<Link
								href={'/login'}
								className="underline underline-offset-4 cursor-pointer"
							>
								Logar-se
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
