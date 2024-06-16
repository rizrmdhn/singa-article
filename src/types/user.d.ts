import { Role } from "./role";

export type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl: null;
  isSignUser: boolean;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  static: Conversation;
  conversation: Conversation;
};

export type Conversation = {
  used: number;
  quota: number;
};
