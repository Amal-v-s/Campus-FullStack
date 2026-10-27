import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { BrandMark } from "../components/BrandMark";
export function ChangePasswordPage() {
    const { user, changePassword } = useAuth();
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState(null);
    const [newPasswordError, setNewPasswordError] = useState(null);
    const [generalError, setGeneralError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    async function onSubmit(event) {
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
        }
        else if (newPassword.length < 8) {
            setNewPasswordError("New password must be at least 8 characters.");
            hasError = true;
        }
        else if (currentPassword === newPassword) {
            setNewPasswordError("New password must be different from the current one.");
            hasError = true;
        }
        if (hasError)
            return;
        setIsSubmitting(true);
        try {
            await changePassword(currentPassword, newPassword);
            navigate(user?.role === "admin" ? "/admin" : "/coming-soon", {
                replace: true,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Could not update password.";
            if (message.toLowerCase().includes("current password is wrong")) {
                setCurrentPasswordError("Current password is wrong");
            }
            else if (message.toLowerCase().includes("different from the current")) {
                setNewPasswordError(message);
            }
            else if (message.toLowerCase().includes("8 characters")) {
                setNewPasswordError(message);
            }
            else {
                setGeneralError(message);
            }
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (_jsx("div", { className: "auth-screen", children: _jsxs("div", { className: "auth-card", children: [_jsx(BrandMark, {}), _jsx("h1", { className: "serif", children: "Set a new password" }), _jsx("p", { className: "lede", children: "First sign-in for faculty and students requires a new password before the workspace opens." }), _jsxs("form", { onSubmit: onSubmit, noValidate: true, children: [generalError ? (_jsx("p", { className: "form-error", role: "alert", children: generalError })) : null, _jsxs("div", { className: "field", children: [_jsx("label", { htmlFor: "currentPassword", children: "Current password" }), _jsx("input", { id: "currentPassword", name: "currentPassword", type: "password", autoComplete: "current-password", value: currentPassword, disabled: isSubmitting, onChange: (e) => {
                                        setCurrentPassword(e.target.value);
                                        if (currentPasswordError)
                                            setCurrentPasswordError(null);
                                    }, "aria-invalid": Boolean(currentPasswordError), "aria-describedby": currentPasswordError ? "current-password-error" : undefined }), currentPasswordError ? (_jsx("p", { className: "field-error", role: "alert", id: "current-password-error", children: currentPasswordError })) : null] }), _jsxs("div", { className: "field", children: [_jsx("label", { htmlFor: "newPassword", children: "New password" }), _jsx("input", { id: "newPassword", name: "newPassword", type: "password", autoComplete: "new-password", value: newPassword, disabled: isSubmitting, onChange: (e) => {
                                        setNewPassword(e.target.value);
                                        if (newPasswordError)
                                            setNewPasswordError(null);
                                    }, "aria-invalid": Boolean(newPasswordError), "aria-describedby": newPasswordError ? "new-password-error" : undefined }), newPasswordError ? (_jsx("p", { className: "field-error", role: "alert", id: "new-password-error", children: newPasswordError })) : null] }), _jsx("button", { className: "btn btn-primary", type: "submit", disabled: isSubmitting, children: isSubmitting ? "Saving..." : "Save password" })] })] }) }));
}
