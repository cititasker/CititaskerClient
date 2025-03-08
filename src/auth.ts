import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { loginSchema } from "./schema/auth";
import { loginApi } from "./services/auth";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        let user = null;
        const parsedCredentials = loginSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          try {
            const res = await loginApi({ email, password });
            const cookieStore = await cookies();
            cookieStore.set("citi-user", res.data.token, {
              secure: false,
              path: "/",
            });
            if (res.success) {
              user = res.data;
            }
          } catch (error) {
            console.log(error);
          }
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google") {
        // console.log(99, account);
        return false;
      }
      return true;
    },
    authorized({ auth }) {
      return !!auth;
    },
    jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.userData = { ...user, role: "poster" };
      }
      return token;
    },
    session({ session, token }) {
      if (token.userData) {
        session.user.authToken = token.userData.token;
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
