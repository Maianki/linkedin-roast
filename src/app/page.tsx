import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Audio } from "react-loader-spinner";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  return (
    <div className="container">
      <div className="card hero">
        <p className="text-display-1 hero-title">
          Try Linkedin <br /> Roast
        </p>

        {!(await isAuthenticated()) ? (
          <>
            <p className="text-body-1 hero-tagline">
              Sign In with your LinkedIn
            </p>
            <LoginLink className="btn btn-light btn-big">Sign In</LoginLink>
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
