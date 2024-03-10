import "./globals.css";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
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
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="nav container">
            <h1 className="text-display-3">LinkedIn Roast</h1>
            <div>
              {!(await isAuthenticated()) ? (
                <>
                  <LoginLink className="btn btn-ghost sign-in-btn">
                    Sign in
                  </LoginLink>
                </>
              ) : (
                <div className="profile-blob">
                  {user?.picture ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="avatar"
                      src={user?.picture}
                      alt="user profile avatar"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="avatar">
                      {user?.given_name?.[0]}
                      {user?.family_name?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-heading-2">
                      {user?.given_name} {user?.family_name}
                    </p>

                    <LogoutLink className="text-subtle">Log out</LogoutLink>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
