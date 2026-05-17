import { Hono } from "hono";
import { requireAuth } from "../middleware/auth";
import type { SessionUser } from "../types";

export const profileRouter = new Hono();

profileRouter.get("/profile", requireAuth, (c) => {
  const user = c.get("user") as SessionUser;
  return c.json({ user });
});
