import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="container">
      <div className="card hero">
        <p className="text-display-1 hero-title">
          Try Linkedin <br /> Roast
        </p>
        <p className="text-body-1 hero-tagline">Sign In with your LinkedIn</p>

        <LoginLink className="btn btn-light btn-big">Sign In</LoginLink>
      </div>
    </div>
  );
}
