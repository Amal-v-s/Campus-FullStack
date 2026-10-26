import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import type { SessionUser } from "./auth/types";
import { useAuth } from "./auth/useAuth";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { LoginPage } from "./pages/LoginPage";

function LoadingScreen() {
  return (
    <div className="auth-screen">
      <div className="auth-card" style={{ textAlign: "center", padding: "40px 24px" }}>
        <span className="glyph" aria-hidden="true" style={{ fontSize: 24, margin: "0 auto 12px" }}>
          C
        </span>
        <p className="muted" style={{ fontSize: 14 }}>
          Restoring session...
        </p>
      </div>
    </div>
  );
}

function RequireAuth({
  children,
  allowPasswordChange = false,
}: {
  children: ReactNode;
  allowPasswordChange?: boolean;
}) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.mustChangePassword && !allowPasswordChange) {
    return <Navigate to="/change-password" replace />;
  }
  return children;
}

function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.mustChangePassword) return <Navigate to="/change-password" replace />;
  if (user.role !== "admin") return <Navigate to="/coming-soon" replace />;
  return children;
}

function GuestOnly({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return children;
  return <Navigate to={homeFor(user)} replace />;
}

function homeFor(user: SessionUser) {
  if (user.mustChangePassword) return "/change-password";
  if (user.role === "admin") return "/admin";
  return "/coming-soon";
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestOnly>
            <LoginPage />
          </GuestOnly>
        }
      />
      <Route
        path="/change-password"
        element={
          <RequireAuth allowPasswordChange>
            <ChangePasswordPage />
          </RequireAuth>
        }
      />
      <Route
        path="/coming-soon"
        element={
          <RequireAuth>
            <ComingSoonPage />
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<AdminDashboardPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
