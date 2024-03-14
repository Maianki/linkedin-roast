"use client";
import React from "react";
import Image from "next/image";
import Chai from "../../src/app/chai.svg";

export default function BuyMeCoffee() {
  return (
    <>
      <a
        href="https://www.buymeacoffee.com/ankitkumain"
        rel="noopener"
        target="_blank"
        className="profile-blob"
        style={{ position: "fixed", bottom: 10, right: 10 }}
      >
        <button
          className="btn btn-light btn-med cursor-pointer avatar"
          style={{
            backgroundColor: "#d5d9e1",
            color: "rgb(0, 0, 0)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Comic Sans MS Comic Sans cursive",
            }}
          >
            <span className="btn-icon px-1">
              <Image src={Chai} alt="Chai icon" />
            </span>
          </div>
        </button>
        <div className="tooltip" id="my-tooltip">
          Buy me a coffee
        </div>
      </a>
    </>
  );
}
