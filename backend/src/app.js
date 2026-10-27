import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createCorsOptions } from "../cors.js";
import apiRouter from "./routes/index.js";
dotenv.config();
export function createApp() {
    const app = express();
    app.use(cors(createCorsOptions()));
    app.use(express.json());
    app.use(cookieParser());
    // Mount API router
    app.use("/api", apiRouter);
    return app;
}
