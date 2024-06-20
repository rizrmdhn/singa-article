import type { Role } from "./role";

export type User = {
  id: number;
  name: string;
  email: string;
  avatar_url: null;
  isSignUser: boolean;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  role: Role;
  static: Conversation;
  conversation: Conversation;
};

export type Conversation = {
  used: number;
  quota: number;
};
