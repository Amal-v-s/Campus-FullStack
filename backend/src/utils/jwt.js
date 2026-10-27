import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-campus-ai-jwt-key-change-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const AUTH_COOKIE_NAME = "token";
const isProduction = process.env.NODE_ENV === "production";
export const AUTH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
};
export const CLEAR_AUTH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
};
export function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
}
export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    catch {
        return null;
    }
}
