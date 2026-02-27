import { z } from "zod";

export const authRegisterSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  acceptTermsAndConditions: z.boolean(),
  acceptPrivacyPolicy: z.boolean(),
});

export const authLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const authSocialLoginSchema = z.object({
  provider: z.enum(["google"]),
  token: z.string(),
  email: z.email(),
});
