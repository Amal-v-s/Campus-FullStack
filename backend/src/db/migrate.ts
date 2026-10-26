import { sequelize, testConnection } from "./connection.js";
import { migrator } from "./migrator.js";

async function runMigrations() {
  console.log("[db] Verifying database connection...");
  await testConnection();

  console.log("[db] Running pending migrations...");
  const executed = await migrator.up();

  if (executed.length === 0) {
    console.log("[db] No pending migrations. Database is up to date.");
  } else {
    console.log(
      `[db] Successfully executed ${executed.length} migration(s):`,
      executed.map((m) => m.name).join(", "),
    );
  }

  await sequelize.close();
}

runMigrations().catch(async (error) => {
  console.error("[db] Migration failed:", error);
  await sequelize.close();
  process.exit(1);
});
