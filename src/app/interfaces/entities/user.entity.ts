import { Blog } from "./blog.entity";

export interface User extends UserRegister {
  id?: number;
  memberSince?: string;
  updatedAt?: string;
  blogs?: Blog[];
}

export interface UserRegister {
  username: string;
  email: string;
  password: string;
}
