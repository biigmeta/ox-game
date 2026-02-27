import httpRequest from "@/utils/httpRequest";

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
}

class AuthService {
  /* -------------------------------------------------------------------------- */
  /*                                  REGISTER                                  */
  /* -------------------------------------------------------------------------- */
  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<AuthResponse> {
    const res = await httpRequest({
      method: "post",
      endpoint: "/auth/register",
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    });

    if (res.status === "error") {
      throw new Error(res.message);
    }

    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  }

  /* -------------------------------------------------------------------------- */
  /*                                    LOGIN                                   */
  /* -------------------------------------------------------------------------- */
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await httpRequest({
      method: "post",
      endpoint: "/auth/login",
      data: {
        email,
        password,
      },
    });

    if (res.status === "error") {
      throw new Error(res.message);
    }

    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  }

  /* -------------------------------------------------------------------------- */
  /*                               CONTINUE SOCIAL                              */
  /* -------------------------------------------------------------------------- */
  async continueSocial(
    provider: string,
    accessToken: string
  ): Promise<AuthResponse> {
    const res = await httpRequest({
      method: "post",
      endpoint: `/auth/continue/${provider}`,
      data: {
        accessToken,
      },
    });

    if (res.status === "error") {
      throw new Error(res.message);
    }

    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  }

  /* -------------------------------------------------------------------------- */
  /*                                     ME                                     */
  /* -------------------------------------------------------------------------- */
  async me(): Promise<User> {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No token");
    }

    const res = await httpRequest({
      method: "get",
      endpoint: "/auth/me",
      header: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === "error") {
      throw new Error(res.message);
    }

    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   LOGOUT                                   */
  /* -------------------------------------------------------------------------- */
  logout() {
    localStorage.removeItem("accessToken");
  }

  /* -------------------------------------------------------------------------- */
  /*                                   HELPER                                   */
  /* -------------------------------------------------------------------------- */
  getToken() {
    return localStorage.getItem("accessToken");
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
