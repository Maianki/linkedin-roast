import "./globals.css";
import { createClient } from "./utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/nav";
export const metadata = {
  title: "LinkedIn Roast",
  description: "Get your linkedin profile roasted!",
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Roast",
    description:
      "Ready to turn your LinkedIn profile into the hottest topic on the internet? 🔥 Get roasted and toasted with hilarious feedback that'll make your profile stand out like never before!",
    images: [
      "https://github.com/Maianki/linkedin-roast/assets/28630412/e0fd8cec-24c6-42a5-8589-c65f9780efe8",
    ], // Must be an absolute URL
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const user = data?.user;
  console.log(data);
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}


