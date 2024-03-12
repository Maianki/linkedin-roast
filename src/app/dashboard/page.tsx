"use client";
import { getRoast } from "../utils/getRoast";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { createClient } from "../utils/supabase/client";
import { User, UserMetadata } from "@supabase/supabase-js";

// Adjust the type annotation for UserResponse
type UserResponse = {
  user: User | null;
  error: Error | null;
};

export default function Dashboard() {
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [isRoast, setIsRoast] = useState<boolean>(false);
  const [title, seTitle] = useState("");
  const [user, setUser] = useState<UserMetadata | undefined>(undefined);

  const supabase = createClient();

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
  }, []);

  const handleRoast = async () => {
    setIsRoast(true);
    try {
      const audioBuffer = await getRoast(
        user?.picture as string,
        `${user?.given_name}`,
        title
      );
      const audioBlob = new Blob([audioBuffer as unknown as string], {
        type: "audio/mpeg",
      });
      setAudioSrc(URL.createObjectURL(audioBlob));
      setIsRoast(false);
    } catch (err) {
      setIsRoast(false);
      toast.error("Something went wrong! Try again");
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="container">
      <div className="card start-hero">
        <div className="text-display-2">
          Roast your LinkedIn Profile
          <br />
          <p className="text-body-2 start-hero-intro">
            {/* Welcome {user?.given_name} {user?.family_name} */}
          </p>
          <div className="title-container">
            <label htmlFor="title" className="title-label">
              Title(Optional but it makes more juicy)
            </label>
            <input
              className="title-input"
              type="text"
              id="title"
              value={title}
              placeholder="Tech Bro | 100x Engineer | 9 Figures exit VC AC/DC"
              onChange={(e) => seTitle(e.target.value)}
            />
          </div>
          <button
            disabled={isRoast}
            className="btn btn-light btn-med cursor-pointer"
            onClick={handleRoast}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              marginTop: "6px",
            }}
          >
            {isRoast ? (
              <>
                <span>Keep your socks on while we spice up your roast!</span>
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </>
            ) : (
              <span>Roast my profile</span>
            )}
          </button>
        </div>
        <div
          style={{
            marginTop: "18px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {audioSrc && (
            <audio
              style={{
                width: "220px",
              }}
              controls
              src={audioSrc}
            />
          )}
        </div>
      </div>
      <section className="next-steps-section"></section>
    </div>
  );
}
