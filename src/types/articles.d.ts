import type { User } from "./user";

export type Article = {
  id: number;
  title: string;
  created_at: string | null;
  updated_at: string | null;
  description: string;
  image_url: string;
  created_by: number | null;
  user: {
    id: number;
    name: string | null;
    // ... 8 more properties
    updated_at: string | null;
  } | null;
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
