import { boolean, int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
	id: varchar("id", { length: 255 }).primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("emailVerified").notNull(),
	image: text("image"),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow(),
	role: text("role"),
	banned: boolean("banned"),
	banReason: text("banReason"),
	banExpires: int("banExpires"),
});

export const session = mysqlTable("session", {
	id: varchar("id", { length: 255 }).primaryKey(),
	expiresAt: timestamp("expiresAt").notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: varchar("userId", { length: 255 })
		.notNull()
		.references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
	impersonatedBy: varchar("impersonatedBy", { length: 255 }).references(() => user.id, {
		onDelete: "cascade",
		onUpdate: "cascade",
	}),
});

export const account = mysqlTable("account", {
	id: varchar("id", { length: 255 }).primaryKey(),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	userId: varchar("userId", { length: 255 })
		.notNull()
		.references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	expiresAt: timestamp("expiresAt"),
	password: text("password"),
});

export const verification = mysqlTable("verification", {
	id: varchar("id", { length: 255 }).primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
});

export const organization = mysqlTable("organization", {
	id: varchar("id", { length: 255 }).primaryKey(),
	name: text("name").notNull(),
	slug: text("slug").unique(),
	logo: text("logo"),
	createdAt: timestamp("createdAt").notNull(),
	metadata: text("metadata"),
});

export const member = mysqlTable("member", {
	id: varchar("id", { length: 255 }).primaryKey(),
	organizationId: varchar("organizationId", { length: 255 })
		.notNull()
		.references(() => organization.id, { onDelete: "cascade", onUpdate: "cascade" }),
	userId: text("userId").notNull(),
	email: text("email").notNull(),
	role: text("role").notNull(),
	createdAt: timestamp("createdAt").notNull(),
});

export const invitation = mysqlTable("invitation", {
	id: varchar("id", { length: 255 }).primaryKey(),
	organizationId: varchar("organizationId", { length: 255 })
		.notNull()
		.references(() => organization.id, { onDelete: "cascade", onUpdate: "cascade" }),
	email: text("email").notNull(),
	role: text("role"),
	status: text("status").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
	inviterId: varchar("inviterId", { length: 255 })
		.notNull()
		.references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
