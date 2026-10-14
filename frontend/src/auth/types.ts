export type Role = "admin" | "faculty" | "student";

export type SessionUser = {
  email: string;
  role: Role;
  mustChangePassword: boolean;
};
