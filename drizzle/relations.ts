import { relations } from "drizzle-orm/relations";
import { users, sessions, passwords } from "./schema";

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	sessions: many(sessions),
	passwords: many(passwords),
}));

export const passwordsRelations = relations(passwords, ({one}) => ({
	user: one(users, {
		fields: [passwords.userId],
		references: [users.id]
	}),
}));