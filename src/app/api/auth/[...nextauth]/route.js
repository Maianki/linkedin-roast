import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: { params: { scope: "profile email openid" } },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
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
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
