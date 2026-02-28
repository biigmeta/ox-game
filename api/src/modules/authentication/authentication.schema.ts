import { z } from "zod";

export const authRegisterSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1).optional().nullable(),
});

export const authLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const authSocialLoginSchema = z.object({
  sub: z.string(),
  email: z.email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1).optional().nullable(),
});
