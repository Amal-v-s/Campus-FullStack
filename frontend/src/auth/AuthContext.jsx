import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";
import { changePasswordApi, loginApi, logoutApi, meApi } from "../api/auth";
import { AuthContext } from "./authContextDef";
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
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
            }
            catch {
                if (isMounted) {
                    setUser(null);
                }
            }
            finally {
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
    const login = useCallback(async (rawEmail, password) => {
        const cleanEmail = rawEmail.trim().toLowerCase();
        const res = await loginApi(cleanEmail, password);
        setUser(res.user);
        return { user: res.user };
    }, []);
    const logout = useCallback(async () => {
        try {
            await logoutApi();
        }
        finally {
            setUser(null);
        }
    }, []);
    const changePassword = useCallback(async (currentPassword, newPassword) => {
        const res = await changePasswordApi(currentPassword, newPassword);
        setUser(res.user);
    }, []);
    const value = useMemo(() => {
        return {
            user,
            loading,
            login,
            logout,
            changePassword,
        };
    }, [user, loading, login, logout, changePassword]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
