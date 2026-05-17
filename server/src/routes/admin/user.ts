import { Hono } from "hono";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(["regular", "admin"]).default("regular")
});

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  role: z.enum(["regular", "admin"]).optional()
});

const users = new Map<string, { id: string; email: string; role: "regular" | "admin" }>();

export const userAdminRouter = new Hono()
  .get("/", (c) => {
    return c.json({ items: Array.from(users.values()) });
  })
  .post("/", async (c) => {
    const body = await c.req.json();
    const parsed = createUserSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.flatten() }, 400);
    }

    const id = crypto.randomUUID();
    const user = { id, ...parsed.data };
    users.set(id, user);

    return c.json({ item: user }, 201);
  })
  .patch("/:id", async (c) => {
    const id = c.req.param("id");
    if (!users.has(id)) {
      return c.json({ message: "Not found" }, 404);
    }

    const body = await c.req.json();
    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.flatten() }, 400);
    }

    const current = users.get(id)!;
    const updated = { ...current, ...parsed.data };
    users.set(id, updated);

    return c.json({ item: updated });
  })
  .delete("/:id", (c) => {
    const id = c.req.param("id");
    if (!users.has(id)) {
      return c.json({ message: "Not found" }, 404);
    }

    users.delete(id);
    return c.body(null, 204);
  });
