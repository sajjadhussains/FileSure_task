import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    referredBy: z.string().optional(),
  }),
});

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const UserValidations = {
  userValidationSchema,
  userLoginValidationSchema,
};
