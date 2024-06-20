"use server";

import { getUser } from "@/app/auth";
import responseFormatter from "@/lib/response_formatter";
import { fetchUserDetail } from "../queries";
import { verify, hash } from "@node-rs/argon2";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const getAuthenticatedUser = async () => {
  const userCookie = await getUser();

  if (!userCookie) {
    return responseFormatter(401, "error", "Unauthorized");
  }

  const user = await fetchUserDetail(userCookie.id);

  return user;
};

export const updateUserPassword = async (password: string) => {
  const userCookie = await getUser();

  if (!userCookie) {
    return responseFormatter(401, "error", "Unauthorized");
  }

  const user = await fetchUserDetail(userCookie.id);

  if (!user) {
    return responseFormatter(404, "error", "User not found");
  }

  const verifyPasswordResult = await verify(user.password!, password);

  if (!verifyPasswordResult) {
    return responseFormatter(400, "error", "Invalid user credentials");
  }

  const hashedPassword = await hash(password);

  const newUser = await db
    .update(users)
    .set({
      password: hashedPassword,
    })
    .where(eq(users.id, user.id))
    .returning();

  return responseFormatter(
    200,
    "success",
    "User updated successfully",
    newUser,
  );
};
