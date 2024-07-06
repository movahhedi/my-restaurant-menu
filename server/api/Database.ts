import { createPool } from "mysql2";
import { Generated, Kysely, MysqlDialect, PostgresDialect } from "kysely";

const dialect = new MysqlDialect({
	pool: createPool({
		database: "restaurant",
		host: "localhost",
		user: "root",
	}),
});

export const db = new Kysely<Database>({
	dialect,
});

interface Database {
	menu_category: IMenuCategoryTable;
	menu_item: IMenuItemTable;
}

interface IMenuCategoryTable {
	id: Generated<number>;
	title: string;
	slug: string;
}

interface IMenuItemTable {
	id: Generated<number>;
	name: string;
	price: string;
	memo: string;
}
