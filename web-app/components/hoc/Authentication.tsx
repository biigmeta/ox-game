"use client";
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";
import { FaRightFromBracket } from "react-icons/fa6";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

export default function Authentication() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "No, stay logged in",
    });

    if (!result.isConfirmed) {
      return;
    }

    await signOut();
    logout();
  };
  return (
    <div>
      {user ? (
        <div className="flex flex-row items-center gap-2">
          <span>
            {user.firstName} {user.lastName}
          </span>
          <button
            onClick={handleLogout}
            className="bg-[var(--error)] text-[var(--background)] px-2 py-1 rounded-md hover:bg-[var(--background)] border hover:text-[var(--error)] hover:scale-105 transition-transform duration-300"
          >
            <FaRightFromBracket />
          </button>
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
