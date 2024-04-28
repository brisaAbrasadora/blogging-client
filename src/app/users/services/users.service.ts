import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  EmailResponse,
  UserResponse,
  UsernameResponse,
  UsersResponse,
} from '../interfaces/responses';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.entity';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  #usersUrl = 'users';
  #http = inject(HttpClient);

  constructor() {}

  getUser(id?: number): Observable<User> {
    if (id) {
      return this.#http.get<UserResponse>(`${this.#usersUrl}/${id}`).pipe(
        map((resp: UserResponse) => {
          return resp.user;
        })
      );
    } else {
      return this.#http
        .get<UserResponse>(`${this.#usersUrl}/me`)
        .pipe(map((resp) => resp.user));
    }
  }

  getUsers(): Observable<User[]> {
    return this.#http.get<UsersResponse>(`${this.#usersUrl}`).pipe(
      map((resp: UsersResponse) => {
        return resp.users;
      })
    );
  }

  getEmails(): Observable<string[]> {
    return this.#http.get<EmailResponse>(`${this.#usersUrl}/emails`).pipe(
      map((resp: EmailResponse) => {
        return resp.emails;
      })
    );
  }

  getUsernames(): Observable<string[]> {
    return this.#http.get<UsernameResponse>(`${this.#usersUrl}/usernames`).pipe(
      map((resp: UsernameResponse) => {
        return resp.usernames;
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#usersUrl}/${id}`);
  }
}
