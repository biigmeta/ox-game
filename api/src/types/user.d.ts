export interface IUser {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  role: $Enums.UserRole;
  createdAt: Date;
  updatedAt: Date;
}
