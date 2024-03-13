"use client";
 
import { useRouter } from "next/navigation";
import { signInWithLinkedIn } from "@/app/utils/supabase/linkedinAuth";
import { signOut } from "@/app/utils/supabase/linkedinAuthSignOut";
import { createClient } from "../app/utils/supabase/client";
import { UserMetadata } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  // const user = data?.user?.user_metadata;
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<UserMetadata | undefined>(undefined);

  useEffect(() => {
    try {
      (async function () {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user?.user_metadata);
      })();
    } catch (err) {
      toast.error("Something went wrong! Try refreshing the page");
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="nav container">
      <h1 className="text-display-3">LinkedIn Roast</h1>
      <div>
        {!user ? (
          <>
            <a
              role="button"
              className="btn btn-ghost sign-in-btn cursor-pointer"
              onClick={signInWithLinkedIn}
            >
              Sign in
            </a>
          </>
        ) : (
          <div className="profile-blob">
            {user?.picture ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="avatar"
                src={user?.picture}
                alt="user profile avatar"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="avatar">
                {user?.given_name?.[0]}
                {user?.family_name?.[0]}
              </div>
            )}
            <div>
              <p className="text-heading-2">
                {user?.given_name} {user?.family_name}
              </p>

              <a
                role="button"
                className="text-subtle cursor-pointer"
                onClick={handleSignOut}
              >
                Log out
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
