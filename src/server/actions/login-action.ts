"use server";

import { verify } from "@node-rs/argon2";
import { lucia } from "@/app/auth";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "@/schema/auth";
import responseFormatter from "@/lib/response_formatter";
import { fetchUserByEmail, fetchUserRole } from "../queries";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const user = await fetchUserByEmail(email);

    if (!user) {
      return responseFormatter(400, "error", "Invalid user credentials");
    }

    const userRole = await fetchUserRole(user.id);

    if (userRole?.role?.name !== "admin") {
      return responseFormatter(400, "error", "Unauthorized user is not admin");
    }

    const verifyPasswordResult = await verify(user.password!, password);

    if (!verifyPasswordResult) {
      return responseFormatter(400, "error", "Invalid user credentials");
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

    return responseFormatter(200, "success", "Login success");
  });
