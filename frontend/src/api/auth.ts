import type { SessionUser } from "../auth/types";

export type AuthResponse = {
  user: SessionUser;
};

export type MessageResponse = {
  message: string;
  user?: SessionUser;
};

export async function loginApi(email: string, password: string): Promise<AuthResponse> {
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

  return data as AuthResponse;
}

export async function meApi(): Promise<AuthResponse | null> {
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
    return data as AuthResponse;
  } catch {
    return null;
  }
}

export async function changePasswordApi(
  currentPassword: string,
  newPassword: string,
): Promise<AuthResponse> {
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

  return data as AuthResponse;
}

export async function logoutApi(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  }).catch(() => {});
}
