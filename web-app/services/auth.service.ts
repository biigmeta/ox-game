import { AuthProvider } from "@/types/next-auth";
import { IUser } from "@/types/user";
import httpRequest from "@/utils/httpRequest";

export interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  /* -------------------------------------------------------------------------- */
  /*                                  REGISTER                                  */
  /* -------------------------------------------------------------------------- */
  async register(
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
  ): Promise<AuthResponse> {
    const res = await httpRequest({
      method: "post",
      endpoint: "/auth/register",
      data: {
        email,
        password,
        confirmPassword,
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
    try {
      const res = await httpRequest({
        method: "post",
        endpoint: "/auth/login",
        data: {
          email,
          password,
        },
      });

      if (res.status === "error") {
        if (
          res.error?.response?.status === 401 ||
          res.error?.response?.status === 400
        ) {
          throw new Error("Invalid email or password");
        }
        if (res.error?.response?.status === 404) {
          throw new Error("User not found");
        }

        if (res.error?.response?.status === 500) {
          throw new Error(res.error.response.data?.message || "Login failed");
        }

        throw new Error(res.message);
      }

      localStorage.setItem("accessToken", res.data.accessToken);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                               CONTINUE SOCIAL                              */
  /* -------------------------------------------------------------------------- */
  async continueSocial(
    provider: AuthProvider,
    sub: string,
    user: { email?: string; name?: string; image?: string }
  ): Promise<AuthResponse> {
    const res = await httpRequest({
      method: "post",
      endpoint: `/auth/social-login/${provider}`,
      data: {
        sub,
        email: user.email,
        firstName: user.name,
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
  async me(): Promise<IUser> {
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
