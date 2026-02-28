"use client";
import Loading from "@/components/general/Loading";
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((state) => state.isHydrated);

  if (!isHydrated) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{`Welcome To OX Game`}</h1>
      <div className="flex flex-col gap-4 items-center bg-[var(--card)] p-8 rounded-md shadow-md w-full max-w-sm">
        {!user ? (
          <Link
            href="/auth/login"
            className="w-full text-center bg-[var(--primary)] hover:bg-[var(--primary-dark)] hover:scale-105 text-white shadow-md font-bold py-4 px-16 rounded duration-300"
          >
            Login
          </Link>
        ) : (
          <Link
            href="/game"
            className="w-full text-center bg-[var(--accent)] hover:bg-[var(--warning)] text-white shadow-md hover:scale-105 font-bold py-4 px-16 rounded duration-300"
          >
            Play
          </Link>
        )}
        <Link
          href="/how-to-play"
          className="w-full  text-center bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-white shadow-md hover:scale-105 font-bold py-4 px-16 rounded duration-300"
        >
          How to Play
        </Link>
      </div>
    </div>
  );
}
