import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  BlogResponse,
  BlogTitlesResponse,
  BlogsResponse,
} from '../interfaces/responses';
import { Blog, BlogToUpdateDTO } from '../interfaces/entities';
import { CreateBlog } from '../interfaces/entities/blog.entity';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  #blogsUrl = 'blogs';
  #http = inject(HttpClient);

  constructor() {}

  createBlog(newBlog: CreateBlog): Observable<boolean> {
    return this.#http
      .post<boolean>(`${this.#blogsUrl}`, newBlog)
      .pipe(map(() => true));
  }

  deleteBlog(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#blogsUrl}/${id}`);
  }

  getBlog(id: number): Observable<Blog> {
    return this.#http
      .get<BlogResponse>(`${this.#blogsUrl}/${id}`)
      .pipe(map((resp) => resp.blog));
  }

  getBlogsByUser(userId?: number): Observable<Blog[]> {
    if (userId) {
      return this.#http
        .get<BlogsResponse>(`${this.#blogsUrl}/${userId}/all`)
        .pipe(map((resp) => resp.blogs));
    } else {
      return this.#http
        .get<BlogsResponse>(`${this.#blogsUrl}/me/all`)
        .pipe(map((resp) => resp.blogs));
    }
  }

  getTitles(userId?: number): Observable<string[]> {
    return this.#http
      .get<BlogTitlesResponse>(`${this.#blogsUrl}/titles/${userId}`)
      .pipe(map((resp) => resp.blogTitles));
  }

  updateBlog(id: number, update: BlogToUpdateDTO): Observable<void> {
    return this.#http
      .patch<void>(`${this.#blogsUrl}/${id}`, update);
  }
}
