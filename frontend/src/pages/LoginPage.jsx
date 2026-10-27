import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { BrandMark } from "../components/BrandMark";
function destination(role, mustChangePassword) {
    if (mustChangePassword)
        return "/change-password";
    if (role === "admin")
        return "/admin";
    return "/coming-soon";
}
export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [generalError, setGeneralError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    async function onSubmit(event) {
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
        if (hasError)
            return;
        setIsSubmitting(true);
        try {
            const { user } = await login(cleanEmail, password);
            navigate(destination(user.role, user.mustChangePassword), { replace: true });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Could not sign in.";
            if (message.toLowerCase().includes("user does not exist")) {
                setEmailError("User does not exist");
            }
            else if (message.toLowerCase().includes("password is wrong")) {
                setPasswordError("Password is wrong");
            }
            else if (message.toLowerCase().includes("valid email")) {
                setEmailError("Enter a valid email address.");
            }
            else {
                setGeneralError(message);
            }
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (_jsx("div", { className: "auth-screen", children: _jsxs("div", { className: "auth-card", children: [_jsx(BrandMark, {}), _jsx("h1", { className: "serif", children: "Sign in" }), _jsx("p", { className: "lede", children: "Use your campus email to open your workspace." }), _jsxs("form", { onSubmit: onSubmit, noValidate: true, children: [generalError ? (_jsx("p", { className: "form-error", role: "alert", children: generalError })) : null, _jsxs("div", { className: "field", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "username", placeholder: "e.g. admin@campus.local", value: email, disabled: isSubmitting, onChange: (e) => {
                                        setEmail(e.target.value);
                                        if (emailError)
                                            setEmailError(null);
                                    }, "aria-invalid": Boolean(emailError), "aria-describedby": emailError ? "email-error" : undefined }), emailError ? (_jsx("p", { className: "field-error", role: "alert", id: "email-error", children: emailError })) : null] }), _jsxs("div", { className: "field", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { id: "password", name: "password", type: "password", autoComplete: "current-password", value: password, disabled: isSubmitting, onChange: (e) => {
                                        setPassword(e.target.value);
                                        if (passwordError)
                                            setPasswordError(null);
                                    }, "aria-invalid": Boolean(passwordError), "aria-describedby": passwordError ? "password-error" : undefined }), passwordError ? (_jsx("p", { className: "field-error", role: "alert", id: "password-error", children: passwordError })) : null] }), _jsx("button", { className: "btn btn-primary", type: "submit", disabled: isSubmitting, children: isSubmitting ? "Signing in..." : "Continue" })] }), _jsxs("div", { className: "hint-box", children: ["Seeded accounts for testing:", _jsx("br", {}), _jsx("strong", { children: "admin@campus.local" }), " / campus123", _jsx("br", {}), _jsx("strong", { children: "faculty@campus.local" }), " / temp123 (must change password)", _jsx("br", {}), _jsx("strong", { children: "student@campus.local" }), " / temp123 (must change password)"] })] }) }));
}
