'use client';
import { AppProvider } from "@/contexts/AppContext";
import { UserProvider } from "@/contexts/UserContext";
import React from "react";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <>
      <AppProvider>
        <SessionProvider>
          <UserProvider>{children}</UserProvider>
        </SessionProvider>
      </AppProvider>
    </>
  );
}
