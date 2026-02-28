import React from "react";

interface SelectPlayerProps {
  onSelect: (player: "X" | "O") => void;
}

export default function SelectPlayer({ onSelect }: SelectPlayerProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12 bg-[var(--card)] rounded-md shadow-md">
      <h1 className="text-4xl font-bold">Select Player</h1>
      <div className="flex space-x-4 md:space-x-12">
        <button
          className="w-[120px] h-[120px] bg-[var(--background)] text-[var(--primary)] rounded-md shadow-md text-6xl font-bold flex items-center justify-center 
          hover:bg-[var(--accent)] hover:text-[var(--background)] duration-300 dark:shadow-white/20"
          onClick={() => onSelect("O")}
        >
          O
        </button>
        <button
          className="w-[120px] h-[120px] bg-[var(--background)] text-[var(--accent)] rounded-md shadow-md text-6xl font-bold flex items-center justify-center 
          hover:bg-[var(--primary)] hover:text-[var(--background)] duration-300 dark:shadow-white/20"
          onClick={() => onSelect("X")}
        >
          X
        </button>
      </div>
    </div>
  );
}
