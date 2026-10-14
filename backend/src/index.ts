import { createApp } from "./app.js";

const app = createApp();
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`[backend] Server listening on http://localhost:${PORT}`);
  console.log(`[backend] Health endpoint available at http://localhost:${PORT}/api/health`);
});
