import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { sequelize, testConnection } from "./connection.js";

dotenv.config();

async function seedAdmin() {
  console.log("[seed] Verifying database connection...");
  await testConnection();

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@campus.local").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "campus123";

  console.log(`[seed] Seeding admin user (${adminEmail})...`);

  const existing = await User.findOne({ where: { email: adminEmail } });

  if (existing) {
    const passwordMatch = await existing.comparePassword(adminPassword);
    if (!passwordMatch) {
      existing.password_hash = await User.hashPassword(adminPassword);
    }
    existing.role = "admin";
    existing.must_change_password = false;
    existing.is_active = true;
    await existing.save();
    console.log(`[seed] Admin user already exists (id: ${existing.id}). Idempotently updated.`);
  } else {
    const passwordHash = await User.hashPassword(adminPassword);
    const created = await User.create({
      email: adminEmail,
      password_hash: passwordHash,
      role: "admin",
      must_change_password: false,
      is_active: true,
      token_version: 1,
    });
    console.log(`[seed] Admin user successfully created (id: ${created.id}).`);
  }

  console.log("[seed] Phase 2 constraint verified: No faculty or student rows seeded.");
  await sequelize.close();
}

seedAdmin().catch(async (error) => {
  console.error("[seed] Seed failed:", error);
  await sequelize.close();
  process.exit(1);
});
