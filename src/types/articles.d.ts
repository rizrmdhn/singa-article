import type { User } from "./user";

export type Article = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  updatedAt: string;
};

export type DetailArticle = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};
