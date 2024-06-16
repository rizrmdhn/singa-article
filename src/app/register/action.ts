"use server";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
// import { hash } from "bcrypt";
import { nanoid } from "nanoid";
import { lucia } from "../auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { scrypt, randomBytes } from "crypto";
import { kdf, verify } from "scrypt-kdf";

interface ActionResult {
  error: string;
}

async function hashPassword(password: string) {
  const hashedPassword = await kdf(password, { logN: 14, r: 8, p: 1 });
  return hashedPassword.toString("base64");
}

async function verifyPassword(password: string, hashedPassword: string) {
  const hashedBuffer = Buffer.from(hashedPassword, "base64");
  const isValid = await verify(hashedBuffer, password);
  return isValid;
}

async function register(formData: FormData): Promise<ActionResult> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return {
      error: "All fields are required",
    };
  }

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }

  const userId = `user_${nanoid(16)}`;
  const hashedPassword = await hashPassword(password);

  await db.insert(users).values({
    id: userId,
    username,
    password: hashedPassword,
  });

  const session = await lucia.createSession(
    userId,
    {},
    {
      sessionId: `session_${nanoid(16)}`,
    },
  );
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}

export { register };
