import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { BrandMark } from "../components/BrandMark";

function destination(role: string, mustChangePassword: boolean) {
  if (mustChangePassword) return "/change-password";
  if (role === "admin") return "/admin";
  return "/coming-soon";
}

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);

    const cleanEmail = email.trim();
    let hasError = false;

    if (!cleanEmail) {
      setEmailError("Enter your campus email.");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Enter your password.");
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);
    try {
      const { user } = await login(cleanEmail, password);
      navigate(destination(user.role, user.mustChangePassword), { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not sign in.";
      if (message.toLowerCase().includes("user does not exist")) {
        setEmailError("User does not exist");
      } else if (message.toLowerCase().includes("password is wrong")) {
        setPasswordError("Password is wrong");
      } else if (message.toLowerCase().includes("valid email")) {
        setEmailError("Enter a valid email address.");
      } else {
        setGeneralError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <BrandMark />
        <h1 className="serif">Sign in</h1>
        <p className="lede">Use your campus email to open your workspace.</p>

        <form onSubmit={onSubmit} noValidate>
          {generalError ? (
            <p className="form-error" role="alert">
              {generalError}
            </p>
          ) : null}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              placeholder="e.g. admin@campus.local"
              value={email}
              disabled={isSubmitting}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
              }}
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "email-error" : undefined}
            />
            {emailError ? (
              <p className="field-error" role="alert" id="email-error">
                {emailError}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              disabled={isSubmitting}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(null);
              }}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? "password-error" : undefined}
            />
            {passwordError ? (
              <p className="field-error" role="alert" id="password-error">
                {passwordError}
              </p>
            ) : null}
          </div>

          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Continue"}
          </button>
        </form>

        <div className="hint-box">
          Seeded accounts for testing:
          <br />
          <strong>admin@campus.local</strong> / campus123
          <br />
          <strong>faculty@campus.local</strong> / temp123 (must change password)
          <br />
          <strong>student@campus.local</strong> / temp123 (must change password)
        </div>
      </div>
    </div>
  );
}
