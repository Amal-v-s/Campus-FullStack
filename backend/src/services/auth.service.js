import { User } from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export class AuthService {
    async login(rawEmail, rawPassword) {
        const email = (rawEmail || "").trim().toLowerCase();
        const password = rawPassword || "";
        if (!email || !password) {
            throw new Error("Enter your email and password.");
        }
        if (!EMAIL_RE.test(email)) {
            throw new Error("Enter a valid email address.");
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("User does not exist");
        }
        if (!user.is_active) {
            throw new Error("Account is inactive. Contact administrator.");
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error("Password is wrong");
        }
        const token = signToken({
            id: user.id,
            email: user.email,
            role: user.role,
            tokenVersion: user.token_version,
        });
        return {
            token,
            user: {
                email: user.email,
                role: user.role,
                mustChangePassword: user.must_change_password,
            },
        };
    }
    async changePassword(userId, currentPassword, newPassword) {
        if (!currentPassword) {
            throw new Error("Enter your current password.");
        }
        if (!newPassword) {
            throw new Error("Enter your new password.");
        }
        if (newPassword.length < 8) {
            throw new Error("New password must be at least 8 characters.");
        }
        if (currentPassword === newPassword) {
            throw new Error("New password must be different from the current one.");
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            throw new Error("Current password is wrong");
        }
        user.password_hash = await User.hashPassword(newPassword);
        user.must_change_password = false;
        user.token_version += 1;
        await user.save();
        const token = signToken({
            id: user.id,
            email: user.email,
            role: user.role,
            tokenVersion: user.token_version,
        });
        return {
            token,
            user: {
                email: user.email,
                role: user.role,
                mustChangePassword: false,
            },
        };
    }
    getUserSession(user) {
        return {
            email: user.email,
            role: user.role,
            mustChangePassword: user.must_change_password,
        };
    }
}
export const authService = new AuthService();
