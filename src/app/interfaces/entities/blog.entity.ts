import { User } from "../../users/interfaces/user.entity";

export interface Blog {
  id?: number;
  title: string;
  description?: string;
  createdAt: Date;
  creator: User;
}
