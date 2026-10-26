import { createContext } from "react";
import type { SessionUser } from "./types";

export type AuthContextValue = {
  user: SessionUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ user: SessionUser }>;
  logout: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
