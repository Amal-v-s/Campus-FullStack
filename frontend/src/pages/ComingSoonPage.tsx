import { useAuth } from "../auth/useAuth";

export function ComingSoonPage() {
  const { user, logout } = useAuth();

  return (
    <div className="auth-screen">
      <div className="auth-card coming-soon-page">
        <p className="role-pill" style={{ width: "fit-content", marginBottom: 16 }}>
          {user?.role}
        </p>
        <h1 className="serif">Workspace next</h1>
        <p className="lede">
          Signed in as {user?.email}. Faculty and student dashboards are not
          part of this design phase.
        </p>
        <button className="btn btn-primary" type="button" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}
