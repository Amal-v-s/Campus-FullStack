import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { sequelize, testConnection } from "./connection.js";
dotenv.config();
const DEMO_USERS = [
    {
        email: "faculty@campus.local",
        password: "temp123",
        role: "faculty",
        must_change_password: true,
    },
    {
        email: "student@campus.local",
        password: "temp123",
        role: "student",
        must_change_password: true,
    },
];
async function seedDemoUsers() {
    console.log("[seed-demo] Verifying database connection...");
    await testConnection();
    for (const demo of DEMO_USERS) {
        const existing = await User.findOne({ where: { email: demo.email } });
        const passwordHash = await User.hashPassword(demo.password);
        if (existing) {
            existing.password_hash = passwordHash;
            existing.role = demo.role;
            existing.must_change_password = demo.must_change_password;
            existing.is_active = true;
            await existing.save();
            console.log(`[seed-demo] Updated demo user: ${demo.email}`);
        }
        else {
            await User.create({
                email: demo.email,
                password_hash: passwordHash,
                role: demo.role,
                must_change_password: demo.must_change_password,
                is_active: true,
                token_version: 1,
            });
            console.log(`[seed-demo] Created demo user: ${demo.email}`);
        }
    }
    await sequelize.close();
}
seedDemoUsers().catch(async (error) => {
    console.error("[seed-demo] Failed:", error);
    await sequelize.close();
    process.exit(1);
});
