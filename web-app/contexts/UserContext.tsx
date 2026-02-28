"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";

import httpRequest from "@/utils/httpRequest";
import { IUser } from "@/types/user";
import { useUserStore } from "@/stores/useUserStore";
import { signIn, signOut, useSession } from "next-auth/react";
import { authService } from "@/services/auth.service";

export type UserContextType = {
  user: IUser | null;
};

const initialState: UserContextType = {
  user: null,
};

export const UserContext = createContext<UserContextType>(initialState);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setRefreshToken = useUserStore((state) => state.setRefreshToken);
  const isHydrated = useUserStore((state) => state.isHydrated);
  const [state, dispatch] = useReducer(userReducer, initialState);

  const continueSocial = async ({
    sub,
    email,
    name,
  }: {
    sub: string;
    email: string;
    name: string;
  }) => {
    const response = await authService.continueSocial("google", sub, {
      email,
      name,
    });

    if (!response) return;

    setUser(response.user);
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
  };

  const functionContainer = {};

  useEffect(() => {
    if (status === "loading" || user || !isHydrated) return;

    if (status === "authenticated" && session?.sub && session?.user) {
      continueSocial({
        sub: session.sub,
        email: session.user.email || "",
        name: session.user.name || "",
      });

      return;
    }
  }, [status, isHydrated, session]);

  
  return (
    <UserContext.Provider value={{ ...state, ...functionContainer }}>
      {children}
    </UserContext.Provider>
  );
};

type AppAction = {
  type: "SET_USER";
  payload: IUser | null;
};

export const userReducer = (
  state: UserContextType,
  action: AppAction
): UserContextType => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
