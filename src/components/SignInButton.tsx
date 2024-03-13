"use client";
import { signInWithLinkedIn } from "@/app/utils/supabase/linkedinAuth";
import React from "react";

export default function SignInButton() {
  return (
    <button
      onClick={signInWithLinkedIn}
      className="btn btn-light btn-big cursor-pointer"
    >
      Sign In
    </button>
  );
}
