import RegisterCard from "@/components/auth/RegisterCard";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <RegisterCard />
      <Link
        href={"/"}
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
