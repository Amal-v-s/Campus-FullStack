import { healthService } from "../services/health.service.js";
export class HealthController {
    checkHealth(_req, res) {
        const health = healthService.getHealthStatus();
        res.status(200).json(health);
    }
}
export const healthController = new HealthController();
