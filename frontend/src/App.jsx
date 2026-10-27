import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/useAuth";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { LoginPage } from "./pages/LoginPage";
function LoadingScreen() {
    return (_jsx("div", { className: "auth-screen", children: _jsxs("div", { className: "auth-card", style: { textAlign: "center", padding: "40px 24px" }, children: [_jsx("span", { className: "glyph", "aria-hidden": "true", style: { fontSize: 24, margin: "0 auto 12px" }, children: "C" }), _jsx("p", { className: "muted", style: { fontSize: 14 }, children: "Restoring session..." })] }) }));
}
function RequireAuth({ children, allowPasswordChange = false, }) {
    const { user, loading } = useAuth();
    if (loading)
        return _jsx(LoadingScreen, {});
    if (!user)
        return _jsx(Navigate, { to: "/login", replace: true });
    if (user.mustChangePassword && !allowPasswordChange) {
        return _jsx(Navigate, { to: "/change-password", replace: true });
    }
    return children;
}
function RequireAdmin({ children }) {
    const { user, loading } = useAuth();
    if (loading)
        return _jsx(LoadingScreen, {});
    if (!user)
        return _jsx(Navigate, { to: "/login", replace: true });
    if (user.mustChangePassword)
        return _jsx(Navigate, { to: "/change-password", replace: true });
    if (user.role !== "admin")
        return _jsx(Navigate, { to: "/coming-soon", replace: true });
    return children;
}
function GuestOnly({ children }) {
    const { user, loading } = useAuth();
    if (loading)
        return _jsx(LoadingScreen, {});
    if (!user)
        return children;
    return _jsx(Navigate, { to: homeFor(user), replace: true });
}
function homeFor(user) {
    if (user.mustChangePassword)
        return "/change-password";
    if (user.role === "admin")
        return "/admin";
    return "/coming-soon";
}
export default function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(GuestOnly, { children: _jsx(LoginPage, {}) }) }), _jsx(Route, { path: "/change-password", element: _jsx(RequireAuth, { allowPasswordChange: true, children: _jsx(ChangePasswordPage, {}) }) }), _jsx(Route, { path: "/coming-soon", element: _jsx(RequireAuth, { children: _jsx(ComingSoonPage, {}) }) }), _jsx(Route, { path: "/admin", element: _jsx(RequireAdmin, { children: _jsx(AdminLayout, {}) }), children: _jsx(Route, { index: true, element: _jsx(AdminDashboardPage, {}) }) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/login", replace: true }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/login", replace: true }) })] }));
}
