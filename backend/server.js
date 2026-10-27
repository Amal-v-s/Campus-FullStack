import { createApp } from "./src/app.js";

const app = createApp();
const port = Number(process.env.PORT) || 5000;

app.listen(port, () => {
  console.log(`[backend] Server listening on http://localhost:${port}`);
  console.log(`[backend] Health endpoint available at http://localhost:${port}/api/health`);
});
