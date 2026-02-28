import { IUser } from "@/types/user";
import httpRequest from "@/utils/httpRequest";

export interface UserResponse {
  data: IUser;
}

class UserService {
  /* -------------------------------------------------------------------------- */
  /*                                     ME                                     */
  /* -------------------------------------------------------------------------- */
  async me(): Promise<IUser> {
    const res = await httpRequest({
      method: "get",
      endpoint: "/users/me",
    });

    if (res.status === "error") {
      throw new Error(res.message);
    }

    return res.data;
  }
}

export const userService = new UserService();
