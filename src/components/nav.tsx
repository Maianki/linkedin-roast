"use client";
 
import { useRouter } from "next/navigation";
import { signInWithLinkedIn, signOut } from "@/app/utils/supabase/linkedinAuth";

export default function Navbar({ data }: { data: any }) {
  const user = data?.user?.user_metadata;
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <nav className="nav container">
      <h1 className="text-display-3">LinkedIn Roast</h1>
      <div>
        {!data?.user ? (
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

              <a role="button" className="text-subtle" onClick={handleSignOut}>
                Log out
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
