import { useUserStore } from "@/stores/useUserStore";
import { signOut } from "next-auth/react";
import { FaRightFromBracket } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function LogOutButton() {
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
    <button
      onClick={handleLogout}
      className="bg-[var(--error)] text-[var(--background)] px-2 py-1 rounded-md hover:bg-[var(--background)] border hover:text-[var(--error)] hover:scale-105 transition-transform duration-300"
    >
      <FaRightFromBracket />
    </button>
  );
}
