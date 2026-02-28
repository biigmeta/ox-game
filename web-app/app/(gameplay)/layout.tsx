"use client";
import Wrapper from "@/components/hoc/Wrapper";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Wrapper>{children}</Wrapper>
    </>
  );
}
