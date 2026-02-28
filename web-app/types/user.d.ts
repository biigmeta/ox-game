import { IAuthentication } from "./auth";
import { IHistory } from "./history";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
  histories: IHistory[];
  authentications: IAuthentication[];
}
