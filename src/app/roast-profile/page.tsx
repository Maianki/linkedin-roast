"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { decode } from "next-auth/jwt";

function RoastProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session);

  if (status !== "authenticated") {
    return router.push("/");
  }

  function handleLogout(): void {
    signOut();
    return router.replace("/");
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Sign out
      </button>
    </div>
  );
}

export default RoastProfile;
