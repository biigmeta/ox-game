import type { Role } from "@prisma/client";
export interface IHeaderUser {
  id: string;
  email: string;
  role: Role;
}