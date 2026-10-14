import type { Request, Response } from "express";
import { healthService } from "../services/health.service.js";

export class HealthController {
  checkHealth(_req: Request, res: Response): void {
    const health = healthService.getHealthStatus();
    res.status(200).json(health);
  }
}

export const healthController = new HealthController();
