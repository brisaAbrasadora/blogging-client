import { User } from "./user.entity";

export interface Blog {
  id?: number;
  title: string;
  creator: User;
}
