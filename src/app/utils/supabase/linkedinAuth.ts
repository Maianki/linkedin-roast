import { createClient } from "./client";

export async function signInWithLinkedIn() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "linkedin_oidc",
    options: {
      redirectTo: `${location.origin}/api/auth/callback`,
    },
  });
}

