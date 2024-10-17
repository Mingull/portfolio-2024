import { mysqlTable, text, int, timestamp, boolean } from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("emailVerified").notNull(),
	image: text("image"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
	role: text("role"),
	banned: boolean("banned"),
	banReason: text("banReason"),
	banExpires: int("banExpires"),
});

export const session = mysqlTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expiresAt").notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	impersonatedBy: text("impersonatedBy").references(() => user.id),
	activeOrganizationId: text("activeOrganizationId"),
});

export const account = mysqlTable("account", {
	id: text("id").primaryKey(),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	expiresAt: timestamp("expiresAt"),
	password: text("password"),
});

export const verification = mysqlTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
});

export const organization = mysqlTable("organization", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	slug: text("slug").unique(),
	logo: text("logo"),
	createdAt: timestamp("createdAt").notNull(),
	metadata: text("metadata"),
});

export const member = mysqlTable("member", {
	id: text("id").primaryKey(),
	organizationId: text("organizationId")
		.notNull()
		.references(() => organization.id),
	userId: text("userId").notNull(),
	email: text("email").notNull(),
	role: text("role").notNull(),
	createdAt: timestamp("createdAt").notNull(),
});

export const invitation = mysqlTable("invitation", {
	id: text("id").primaryKey(),
	organizationId: text("organizationId")
		.notNull()
		.references(() => organization.id),
	email: text("email").notNull(),
	role: text("role"),
	status: text("status").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
	inviterId: text("inviterId")
		.notNull()
		.references(() => user.id),
});
