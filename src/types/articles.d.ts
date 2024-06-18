import type { User } from "./user";

export type Article = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type DetailArticle = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  create_by: number;
  created_at: Date;
  updated_at: Date;
  user: User;
};
