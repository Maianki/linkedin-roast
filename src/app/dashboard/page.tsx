"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getAudioRoast, getRoast } from "../utils/getRoast";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
export default function Dashboard() {
  const [audioSrc, setAudioSrc] = useState<string>("");
  const { user } = useKindeBrowserClient();
  const [isRoast, setIsRoast] = useState<boolean>(false);

  const handleRoast = async () => {
    setIsRoast(true);
    try {
      const audioBuffer = await getRoast(
        user?.picture as string,
        `${user?.given_name}`
      );
      const audioBlob = new Blob([audioBuffer as unknown as string], {
        type: "audio/mpeg",
      });
      setAudioSrc(URL.createObjectURL(audioBlob));
      setIsRoast(false);
    } catch (err) {
      setIsRoast(false);
      console.log("Something went wrong!");
    }
  };

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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            {isRoast ? (
              <>
                <span>Sit tight while your roast is being prepared!</span>
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
        <div style={{ marginTop: "18px" }}>
          {audioSrc && (
            <audio style={{ width: "220px" }} controls src={audioSrc} />
          )}
        </div>
      </div>
      <section className="next-steps-section"></section>
    </div>
  );
}
