import { useEffect, useState } from "react";
import { fetchHealth, type HealthResponse } from "../api/health";

export function useHealth() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    fetchHealth()
      .then((data) => {
        if (mounted) {
          setHealth(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Health check failed");
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { health, error, loading };
}
