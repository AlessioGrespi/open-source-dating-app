import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: './src/lib/db/schema.ts',
	out: './drizzle',
	dialect: "postgresql",
	dbCredentials: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		ssl: false
	}
});


// # Database connection details
// db_config = {
//     'dbname': 'universityDB',
//     'user': 'postgres',
//     'password': 'Cookies1',
//     'host': 'localhost',
//     'port': '5432'
// }