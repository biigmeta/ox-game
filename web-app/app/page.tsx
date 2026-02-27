"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{`Welcome To OX Game`}</h1>
      <div className="flex flex-col gap-4 items-center">
        <Link
          href="/auth/login"
          className="bg-[var(--primary)] hover:bg-[var(--primary-hover)]  font-bold py-2 px-4 rounded"
        >
          Login to Play
        </Link>
        <Link
          href="/game"
          className="bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]  font-bold py-2 px-4 rounded"
        >
          Play as Guest
        </Link>
      </div>
    </div>
  );
}
