import { Hono } from "hono";
import { requireAuth } from "../middleware/auth";
import type { AppBindings } from "../types";

export const profileRouter = new Hono<AppBindings>();

profileRouter.get("/profile", requireAuth, (c) => {
  const user = c.get("user");
  return c.json({ user });
});
