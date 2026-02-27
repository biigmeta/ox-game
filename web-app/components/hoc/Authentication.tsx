"use client";
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";

export default function Authentication() {
  const user = useUserStore((state) => state.user);
  return (
    <div>
      {user ? (
        <div>Authenticated as {user.firstName}</div>
      ) : (
        <div className="flex flex-row gap-4">
          <Link
            href="/auth/login"
            className="bg-[var(--primary)] text-white px-4 py-1 rounded-md hover:bg-[var(--primary-dark)] hover:scale-105 transition-transform duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
