import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
const LATER = [
    { label: "Faculty", to: "/admin/faculty" },
    { label: "Students", to: "/admin/students" },
    { label: "Courses", to: "/admin/courses" },
    { label: "Materials", to: "/admin/materials" },
];
export function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    return (_jsxs("div", { className: "shell", children: [_jsxs("aside", { className: "sidebar", children: [_jsxs("div", { className: "sidebar-brand", children: [_jsx("span", { className: "glyph", "aria-hidden": "true", children: "C" }), _jsxs("div", { children: [_jsx("div", { className: "name", children: "Campus" }), _jsx("div", { className: "sub", children: "Admin" })] })] }), _jsxs("nav", { className: "nav", "aria-label": "Admin", children: [_jsx(NavLink, { to: "/admin", end: true, className: ({ isActive }) => isActive ? "nav-item active" : "nav-item", children: "Dashboard" }), LATER.map((item) => (_jsxs("span", { className: "nav-item soon", title: "Coming later", children: [item.label, _jsx("span", { className: "soon-tag", children: "Soon" })] }, item.to)))] }), _jsx("p", { className: "sidebar-foot", children: "Phase 0 \u00B7 visual system only" })] }), _jsxs("div", { className: "main", children: [_jsxs("header", { className: "topbar", children: [_jsx("h2", { children: "Overview" }), _jsxs("div", { className: "topbar-user", children: [_jsx("span", { className: "muted", children: user?.email }), _jsx("span", { className: "role-pill", children: user?.role }), _jsx("button", { type: "button", className: "btn btn-ghost", style: { height: 36, width: "auto" }, onClick: async () => {
                                            await logout();
                                            navigate("/login");
                                        }, children: "Log out" })] })] }), _jsx("div", { className: "content", children: _jsx(Outlet, {}) })] })] }));
}
