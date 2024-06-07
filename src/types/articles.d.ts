import { User } from "./user";

export type Article = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type DetailArticle = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
  user: Exclude<User, "static", "conversation">;
};
