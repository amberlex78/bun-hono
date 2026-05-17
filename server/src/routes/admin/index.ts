import { Hono } from "hono";
import { requireRole } from "../../middleware/auth";
import { userAdminRouter } from "./user";

export const adminRouter = new Hono();

adminRouter.use("*", requireRole(["admin"]));
adminRouter.get("/", (c) => c.json({ message: "Admin dashboard" }));
adminRouter.route("/user", userAdminRouter);
