import { User } from "../../../users/interfaces/user.entity";

export interface Blog extends CreateBlog {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBlog {
  title: string;
  description?: string;
  creator: Partial<User>;
}
