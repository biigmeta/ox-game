'use client';
import Link from "next/link";
import Authentication from "./Authentication";
import { FaMicrosoft } from "react-icons/fa6";
import { useUserStore } from "@/stores/useUserStore";
export default function TopBar() {
  const user = useUserStore((state) => state.user);
  return (
    <nav className="w-full h-full shadow-md bg-[var(--card)] flex p-4 items-center justify-between">
      <Link href="/" className="text-xl font-bold flex items-center gap-2">
        <FaMicrosoft className="text-[var(--primary)]" />{" "}
        <span className="hidden md:block">Tic Tac Toe</span>
      </Link>

      <div className="flex flex-row items-center gap-8">
        {user && user.role === "admin" && (
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Dashboard
          </Link>
        )}
        <Authentication />
      </div>
    </nav>
  );
}
