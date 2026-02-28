"use client";
import { IUser } from "@/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  isHydrated: boolean;
  setHydrated: (value: boolean) => void;
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setUser: (user: IUser | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isHydrated: false,
      setHydrated: (value: boolean) => set({ isHydrated: value }),
      user: null,
      accessToken: null,
      refreshToken: null,
      setAccessToken: (accessToken: string | null) => set({ accessToken }),
      setRefreshToken: (refreshToken: string | null) => set({ refreshToken }),
      setUser: (user: IUser | null) => set({ user }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        console.log("Rehydrating user store...", state);
        state?.setHydrated(true);
      },
    }
  )
);
