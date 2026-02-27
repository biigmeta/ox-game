import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="h-full max-w-full md:max-w-[64%] mx-auto bg-[var(--secondary-light)] p-8 shadow-md">
      {children}
    </div>
  );
}
