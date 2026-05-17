import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { healthRouter } from "./routes/health";
import { profileRouter } from "./routes/profile";
import { adminRouter } from "./routes/admin";
import { mockSession } from "./middleware/auth";

const app = new Hono();

app.use("*", logger());
app.use("*", cors({ origin: "*" }));
app.use("*", mockSession);

app.route("/api", healthRouter);
app.route("/api", profileRouter);
app.route("/api/admin", adminRouter);

app.get("/", (c) => c.text("Server is running"));

const port = Number(process.env.PORT || 3000);
console.log(`Server on :${port}`);

export default {
  port,
  fetch: app.fetch
};
