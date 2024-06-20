"use server";

import { getUser } from "@/app/auth";
import responseFormatter from "@/lib/response_formatter";
import { fetchUserDetail } from "../queries";

export const getAuthenticatedUser = async () => {
  const userCookie = await getUser();

  if (!userCookie) {
    return responseFormatter(401, "error", "Unauthorized");
  }

  const user = await fetchUserDetail(userCookie.id);

  return user;
};
