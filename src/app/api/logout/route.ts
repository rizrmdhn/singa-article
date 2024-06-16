import { lucia } from "@/app/auth";
import { cookies } from "next/headers";
import responseFormatter from "@/lib/response_formatter";
import { redirect } from "next/navigation";

export async function POST() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId)
    return new Response(
      JSON.stringify(responseFormatter(404, "error", "User not found")),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

  await lucia.invalidateSession(sessionId);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  new Response(
    JSON.stringify(responseFormatter(200, "success", "User logged out")),
    {
      status: 200,
      headers: {
        Location: "/login",
        "Content-Type": "application/json",
      },
    },
  );

  redirect("/login");
}
