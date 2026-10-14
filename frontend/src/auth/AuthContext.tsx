import { useMemo, useState, type ReactNode } from "react";
import { AuthContext, type AuthContextValue } from "./authContextDef";
import { MOCK_USERS } from "./mockUsers";
import type { SessionUser } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [directory, setDirectory] = useState(() =>
    MOCK_USERS.map((u) => ({ ...u })),
  );

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      login(rawEmail, password) {
        const email = rawEmail.trim().toLowerCase();
        if (!email || !password) {
          throw new Error("Enter your email and password.");
        }
        if (!EMAIL_RE.test(email)) {
          throw new Error("Enter a valid email address.");
        }

        const record = directory.find((u) => u.email === email);
        if (!record) {
          throw new Error("User does not exist");
        }
        if (record.password !== password) {
          throw new Error("Password is wrong");
        }

        const next: SessionUser = {
          email: record.email,
          role: record.role,
          mustChangePassword: record.mustChangePassword,
        };
        setUser(next);
        return { user: next };
      },
      logout() {
        setUser(null);
      },
      changePassword(currentPassword, newPassword) {
        if (!user) {
          throw new Error("You need to sign in first.");
        }
        if (newPassword.length < 8) {
          throw new Error("New password must be at least 8 characters.");
        }
        if (currentPassword === newPassword) {
          throw new Error("New password must be different from the current one.");
        }

        const record = directory.find((u) => u.email === user.email);
        if (!record || record.password !== currentPassword) {
          throw new Error("Current password is wrong");
        }

        setDirectory((prev) =>
          prev.map((u) =>
            u.email === user.email
              ? { ...u, password: newPassword, mustChangePassword: false }
              : u,
          ),
        );
        setUser({ ...user, mustChangePassword: false });
      },
    };
  }, [directory, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
