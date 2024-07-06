import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { menuCategories } from "./MenuData";
import { z } from "zod";
import "./Database";

import mysql from "mysql2/promise";
import { db } from "./Database";
import { zValidator } from "@hono/zod-validator";

// Create the connection to database
const connection = await mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "restaurant",
});

const menuHono = new Hono();

const menuItemSchema = z.object({
	name: z.string(),
	price: z.string(),
	memo: z.string().optional(),
});

menuHono.post(
	"/create",

	zValidator(
		"json",
		z.object({
			title: z.string(),
			slug: z.string(),
		})
	),

	async (c) => {
		const requestBody = c.req.valid("json");

		await db
			.insertInto("menu_category")
			.values({
				title: requestBody.title,
				slug: requestBody.slug,
			})
			.execute();

		return c.json({ success: true });
	}
);

menuHono.get("/:slug/view", async (c) => {
	const slug = c.req.param("slug");

	const category = menuCategories.find((cat) => cat.slug === slug);

	console.log("slug", slug, category);

	if (category === undefined) {
		return c.json({ error: "Category not found" }, 404);
	}

	return c.json(category);
});

menuHono.post("/:slug/add", async (c) => {
	const slug = c.req.param("slug");

	const category = menuCategories.find((cat) => cat.slug === slug);

	if (category === undefined) {
		return c.json({ error: "Category not found" }, 404);
	}

	const requestBody = await c.req.json();

	const validated = menuItemSchema.safeParse(requestBody);

	if (!validated.success) {
		return c.json({ error: validated.error }, 400);
	}

	const { name, price, memo } = validated.data;

	category.items.push({
		name,
		price,
		memo,
	});

	return c.json({ success: true });
});

export { menuHono };
