import { signIn, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa6";
import LogOutButton from "../general/LogOutButton";
export default function SocialOAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (!session) {
    return (
      <div>
        <button
          className="flex items-center justify-center gap-4 border w-full rounded-md p-2 border-[var(--border)]"
          onClick={() => signIn("google")}
        >
          <FaGoogle /> Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div>Hi, {session.user?.name}</div>
      <LogOutButton />
    </div>
  );
}
