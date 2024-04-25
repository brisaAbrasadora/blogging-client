import { User } from "../../users/interfaces/user.entity";

export interface Blog {
  id?: number;
  title: string;
  creator: User;
}
