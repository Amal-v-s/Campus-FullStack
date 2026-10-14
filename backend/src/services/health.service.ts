export type HealthStatus = {
  status: "ok";
  service: string;
  timestamp: string;
  uptimeSeconds: number;
};

export class HealthService {
  getHealthStatus(): HealthStatus {
    return {
      status: "ok",
      service: "campus-ai-backend",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    };
  }
}

export const healthService = new HealthService();
