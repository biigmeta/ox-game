import { AuthProvider } from "./next-auth";

export interface IAuthentication {
  id: string;
  userId: string;
  provider: AuthProvider | "email";
  subject: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
