import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const LATER = [
  { label: "Faculty", to: "/admin/faculty" },
  { label: "Students", to: "/admin/students" },
  { label: "Courses", to: "/admin/courses" },
  { label: "Materials", to: "/admin/materials" },
] as const;

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="glyph" aria-hidden="true">
            C
          </span>
          <div>
            <div className="name">Campus</div>
            <div className="sub">Admin</div>
          </div>
        </div>

        <nav className="nav" aria-label="Admin">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Dashboard
          </NavLink>
          {LATER.map((item) => (
            <span key={item.to} className="nav-item soon" title="Coming later">
              {item.label}
              <span className="soon-tag">Soon</span>
            </span>
          ))}
        </nav>

        <p className="sidebar-foot">Phase 0 · visual system only</p>
      </aside>

      <div className="main">
        <header className="topbar">
          <h2>Overview</h2>
          <div className="topbar-user">
            <span className="muted">{user?.email}</span>
            <span className="role-pill">{user?.role}</span>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ height: 36, width: "auto" }}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Log out
            </button>
          </div>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
