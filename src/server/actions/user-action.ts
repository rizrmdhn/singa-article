"use server";

import { getUser } from "@/app/auth";
import responseFormatter from "@/lib/response_formatter";
import { fetchUserDetail } from "../queries";
import { verify, hash } from "@node-rs/argon2";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { actionClient } from "@/lib/safe-action";
import { updatePasswordSchema } from "@/schema/users";
import { revalidatePath } from "next/cache";

export const getAuthenticatedUser = async () => {
  const userCookie = await getUser();

  if (!userCookie) {
    return responseFormatter(401, "error", "Unauthorized");
  }

  const user = await fetchUserDetail(userCookie.id);

  return user;
};

export const updateUserPassword = actionClient
  .schema(updatePasswordSchema)
  .action(async ({ parsedInput: { currentPassword, newPassword } }) => {
    const userCookie = await getUser();

    if (!userCookie) {
      return responseFormatter(401, "error", "Unauthorized");
    }

    const user = await fetchUserDetail(userCookie.id);

    if (!user) {
      return responseFormatter(404, "error", "User not found");
    }

    const verifyPasswordResult = await verify(user.password!, currentPassword);

    if (!verifyPasswordResult) {
      return responseFormatter(400, "error", "Invalid password");
    }

    const hashedPassword = await hash(newPassword);

    const newUser = await db
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.id, user.id))
      .returning();

    revalidatePath("/dashboard/settings/password");
    return responseFormatter(
      200,
      "success",
      "User updated successfully",
      newUser,
    );
  });
