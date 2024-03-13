import { createClient } from "./client";

export async function signInWithLinkedIn() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "linkedin_oidc",
    options: {
      redirectTo: "http://localhost:3000/api/auth/callback",
    },
  });
}

