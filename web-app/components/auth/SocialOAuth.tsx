import { signIn, signOut, useSession } from "next-auth/react";
export default function SocialOAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (!session) {
    return (
      <div>
        <button onClick={() => signIn("google")}>Login with Google</button>
      </div>
    );
  }

  console.log("Session:", session);

  return (
    <div>
      <div>Hi, {session.user?.name}</div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
