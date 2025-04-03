import { z } from "zod";

export const LoginFormSchema = z.object({
	email: z
		.string()
		.email({ message: "Por favor digite um e-mail válido." })
		.trim(),
	password: z
		.string()
		.min(1, { message: "Precisa ter 1 caractér no minímo" })
		// .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
		// .regex(/[0-9]/, { message: 'Contain at least one number.' })
		// .regex(/[^a-zA-Z0-9]/, {
		//   message: 'Contain at least one special character.',
		// })
		.trim(),
});

export const RegisterFormSchema = z.object({
	name: z.string().min(1, { message: "Precisa ter 1 caractér no minímo" }),
	email: z
		.string()
		.email({ message: "Por favor digite um e-mail válido." })
		.trim(),
	password: z
		.string()
		.min(1, { message: "Precisa ter 1 caractér no minímo" })
		// .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
		// .regex(/[0-9]/, { message: 'Contain at least one number.' })
		// .regex(/[^a-zA-Z0-9]/, {
		//   message: 'Contain at least one special character.',
		// })
		.trim(),
});

export type LoginFormState =
	| {
			errors?: {
				email?: string[];
				password?: string[];
			};
			message?: string;
			success?: boolean;
	  }
	| undefined;

export type RegisterFormState =
	| {
			errors?: {
				name?: string[];
				email?: string[];
				password?: string[];
			};
			message?: string;
	  }
	| undefined;

export type SessionPayload = {
	userId: string;
	expiresAt: Date;
	userRole: string;
};
