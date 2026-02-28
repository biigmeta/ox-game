"use client";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  

  return (
    <>
      <div className="h-full w-full">{children}</div>
    </>
  );
}
