// src/features/auth/domain/validators/registerSchema.ts
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
