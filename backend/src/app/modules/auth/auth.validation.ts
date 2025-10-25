import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['user', 'admin']),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    password: z.string(),
  }),
});

export const AuthValidation = {
  userValidationSchema,
  loginValidationSchema,
};
