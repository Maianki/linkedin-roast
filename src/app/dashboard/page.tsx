"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getRoast } from "../utils/getRoast";
import toast from "react-hot-toast";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
export default function Dashboard() {
  const [audioSrc, setAudioSrc] = useState<string>("");
  const { user } = useKindeBrowserClient();
  const [isRoast, setIsRoast] = useState<boolean>(false);
  const [title, seTitle] = useState("");

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
      toast("Something went wrong! Try again");
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="container">
      <div className="card start-hero">
        <p className="text-display-2">
          Roast your LinkedIn Profile
          <br />
          <p className="text-body-2 start-hero-intro">
            Welcome {user?.given_name} {user?.family_name}
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
        </p>
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
