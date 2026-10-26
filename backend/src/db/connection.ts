import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const dbHost = process.env.DB_HOST || "127.0.0.1";
const dbPort = Number(process.env.DB_PORT) || 3306;
const dbName = process.env.DB_NAME || "campus_ai";
const dbUser = process.env.DB_USER || "campus_user";
const dbPassword = process.env.DB_PASSWORD || "campus_password";

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
  logging: process.env.NODE_ENV === "development" ? false : false,
  define: {
    underscored: true,
    timestamps: true,
  },
});

export async function testConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("[db] Database connection has been established successfully.");
  } catch (error) {
    console.error("[db] Unable to connect to the database:", error);
    throw error;
  }
}
