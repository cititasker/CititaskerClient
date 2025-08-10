import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { ROLE, ROUTES } from "./constant";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );
        const result = await res.json();

        if (result.success) {
          return {
            ...result.data,
            role: result.data.role || ROLE.poster,
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
    maxAge: 60 * 60 * 24 * 7, // 7 days session lifetime
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7, // 7 days token lifetime
  },
  callbacks: {
    signIn: async ({ account }) => account?.provider !== "google",
    authorized: ({ auth }) => !!auth,
    jwt: ({ token, user, account }) => {
      if (account?.provider === "credentials" && user) {
        token.userData = { ...user, role: user.role };
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
});
