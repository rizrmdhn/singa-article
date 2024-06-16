import { loginSchema } from "@/schema/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { verify } from "@node-rs/argon2";
import type { NextRequest } from "next/server";
import { lucia } from "@/app/auth";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import responseFormatter from "@/lib/response_formatter";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    loginSchema.parse(body);
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, body.email),
  });

  if (!user) {
    return new Response(
      JSON.stringify(responseFormatter(404, "error", "User not found")),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const verifyPasswordResult = await verify(user.password!, body.password);

  if (!verifyPasswordResult) {
    return new Response(
      JSON.stringify(
        responseFormatter(400, "error", "Invalid user credentials"),
      ),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const session = await lucia.createSession(
    user.id,
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

  new Response(
    JSON.stringify(responseFormatter(200, "success", "User logged in")),
    {
      status: 302,
      headers: {
        Location: "/dashboard",
        "Set-Cookie": sessionCookie.serialize(),
      },
    },
  );

  redirect("/dashboard");
}
