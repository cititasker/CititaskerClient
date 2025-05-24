import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import { ROLE } from "./constant";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        let user = null;
        const { email, password } = credentials;
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/login`,
            {
              method: "POST",
              body: JSON.stringify({ email, password }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          ).then((data) => data.json());

          const cookieStore = await cookies();
          cookieStore.set("citi-user", res.data?.token, {
            secure: false,
            path: "/",
          });
          if (res.success) {
            user = res.data;
          }
        } catch (error) {
          console.log(error);
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google") {
        return false;
      }
      return true;
    },
    authorized({ auth }) {
      return !!auth;
    },
    jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.userData = { ...user, role: ROLE.poster };
      }
      return token;
    },
    session({ session, token }) {
      if (token.userData) {
        session.user.authToken = token.userData?.token;
        session.user.role = token.userData.role;
      }
      return session;
    },
  },
  // session: {
  //   strategy: "jwt",
  //   maxAge: 60,
  //   updateAge: 0,
  // },
  // jwt: {
  //   maxAge: 60,
  // },
  pages: {
    signIn: "/login",
  },
});
