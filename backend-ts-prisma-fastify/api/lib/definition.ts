import z from "zod";

export const paramsSchema = z.object({
  id: z.string().uuid({ message: 'ID de usuário inválido' }),
})

export const loginUserSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'Senha não pode estar vazia' }),
});

export const createUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Nome não pode ser vazio').optional(),
  email: z.string().email('Email inválido').optional(),
  password: z
    .string()
    .min(6, 'Nova senha deve ter no mínimo 6 caracteres')
    .optional(),
});

export const searchQuerySchema = z.object({
  name: z.string().min(1, { message: 'Termo de busca não pode ser vazio' }),
});