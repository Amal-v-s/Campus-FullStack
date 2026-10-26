import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  authController.login(req, res);
});

authRouter.post("/logout", (req, res) => {
  authController.logout(req, res);
});

authRouter.get("/me", requireAuth, (req, res) => {
  authController.me(req, res);
});

authRouter.post("/change-password", requireAuth, (req, res) => {
  authController.changePassword(req, res);
});

export default authRouter;
