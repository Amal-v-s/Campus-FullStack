import type { Role } from "../models/user.model.js";

export interface AuthTokenPayload {
  id: number;
  email: string;
  role: Role;
  tokenVersion: number;
}

export interface UserResponse {
  email: string;
  role: Role;
  mustChangePassword: boolean;
}
