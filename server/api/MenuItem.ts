import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { menuCategories } from "./MenuData";
import { z } from "zod";

const menuHono = new Hono();

// const schema = z.object({
// 	name: z.string(),
// 	price: z.string(),
// 	memo: z.string().optional(),
// });

// const myMenuItem = {
// 	name: "Item 1",
// 	price: false,
// 	memo: "This is a memo",
// };

// const validated = schema.parse(myMenuItem);

// console.log(validated);

const menuCategorySchema = z.object({
	title: z.string(),
	slug: z.string(),
});

const menuItemSchema = z.object({
	name: z.string(),
	price: z.string(),
	memo: z.string().optional(),
});

menuHono.post("/create", async (c) => {
	const requestBody = await c.req.json();

	const validated = menuCategorySchema.safeParse(requestBody);

	if (!validated.success) {
		return c.json({ error: validated.error }, 400);
	}

	const { title, slug } = validated.data;

	menuCategories.push({
		title,
		slug,
		items: [],
	});

	console.log(menuCategories);

	return c.json({ success: true });
});

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
