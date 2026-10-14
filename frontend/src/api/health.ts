export type HealthResponse = {
  status: "ok";
  service: string;
  timestamp: string;
  uptimeSeconds: number;
};

export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch("/api/health");
  if (!response.ok) {
    throw new Error(`Health check failed with HTTP ${response.status}`);
  }
  return response.json();
}
