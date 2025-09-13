"use client";

import { createContext, useContext } from "react";
import { Session } from "next-auth";

type AuthContextType = {
  session: Session | null;
  isAuth: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isAuth: false,
});

export const useAuth = () => useContext(AuthContext);

type Props = {
  session: Session | null;
  children: React.ReactNode;
};

export function AuthProvider({ session, children }: Props) {
  return (
    <AuthContext.Provider
      value={{
        session,
        isAuth: session?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
