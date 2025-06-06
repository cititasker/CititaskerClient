import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    token: string;
    role: TRole;
  }
  interface Session {
    user: {
      authToken: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    userData: { token: string; role: string };
  }
}

declare global {
  interface Window {
    google?: {
      maps?: {
        places?: any;
      };
    };
  }
}
