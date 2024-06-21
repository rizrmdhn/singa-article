import "server-only";

import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "@/server/db/schema";

export const fetchListOfUsers = async () => {
  const users = await db.query.users.findMany();

  return users;
};

export const fetchListOfArticles = async () => {
  const articles = await db.query.articles.findMany();

  return articles;
};

export const fetchUserDetail = async (userId: number) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      role: true,
    },
  });

  return user;
};

export const fetchUserRole = async (userId: number) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      role: true,
    },
  });

  return user;
};

export const fetchUserByEmail = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
};

export const fetchArticles = async () => {
  const articles = await db.query.articles.findMany({
    orderBy: (articles, { desc }) => desc(articles.created_at),
    with: {
      user: true,
    },
  });

  return articles;
};

export const fetchArticleById = async (id: number) => {
  const article = await db.query.articles.findFirst({
    where: eq(users.id, id),
    with: {
      user: true,
    },
  });

  return article;
};
