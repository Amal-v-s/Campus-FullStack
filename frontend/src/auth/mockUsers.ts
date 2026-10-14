import type { Role } from "./types";

export type MockUser = {
  email: string;
  password: string;
  role: Role;
  mustChangePassword: boolean;
};

export const MOCK_USERS: MockUser[] = [
  {
    email: "admin@campus.local",
    password: "campus123",
    role: "admin",
    mustChangePassword: false,
  },
  {
    email: "faculty@campus.local",
    password: "temp123",
    role: "faculty",
    mustChangePassword: true,
  },
  {
    email: "student@campus.local",
    password: "temp123",
    role: "student",
    mustChangePassword: true,
  },
];
