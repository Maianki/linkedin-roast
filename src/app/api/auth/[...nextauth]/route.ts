import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
      authorization: { params: { scope: "profile email openid" } },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      async profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user, profile }) {
      console.log("From server", user);
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
    async redirect() {
      return "/";
    },
  },
};

export const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
