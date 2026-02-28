'use client';
import { useUserStore } from "@/stores/useUserStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if ((session && status === "authenticated") || user) {
      router.replace("/");
    }
  }, [session, status, router, user]);

  return <>{children}</>;
}
