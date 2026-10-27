export class HealthService {
    getHealthStatus() {
        return {
            status: "ok",
            service: "campus-ai-backend",
            timestamp: new Date().toISOString(),
            uptimeSeconds: Math.floor(process.uptime()),
        };
    }
}
export const healthService = new HealthService();
