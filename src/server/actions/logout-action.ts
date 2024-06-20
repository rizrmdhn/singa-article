"use server";

import { lucia } from "@/app/auth";
import responseFormatter from "@/lib/response_formatter";
import { cookies } from "next/headers";

export const logout = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) return responseFormatter(404, "error", "User not found");

  await lucia.invalidateSession(sessionId);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return responseFormatter(200, "success", "User logged out");
};
