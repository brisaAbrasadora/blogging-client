import { Blog } from "./blog.entity";

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  memberSince: string;
  updatedAt: string;
  blogs?: Blog[];
}
