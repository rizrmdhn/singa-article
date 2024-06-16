import { Lucia, TimeSpan } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/server/db";
import { session, users } from "@/server/db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, session, users); // your adapter

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, "m"),
  sessionCookie: {
    expires: process.env.NODE_ENV === "production", // 30 days
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      name: attributes.name,
      email: attributes.email,
      avatarUrl: attributes.avatarUrl,
      isSignUser: attributes.isSignUser,
      provider: attributes.provider,
      role_id: attributes.role_id,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    UserId: number;
  }
}

interface DatabaseUserAttributes {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  isSignUser: boolean;
  provider: string;
  role_id: number;
}
