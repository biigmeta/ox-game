import React from "react";
import TopBar from "./TopBar";
import Container from "./Container";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <>
      <header className="fixed top-0 left-0 w-full h-14 md:h-16 z-10">
        <TopBar />
      </header>
      <main className="h-screen overflow-y-auto pt-14 md:pt-16">
        <Container>{children}</Container>
      </main>
    </>
  );
}
