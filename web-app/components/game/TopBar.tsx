import { useRouter } from "next/navigation";
import React from "react";

interface TopBarProps {
  resetPlayer: () => void;
}

export default function TopBar({ resetPlayer }: TopBarProps) {
  
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full flex flex-row items-start justify-between p-4 bg-[var(--primary)] rounded-t-md shadow-md">
      <button
        className="bg-[var(--primary-dark)] text-white px-4 py-1 rounded-md hover:bg-[var(--primary-background)] hover:scale-105 transition-transform duration-300"
        onClick={handleBack}
      >
        Back
      </button>
      <button
        className="bg-[var(--primary-dark)] text-white px-4 py-1 rounded-md hover:bg-[var(--primary-background)] hover:scale-105 transition-transform duration-300"
        onClick={resetPlayer}
      >
        Change Player
      </button>
    </div>
  );
}
