import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useHealth } from "../hooks/useHealth";
const STATS = [
    { label: "Faculty", value: "—", note: "Directory comes later" },
    { label: "Students", value: "—", note: "Enrollment comes later" },
    { label: "Courses", value: "—", note: "Catalog comes later" },
    { label: "Materials", value: "—", note: "Uploads come later" },
];
const UPCOMING = [
    { title: "Invite faculty", detail: "Create accounts and issue first passwords" },
    { title: "Enroll students", detail: "Assign students to classes and courses" },
    { title: "Attach materials", detail: "Faculty uploads feed the RAG assistant" },
];
export function AdminDashboardPage() {
    const { health, error, loading } = useHealth();
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: "page-head", children: [_jsx("h1", { className: "serif", children: "Welcome back" }), _jsx("p", { className: "muted", children: "This is the admin home. Academic structure tools will land here in later phases." })] }), _jsx("section", { className: "stats", "aria-label": "Summary", children: STATS.map((stat) => (_jsxs("article", { className: "stat-card", children: [_jsx("div", { className: "label", children: stat.label }), _jsx("div", { className: "value", children: stat.value }), _jsx("div", { className: "note", children: stat.note })] }, stat.label))) }), _jsx("section", { className: "panel", style: { marginBottom: 28 }, children: _jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }, children: [_jsxs("div", { children: [_jsx("h3", { style: { margin: 0, fontSize: 15 }, children: "Backend API Proxy" }), _jsx("p", { className: "muted", style: { fontSize: 13, marginTop: 4 }, children: "GET /api/health \u2192 Node + Express backend service" })] }), _jsx("div", { children: loading ? (_jsx("span", { className: "role-pill", style: { background: "var(--line)", color: "var(--text-muted)" }, children: "Checking proxy..." })) : health ? (_jsx("span", { className: "role-pill", style: { background: "var(--ok-soft)", color: "var(--ok)" }, children: "\u25CF Connected (HTTP 200)" })) : (_jsxs("span", { className: "role-pill", style: { background: "var(--danger-soft)", color: "var(--danger)" }, children: ["\u25CF ", error || "Service unavailable"] })) })] }) }), _jsxs("section", { className: "panel", children: [_jsx("h3", { children: "On the roadmap" }), _jsx("ul", { className: "upcoming", children: UPCOMING.map((item) => (_jsxs("li", { children: [_jsx("span", { children: item.title }), _jsx("span", { className: "muted", children: item.detail })] }, item.title))) })] })] }));
}
