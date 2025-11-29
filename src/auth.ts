// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { ROUTES } from "./constant";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const token = credentials?.token as string | undefined;
        const role = credentials?.role as TRole | undefined;

        if (token && role) {
          return {
            token,
            role,
          };
        }

        return null;
      },
    }),
  ],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // ✅ Update session every 24 hours instead of every request
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  callbacks: {
    signIn: async ({ account }) => account?.provider !== "google",
    authorized: ({ auth }) => !!auth,
    jwt: ({ token, user, account, trigger }) => {
      // On sign-in
      if (account?.provider === "credentials" && user) {
        token.userData = {
          ...user,
          role: user.role,
          token: user.token,
        };
      }
      // On session update
      if (trigger === "update" && user) {
        token.userData = {
          ...(token.userData ?? {}),
          token: user.token || token.userData?.token,
          role: user.role || token.userData?.role,
        };
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token.userData) {
        session.user = {
          ...session.user,
          authToken: token.userData.token,
          role: token.userData.role,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: ROUTES.LOGIN,
  },
  // ✅ Add these to reduce session checks
  events: {
    // Log for debugging (remove in production)
    async session() {
      if (process.env.NODE_ENV === "development") {
        console.log("Session accessed:", new Date().toISOString());
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
});
