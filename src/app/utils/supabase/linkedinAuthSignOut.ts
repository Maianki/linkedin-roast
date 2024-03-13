import { createClient } from "./client";

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return "/";
  }

  return "/";
}
