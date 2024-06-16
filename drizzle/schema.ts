import { pgTable, index, foreignKey, serial, integer, text, timestamp, varchar, unique, boolean, time, bigint } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const authentications = pgTable("authentications", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" } ),
	token: text("token").notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		user_id_idx: index().on(table.user_id),
		token_idx: index().on(table.token),
	}
});

export const articles = pgTable("articles", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	image_url: varchar("image_url", { length: 255 }).notNull(),
	created_by: integer("created_by").references(() => users.id, { onDelete: "cascade" } ),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		id_idx: index().on(table.id),
		created_by_idx: index().on(table.created_by),
	}
});

export const roles = pgTable("roles", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		id_idx: index().on(table.id),
		name_idx: index().on(table.name),
	}
});

export const role_permissons = pgTable("role_permissons", {
	id: serial("id").primaryKey().notNull(),
	role_id: integer("role_id").references(() => roles.id, { onDelete: "cascade" } ),
	permission_id: integer("permission_id").references(() => permissions.id, { onDelete: "cascade" } ),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		id_idx: index().on(table.id),
		role_id_idx: index().on(table.role_id),
		permission_id_idx: index().on(table.permission_id),
	}
});

export const permissions = pgTable("permissions", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		id_idx: index().on(table.id),
		name_idx: index().on(table.name),
	}
});

export const adonis_schema = pgTable("adonis_schema", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	batch: integer("batch").notNull(),
	migration_time: timestamp("migration_time", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const adonis_schema_versions = pgTable("adonis_schema_versions", {
	version: integer("version").primaryKey().notNull(),
});

export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 254 }),
	password: varchar("password", { length: 255 }),
	avatar: varchar("avatar", { length: 255 }),
	avatar_url: varchar("avatar_url", { length: 255 }),
	is_sign_user: boolean("is_sign_user").default(false),
	provider: text("provider"),
	role_id: integer("role_id"),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		id_idx: index().on(table.id),
		users_email_unique: unique("users_email_unique").on(table.email),
	}
});

export const auth_access_tokens = pgTable("auth_access_tokens", {
	id: serial("id").primaryKey().notNull(),
	tokenable_id: integer("tokenable_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	type: varchar("type", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }),
	hash: varchar("hash", { length: 255 }).notNull(),
	abilities: text("abilities").notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	last_used_at: timestamp("last_used_at", { withTimezone: true, mode: 'string' }),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }),
});

export const conversation_transcripts = pgTable("conversation_transcripts", {
	id: serial("id").primaryKey().notNull(),
	conversation_node_id: integer("conversation_node_id").references(() => conversation_nodes.id, { onDelete: "cascade" } ),
	user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" } ),
	timestamp: time("timestamp").default('00:00:00').notNull(),
	text: text("text").notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		id_idx: index().on(table.id),
		conversation_node_id_idx: index().on(table.conversation_node_id),
		user_id_idx: index().on(table.user_id),
	}
});

export const static_translations = pgTable("static_translations", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" } ),
	title: varchar("title", { length: 255 }).notNull(),
	video: varchar("video", { length: 255 }),
	video_url: varchar("video_url", { length: 255 }).notNull(),
	status: text("status").default('pending'),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		id_idx: index().on(table.id),
		user_id_idx: index().on(table.user_id),
	}
});

export const static_transcripts = pgTable("static_transcripts", {
	id: serial("id").primaryKey().notNull(),
	static_translation_id: integer("static_translation_id").references(() => static_translations.id, { onDelete: "cascade" } ),
	user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" } ),
	timestamp: time("timestamp").default('00:00:00').notNull(),
	text: text("text").notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		id_idx: index().on(table.id),
		static_translation_id_idx: index().on(table.static_translation_id),
		user_id_idx: index().on(table.user_id),
	}
});

export const conversation_translations = pgTable("conversation_translations", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" } ),
	title: varchar("title", { length: 255 }).notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		id_idx: index().on(table.id),
		user_id_idx: index().on(table.user_id),
	}
});

export const conversation_nodes = pgTable("conversation_nodes", {
	id: serial("id").primaryKey().notNull(),
	conversation_translation_id: integer("conversation_translation_id").references(() => conversation_translations.id, { onDelete: "cascade" } ),
	user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" } ),
	video: varchar("video", { length: 255 }),
	video_url: varchar("video_url", { length: 255 }),
	status: text("status").default('pending'),
	type: text("type").default('speech'),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		id_idx: index().on(table.id),
		conversation_translation_id_idx: index().on(table.conversation_translation_id),
		user_id_idx: index().on(table.user_id),
	}
});

export const test_queues = pgTable("test_queues", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	status: varchar("status", { length: 255 }),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		id_idx: index().on(table.id),
		name_idx: index().on(table.name),
		status_idx: index().on(table.status),
	}
});

export const rate_limits = pgTable("rate_limits", {
	key: varchar("key", { length: 255 }).primaryKey().notNull(),
	points: integer("points").default(0).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	expire: bigint("expire", { mode: "number" }),
});

export const sessions = pgTable("sessions", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" } ),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		id_idx: index().on(table.id),
		user_id_idx: index().on(table.user_id),
	}
});