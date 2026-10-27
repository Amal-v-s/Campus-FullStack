import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "../auth/useAuth";
export function ComingSoonPage() {
    const { user, logout } = useAuth();
    return (_jsx("div", { className: "auth-screen", children: _jsxs("div", { className: "auth-card coming-soon-page", children: [_jsx("p", { className: "role-pill", style: { width: "fit-content", marginBottom: 16 }, children: user?.role }), _jsx("h1", { className: "serif", children: "Workspace next" }), _jsxs("p", { className: "lede", children: ["Signed in as ", user?.email, ". Faculty and student dashboards are not part of this design phase."] }), _jsx("button", { className: "btn btn-primary", type: "button", onClick: logout, children: "Log out" })] }) }));
}
