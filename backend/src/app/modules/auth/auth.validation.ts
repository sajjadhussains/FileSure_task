import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string(),
    referralWord: z.string().optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const AuthValidation = {
  userValidationSchema,
  loginValidationSchema,
};
