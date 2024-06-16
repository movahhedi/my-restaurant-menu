import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { menuHono } from "./MenuItem";

const app = new Hono();

app.use(async (c, next) => {
	if (true) {
		await next();
	} else {
		return c.json({ error: "error" }, 400);
	}
});

app.route("/menu", menuHono);

app.post("/test", (c) => {
	return c.json({ test: "test" }, 404, {
		"Content-Type": "application/json",
	});
});

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

serve({
	fetch: app.fetch,
	port: 3000,
});

export default app;
