export function createCorsOptions() {
  const allowedOrigins = (
    process.env.CLIENT_ORIGINS ||
    process.env.CLIENT_ORIGIN ||
    "http://localhost:5173"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return {
    origin: (origin, callback) => {
      // Requests without an Origin header do not need CORS headers. Browser
      // origins must exactly match one of the configured frontend origins.
      callback(null, Boolean(origin && allowedOrigins.includes(origin)));
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
    optionsSuccessStatus: 204,
  };
}
