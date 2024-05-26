import { Blog } from "../../blogs/interfaces/entities";

export interface User extends UserRegister {
  id?: number;
  memberSince?: string;
  updatedAt?: string;
  blogs?: Blog[];
}

export interface UserRegister {
  username: string;
  email: string;
  password?: string;
}
