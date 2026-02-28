import { AuthProvider } from "@prisma/client";

export type AuthProviderType = AuthProvider;

export interface IAuthRegister {
  provider: AuthProviderType;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName?: string | null;
}
