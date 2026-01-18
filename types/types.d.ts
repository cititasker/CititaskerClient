import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    token: string;
    role: TRole;
    id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
  }

  interface Session {
    user: {
      authToken: string;
      role: TRole;
      id?: string;
      email?: string;
      first_name?: string;
      last_name?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    userData: {
      token: string;
      role: TRole;
      id?: string;
      email?: string;
      first_name?: string;
      last_name?: string;
    };
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
