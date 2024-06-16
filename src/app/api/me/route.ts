import { lucia } from "@/app/auth";
import { cookies } from "next/headers";
import responseFormatter from "@/lib/response_formatter";

export async function GET() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return new Response(
      JSON.stringify(responseFormatter(403, "error", "Unauthorized")),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (!session || !user) {
    return new Response(
      JSON.stringify(responseFormatter(403, "error", "Unauthorized")),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  return new Response(
    JSON.stringify(responseFormatter(200, "success", "User logged in", user)),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
