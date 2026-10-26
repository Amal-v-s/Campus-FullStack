import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { changePasswordApi, loginApi, logoutApi, meApi } from "../api/auth";
import { AuthContext, type AuthContextValue } from "./authContextDef";
import type { SessionUser } from "./types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from httpOnly cookie on mount
  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const res = await meApi();
        if (isMounted) {
          setUser(res ? res.user : null);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (rawEmail: string, password: string) => {
    const cleanEmail = rawEmail.trim().toLowerCase();
    const res = await loginApi(cleanEmail, password);
    setUser(res.user);
    return { user: res.user };
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    const res = await changePasswordApi(currentPassword, newPassword);
    setUser(res.user);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      loading,
      login,
      logout,
      changePassword,
    };
  }, [user, loading, login, logout, changePassword]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
