import React from "react";
import TopBar from "./TopBar";
import Container from "./Container";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  return (
    <>
      <header className="fixed top-0 left-0 w-full h-14 md:h-16 z-10">
        <TopBar />
      </header>
      <main className="h-screen overflow-y-auto pt-14 md:pt-16">
        {children}
      </main>
    </>
  );
}
