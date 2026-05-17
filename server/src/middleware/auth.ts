import type { Context, Next } from "hono";
import type { Role, SessionUser } from "../types";

const DEMO_ADMIN_EMAIL = "admin@example.com";

export const mockSession = async (c: Context, next: Next) => {
  const email = c.req.header("x-user-email") || "";
  const roleHeader = c.req.header("x-user-role") as Role | undefined;

  if (email) {
    const role: Role = roleHeader || (email === DEMO_ADMIN_EMAIL ? "admin" : "regular");
    const user: SessionUser = { id: "demo-user", email, role };
    c.set("user", user);
  }

  await next();
};

export const requireAuth = async (c: Context, next: Next) => {
  const user = c.get("user") as SessionUser | undefined;
  if (!user) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  await next();
};

export const requireRole = (roles: Role[]) => {
  return async (c: Context, next: Next) => {
    const user = c.get("user") as SessionUser | undefined;

    if (!user) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    if (!roles.includes(user.role)) {
      return c.json({ message: "Forbidden" }, 403);
    }

    await next();
  };
};
