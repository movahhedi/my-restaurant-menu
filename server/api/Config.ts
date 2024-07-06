import Dotenv from "dotenv";

Dotenv.config();

export const config = {
	port: Number(process.env.PORT || 3000),
	db: {
		host: process.env.DB_HOST || "localhost",
		name: process.env.DB_NAME,
		user: process.env.DB_USER,
		pass: process.env.DB_PASS || "",
	},
};
