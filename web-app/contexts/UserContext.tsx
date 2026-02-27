"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";

import httpRequest from "@/utils/httpRequest";
import { IUser } from "@/types/user";
import { useUserStore } from "@/stores/useUserStore";
import { signIn, signOut, useSession } from "next-auth/react";

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
  // const user = useUserStore((state) => state.user);
  // const isHydrated = useUserStore((state) => state.isHydrated);
  const [state, dispatch] = useReducer(userReducer, initialState);

  const functionContainer = {};

  useEffect(() => {
    if (status === "loading") return;

    console.log("UserContext useEffect triggered with status:", status);
    console.log("UserContext useEffect triggered with session:", session);
  }, [pathName, router, status]);

  // useEffect(() => {
  //   if (!isHydrated || status === "loading") return;

  //   console.log("UserContext useEffect triggered with status:", status);
  //   console.log("UserContext useEffect triggered with session:", session);
  //   console.log("UserContext useEffect triggered with user:", user);

  //   // if (!user && pathName !== "/auth/login") {
  //   //   router.replace("/auth/login");
  //   // }
  // }, [isHydrated, user, pathName, router, status]);

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
