import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { type Express } from "express";
import apiRouter from "./routes/index.js";

dotenv.config();

export function createApp(): Express {
  const app = express();

  const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(cookieParser());

  // Mount API router
  app.use("/api", apiRouter);

  return app;
}
