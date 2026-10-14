import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { BrandMark } from "../components/BrandMark";

export function ChangePasswordPage() {
  const { user, changePassword } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState<string | null>(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setCurrentPasswordError(null);
    setNewPasswordError(null);
    setGeneralError(null);

    let hasError = false;

    if (!currentPassword) {
      setCurrentPasswordError("Enter your current password.");
      hasError = true;
    }

    if (!newPassword) {
      setNewPasswordError("Enter your new password.");
      hasError = true;
    } else if (newPassword.length < 8) {
      setNewPasswordError("New password must be at least 8 characters.");
      hasError = true;
    } else if (currentPassword === newPassword) {
      setNewPasswordError("New password must be different from the current one.");
      hasError = true;
    }

    if (hasError) return;

    try {
      changePassword(currentPassword, newPassword);
      navigate(user?.role === "admin" ? "/admin" : "/coming-soon", {
        replace: true,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not update password.";
      if (message.toLowerCase().includes("current password is wrong")) {
        setCurrentPasswordError("Current password is wrong");
      } else if (message.toLowerCase().includes("different from the current")) {
        setNewPasswordError(message);
      } else if (message.toLowerCase().includes("8 characters")) {
        setNewPasswordError(message);
      } else {
        setGeneralError(message);
      }
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <BrandMark />
        <h1 className="serif">Set a new password</h1>
        <p className="lede">
          First sign-in for faculty and students requires a new password before
          the workspace opens.
        </p>

        <form onSubmit={onSubmit} noValidate>
          {generalError ? (
            <p className="form-error" role="alert">
              {generalError}
            </p>
          ) : null}

          <div className="field">
            <label htmlFor="currentPassword">Current password</label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                if (currentPasswordError) setCurrentPasswordError(null);
              }}
              aria-invalid={Boolean(currentPasswordError)}
              aria-describedby={currentPasswordError ? "current-password-error" : undefined}
            />
            {currentPasswordError ? (
              <p className="field-error" role="alert" id="current-password-error">
                {currentPasswordError}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="newPassword">New password</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (newPasswordError) setNewPasswordError(null);
              }}
              aria-invalid={Boolean(newPasswordError)}
              aria-describedby={newPasswordError ? "new-password-error" : undefined}
            />
            {newPasswordError ? (
              <p className="field-error" role="alert" id="new-password-error">
                {newPasswordError}
              </p>
            ) : null}
          </div>

          <button className="btn btn-primary" type="submit">
            Save password
          </button>
        </form>
      </div>
    </div>
  );
}
