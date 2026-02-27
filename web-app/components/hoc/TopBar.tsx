import Link from "next/link";
import Authentication from "./Authentication";
import { FaMicrosoft } from "react-icons/fa6";
export default function TopBar() {
  return (
    <nav className="w-full h-full shadow-md bg-[var(--card)] flex p-4 items-center justify-between">
      <Link href="/" className="text-xl font-bold flex items-center gap-2">
        <FaMicrosoft className="text-[var(--primary)]" />{" "}
        <span className="hidden md:block">Tic Tac Toe</span>
      </Link>
      <div className="flex flex-row items-center gap-4">
        <Link
          href="/how-to-play"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          How to Play
        </Link>
        <Authentication />
      </div>
    </nav>
  );
}
