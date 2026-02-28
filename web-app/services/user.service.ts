import { IPagination } from "@/types";
import { IUser } from "@/types/user";
import httpRequest from "@/utils/httpRequest";

export interface UserResponse {
  data: IUser;
}

export interface UserGetResponse {
  data: IUser[];
  pagination: IPagination;
}

class UserService {
  /* -------------------------------------------------------------------------- */
  /*                                   Get All                                  */
  /* -------------------------------------------------------------------------- */
  async getAll(pagination?: {
    page: number;
    limit: number;
    orderBy?: string;
    direction?: "asc" | "desc";
    search?: string;
  }): Promise<UserGetResponse> {
    const endpoint = pagination
      ? `/users?page=${pagination.page}&limit=${pagination.limit}${
          pagination.orderBy ? `&orderBy=${pagination.orderBy}` : ""
        }${pagination.direction ? `&direction=${pagination.direction}` : ""}${
          pagination.search ? `&search=${pagination.search}` : ""
        }`
      : "/users";

    const res = await httpRequest({
      method: "get",
      endpoint: endpoint,
    });

    if (res.status === "error") {
      throw new Error(res.message);
    }

    return res.data;
  }
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
