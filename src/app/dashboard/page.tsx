"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getRoast } from "../utils/getRoast";
export default function Dashboard() {
  const { user } = useKindeBrowserClient();

  const handleRoast = () => {
    getRoast(user?.picture as string, `${user?.given_name}`);
  };

  console.log("accessToken", user);
  return (
    <div className="container">
      <div className="card start-hero">
        <p className="text-body-2 start-hero-intro">Woohoo!</p>
        <p className="text-display-2">
          Roast your linkedIn profile
          <br />
          <button
            className="btn btn-light btn-med cursor-pointer"
            onClick={handleRoast}
          >
            Roast my profile
          </button>
        </p>
      </div>
      <section className="next-steps-section">
        {/* <h2 className="text-heading-1">Next steps for you</h2> */}
      </section>
    </div>
  );
}
