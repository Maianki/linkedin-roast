import Link from "next/link";
import { Audio } from "react-loader-spinner";
import { createClient } from "./utils/supabase/server";
import { redirect } from "next/navigation";
import SignInButton from "@/components/SignInButton";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="container">
      <div className="card hero">
        <p className="text-display-1 hero-title">
          Try Linkedin <br /> Roast
        </p>

        {!data?.user ? (
          <>
            <p className="text-body-1 hero-tagline">
              Sign In with your LinkedIn
            </p>
            <SignInButton />
          </>
        ) : (
          <Link
            className="btn btn-light btn-med cursor-pointer"
            href={"/dashboard"}
          >
            Roast Me!
          </Link>
        )}
      </div>
    </div>
  );
}
