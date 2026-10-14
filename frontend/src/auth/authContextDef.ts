import { createContext } from "react";
import type { SessionUser } from "./types";

export type AuthContextValue = {
  user: SessionUser | null;
  login: (email: string, password: string) => { user: SessionUser };
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
