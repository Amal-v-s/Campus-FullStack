export async function loginApi(email, password) {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.error || `Sign in failed (${response.status})`);
    }
    return data;
}
export async function meApi() {
    try {
        const response = await fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
        });
        if (response.status === 401 || response.status === 403) {
            return null;
        }
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    }
    catch {
        return null;
    }
}
export async function changePasswordApi(currentPassword, newPassword) {
    const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.error || `Password change failed (${response.status})`);
    }
    return data;
}
export async function logoutApi() {
    await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
    }).catch(() => { });
}
