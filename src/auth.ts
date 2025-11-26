import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "fastapi-google",
      name: "Google (FastAPI)",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.token) {
          return null;
        }

        try {
          // Verify token with FastAPI backend
          const response = await fetch(
            `${process.env.INTERNAL_API_URL}/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${credentials.token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            return null;
          }

          const user = await response.json();

          // Return user object with token
          return {
            id: user.id || user.sub || user.email,
            email: user.email,
            name: user.name,
            image: user.picture || user.image,
            accessToken: credentials.token as string,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.accessToken = user.accessToken;
        token.idToken = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Make access token available in session
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
