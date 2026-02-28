export interface IUser{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "user" | "admin";
    createdAt: string;
}