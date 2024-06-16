import { relations } from "drizzle-orm/relations";
import {
  users,
  authentications,
  articles,
  roles,
  role_permissons,
  permissions,
  auth_access_tokens,
  conversation_transcripts,
  conversation_nodes,
  static_translations,
  static_transcripts,
  conversation_translations,
  session,
} from "./schema";

export const authenticationsRelations = relations(
  authentications,
  ({ one }) => ({
    user: one(users, {
      fields: [authentications.user_id],
      references: [users.id],
    }),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  authentications: many(authentications),
  articles: many(articles),
  auth_access_tokens: many(auth_access_tokens),
  conversation_transcripts: many(conversation_transcripts),
  static_translations: many(static_translations),
  static_transcripts: many(static_transcripts),
  conversation_translations: many(conversation_translations),
  conversation_nodes: many(conversation_nodes),
  session: many(session),
}));

export const articlesRelations = relations(articles, ({ one }) => ({
  user: one(users, {
    fields: [articles.created_by],
    references: [users.id],
  }),
}));

export const role_permissonsRelations = relations(
  role_permissons,
  ({ one }) => ({
    role: one(roles, {
      fields: [role_permissons.role_id],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [role_permissons.permission_id],
      references: [permissions.id],
    }),
  }),
);

export const rolesRelations = relations(roles, ({ many }) => ({
  role_permissons: many(role_permissons),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  role_permissons: many(role_permissons),
}));

export const auth_access_tokensRelations = relations(
  auth_access_tokens,
  ({ one }) => ({
    user: one(users, {
      fields: [auth_access_tokens.tokenable_id],
      references: [users.id],
    }),
  }),
);

export const conversation_transcriptsRelations = relations(
  conversation_transcripts,
  ({ one }) => ({
    user: one(users, {
      fields: [conversation_transcripts.user_id],
      references: [users.id],
    }),
    conversation_node: one(conversation_nodes, {
      fields: [conversation_transcripts.conversation_node_id],
      references: [conversation_nodes.id],
    }),
  }),
);

export const conversation_nodesRelations = relations(
  conversation_nodes,
  ({ one, many }) => ({
    conversation_transcripts: many(conversation_transcripts),
    conversation_translation: one(conversation_translations, {
      fields: [conversation_nodes.conversation_translation_id],
      references: [conversation_translations.id],
    }),
    user: one(users, {
      fields: [conversation_nodes.user_id],
      references: [users.id],
    }),
  }),
);

export const static_translationsRelations = relations(
  static_translations,
  ({ one, many }) => ({
    user: one(users, {
      fields: [static_translations.user_id],
      references: [users.id],
    }),
    static_transcripts: many(static_transcripts),
  }),
);

export const static_transcriptsRelations = relations(
  static_transcripts,
  ({ one }) => ({
    static_translation: one(static_translations, {
      fields: [static_transcripts.static_translation_id],
      references: [static_translations.id],
    }),
    user: one(users, {
      fields: [static_transcripts.user_id],
      references: [users.id],
    }),
  }),
);

export const conversation_translationsRelations = relations(
  conversation_translations,
  ({ one, many }) => ({
    user: one(users, {
      fields: [conversation_translations.user_id],
      references: [users.id],
    }),
    conversation_nodes: many(conversation_nodes),
  }),
);

export const sessionsRelations = relations(session, ({ one }) => ({
  user: one(users, {
    fields: [session.user_id],
    references: [users.id],
  }),
}));
