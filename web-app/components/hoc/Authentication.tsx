"use client";
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";
import LogOutButton from "../general/LogOutButton";
import { FaCircleUser } from "react-icons/fa6";

export default function Authentication() {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      {user ? (
        <div className="flex flex-row items-center gap-2">
          <FaCircleUser size={18}  />
          <span>
            {user.firstName} {user.lastName}
          </span>
          <LogOutButton />
        </div>
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
