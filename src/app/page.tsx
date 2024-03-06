"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data } = useSession();
  const router = useRouter();

  if (data?.user) {
    return router.push("/roast-profile");
  }

  return (
    <main className="">
      <div className="h-screen flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signIn()}
        >
          Sign in with Linkedin
        </button>
      </div>
    </main>
  );
}
