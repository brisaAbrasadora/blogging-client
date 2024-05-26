import { Blog } from "../../../blogs/interfaces/entities";

export interface Entry extends CreateEntry {
  id?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateEntry {
  title: string;
  body?: string;
  origin: Partial<Blog>;
}
