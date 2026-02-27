"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";

export type AppContextType = {
  isLoggedIn: boolean;
  theme: "light" | "dark";
};

const initialState: AppContextType = {
  isLoggedIn: false,
  theme: "light",
};

const AppContext = createContext<AppContextType>(initialState);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [state, dispatch] = useReducer(appReducer, initialState);

  const functionContainer = {};

  useEffect(() => {}, []);

  return (
    <AppContext.Provider value={{ ...state, ...functionContainer }}>
      {children}
    </AppContext.Provider>
  );
};

interface AppAction {
  type: "SET_THEME";
  payload: typeof initialState;
}

export const appReducer = (
  state: AppContextType,
  action: AppAction
): AppContextType => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload.theme,
      };
    default:
      return state;
  }
};

export default AppContext;
