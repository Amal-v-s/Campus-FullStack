import { authService } from "../services/auth.service.js";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS, CLEAR_AUTH_COOKIE_OPTIONS, } from "../utils/jwt.js";
export class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body || {};
            const { token, user } = await authService.login(email, password);
            res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
            res.status(200).json({ user });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Authentication failed";
            const lower = message.toLowerCase();
            let statusCode = 400;
            if (lower.includes("user does not exist") || lower.includes("password is wrong")) {
                statusCode = 401;
            }
            else if (lower.includes("inactive")) {
                statusCode = 403;
            }
            res.status(statusCode).json({ error: message });
        }
    }
    async changePassword(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: "Not authenticated" });
                return;
            }
            const { currentPassword, newPassword } = req.body || {};
            const { token, user } = await authService.changePassword(req.user.id, currentPassword, newPassword);
            res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
            res.status(200).json({
                message: "Password updated successfully",
                user,
            });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Password update failed";
            res.status(400).json({ error: message });
        }
    }
    me(req, res) {
        if (!req.user) {
            res.status(401).json({ error: "Not authenticated" });
            return;
        }
        const user = authService.getUserSession(req.user);
        res.status(200).json({ user });
    }
    logout(_req, res) {
        res.clearCookie(AUTH_COOKIE_NAME, CLEAR_AUTH_COOKIE_OPTIONS);
        res.status(200).json({ message: "Logged out successfully" });
    }
}
export const authController = new AuthController();
