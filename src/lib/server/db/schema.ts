import { pgTable, unique, uuid, text, varchar, foreignKey, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	firstname: text(),
	surname: text(),
	countryCode: varchar("country_code", { length: 255 }),
	phoneNumber: varchar("phone_number", { length: 255 }),
	email: text(),
},
(table) => {
	return {
		emailUnique: unique("email_unique").on(table.email),
	}
});

export const sessions = pgTable("sessions", {
	id: uuid().defaultRandom().notNull(),
	userId: uuid("user_id"),
	token: text(),
	expiry: timestamp({ mode: 'string' }),
},
(table) => {
	return {
		fkUser: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_user"
		}).onDelete("set null"),
	}
});

export const passwords = pgTable("passwords", {
	id: uuid().defaultRandom().notNull(),
	userId: uuid("user_id"),
	password: text(),
},
(table) => {
	return {
		fkUser: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_user"
		}).onDelete("set null"),
	}
});