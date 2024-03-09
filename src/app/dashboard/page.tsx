"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getAudioRoast, getRoast } from "../utils/getRoast";
import { useState } from "react";
export default function Dashboard() {
  const [audioSrc, setAudioSrc] = useState("");
  const { user } = useKindeBrowserClient();

  const handleRoast = async () => {
    try {
      const audioBuffer = await getRoast(
        user?.picture as string,
        `${user?.given_name}`
      );
      const audioBlob = new Blob([audioBuffer as string], {
        type: "audio/mpeg",
      });
      setAudioSrc(URL.createObjectURL(audioBlob));
    } catch (err) {
      console.log("Something went wrong!");
    }
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
        <div style={{ marginTop: "14px" }}>
          {audioSrc && <audio controls src={audioSrc} />}
        </div>
      </div>
      <section className="next-steps-section"></section>
    </div>
  );
}
