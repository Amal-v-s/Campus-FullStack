import { Router } from "express";
import authRouter from "./auth.route.js";
import healthRouter from "./health.route.js";
const apiRouter = Router();
apiRouter.use("/", healthRouter);
apiRouter.use("/auth", authRouter);
export default apiRouter;
