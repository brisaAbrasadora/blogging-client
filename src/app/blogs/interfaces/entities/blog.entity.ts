import { Entry } from "../../../entries/interfaces/entities";
import { User } from "../../../users/interfaces/user.entity";

export interface Blog extends CreateBlog {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  entries: Entry[];
}

export interface CreateBlog {
  title: string;
  description?: string;
  creator: Partial<User>;
}
