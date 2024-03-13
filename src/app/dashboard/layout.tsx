import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data?.user) {
    redirect("/");
  }

  const user = data?.user;
  console.log(data);
  return <section>{children}</section>;
}
