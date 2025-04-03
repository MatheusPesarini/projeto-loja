"use client";

import { submitAction } from "@/app/actions/auth/register";
import type { RegisterFormState } from "@/app/actions/definitions";
import { useActionState } from "react";

const initialState = {
	errors: {},
	message: "",
} as RegisterFormState;

export default function Register() {
	const [state, formAction, isPending] = useActionState(
		submitAction,
		initialState,
	);

	return (
		<div className="flex flex-col items-center mt-10">
			<h1 className="font-bold mb-5">Cadastro</h1>
			<form className="flex flex-col items-center" action={formAction}>
				<div className="mb-10 flex flex-col items-center">
					<h1>Nome</h1>
					<input
						type="text"
						placeholder="Digite seu nome"
						name="name"
						className="text-black bg-amber-50 w-80 p-2 rounded"
					/>
					{state?.errors?.name && (
						<div className="text-red-500 mt-1">
							{state.errors.name.map((error) => (
								<p key={error}>{error}</p>
							))}
						</div>
					)}
				</div>
				<div className="mb-10 flex flex-col items-center">
					<h1>Email</h1>
					<input
						type="email"
						placeholder="Digite seu e-mail"
						name="email"
						className="text-black bg-amber-50 w-80 p-2 rounded"
					/>
					{state?.errors?.email && (
						<div className="text-red-500 mt-1">
							{state.errors.email.map((error) => (
								<p key={error}>{error}</p>
							))}
						</div>
					)}
				</div>
				<div className="mb-10 flex flex-col items-center">
					<h1>Senha</h1>
					<input
						type="password"
						placeholder="Digite sua senha"
						name="password"
						className="text-black bg-amber-50 w-80 p-2 rounded"
					/>
					{state?.errors?.password && (
						<div className="text-red-500 mt-1">
							{state.errors.password.map((error) => (
								<p key={error}>{error}</p>
							))}
						</div>
					)}
				</div>
				{state?.message && <p className="text-red-500 mb-4">{state.message}</p>}{" "}
				<button
					type="submit"
					disabled={isPending}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isPending ? "Enviando..." : "Cadastrar"}
				</button>
			</form>
		</div>
	);
}
