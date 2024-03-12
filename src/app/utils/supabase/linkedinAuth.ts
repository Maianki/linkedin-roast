import { createClient } from "./client";

const supabase = createClient();
export async function signInWithLinkedIn() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "linkedin_oidc",
  });
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
}
