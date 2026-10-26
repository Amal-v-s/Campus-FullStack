import type { NextFunction, Request, Response } from "express";
import { User, type Role } from "../models/user.model.js";
import { AUTH_COOKIE_NAME, verifyToken } from "../utils/jwt.js";

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const cookieToken = req.cookies?.[AUTH_COOKIE_NAME];
  const authHeader = req.headers.authorization;
  const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;
  const token = cookieToken || headerToken;

  if (!token) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: "Invalid or expired session. Please sign in again." });
    return;
  }

  try {
    const user = await User.findByPk(payload.id);
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    if (!user.is_active) {
      res.status(403).json({ error: "Account is inactive" });
      return;
    }

    if (user.token_version !== payload.tokenVersion) {
      res.status(401).json({ error: "Session has expired. Please sign in again." });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("[auth middleware] Error verifying user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export function requireRole(allowedRoles: Role[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: "Forbidden: insufficient permissions" });
      return;
    }

    next();
  };
}
